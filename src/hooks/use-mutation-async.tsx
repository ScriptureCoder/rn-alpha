import { useState, useCallback, useRef, useEffect } from "react";
import http from "../utils/service";
import { useApp } from "../store/contexts/app-context";
import { Keyboard } from "react-native";
import { Route } from "../types";
import useCache from "./use-cache";
import { MutationOptions, MutationResult, MutationResponse } from "./types";
import {
  extractErrorMessage,
  isSuccessStatus,
  isAuthError,
  isAbortError,
  createErrorResponse,
  createSuccessResponse,
} from "./utils/error-handler";
import { ERROR_MESSAGES } from "./constants";
import { extractResponseData } from "./utils/response-helpers";
import { useAlphaConfig } from "../store/contexts/config-context";
import {
  resolveEncryptionOptions,
  applyRequestEncryption,
  applyResponseDecryption,
} from "./utils/encryption-helpers";

/**
 * Custom hook for async mutations with extended functionality
 * Unlike useMutation, this version uses route string directly (legacy support)
 * @param route - The raw API route string (e.g., "POST:/endpoint/:param")
 * @param option - Mutation options (keyboard dismiss)
 * @returns MutationResult with mutate function, loading state, error, and data
 */
const useMutationAsync = <T = any,>(
  route: string,
  option?: MutationOptions
): MutationResult<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<T | undefined>(undefined);
  const [status, setStatus] = useState<number | undefined>(undefined);
  
  const app = useApp();
  const { auth } = app;
  const [config] = useAlphaConfig();
  
  // Resolve encryption options (hook option > global config)
  const encryptionOptions = resolveEncryptionOptions(option?.encrypted, config.defaultEncryption);
  
  // Resolve dataPath (hook option > global config)
  const resolvedDataPath = option?.dataPath !== undefined ? option.dataPath : config.dataPath;
  
  // Store abort controller for request cancellation
  const abortControllerRef = useRef<AbortController | null>(null);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  /**
   * Performs the mutation request
   * @param variables - Request variables
   * @returns Promise with response data or error
   */
  const mutate = useCallback(
    async (variables: Record<string, any>): Promise<MutationResponse<T>> => {
      try {
        // Dismiss keyboard by default
        if (option?.keyboard === undefined || option?.keyboard) {
          Keyboard.dismiss();
        }

        // Parse route manually (legacy format support)
        const [method, pathTemplate] = route.split(":/");
        const variablesCopy = { ...variables };
        
        const path = "/" + pathTemplate.replace(/:\w+/g, (matched: string) => {
          const paramName = matched.replace(/\W/g, "");
          const value = variablesCopy[paramName];
          delete variablesCopy[paramName];
          return value || matched;
        });

        // Abort any existing request
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        
        // Create new abort controller
        abortControllerRef.current = new AbortController();
        
        setLoading(true);
        setError(undefined);
        setStatus(undefined);

        // Apply request encryption if enabled
        const requestData = encryptionOptions
          ? applyRequestEncryption(variablesCopy, encryptionOptions)
          : variablesCopy;

        const res: any = await http(
          path,
          (method as any) || "POST",
          requestData,
          {
            returnStatus: true,
            auth: auth.accessToken,
            signal: abortControllerRef.current.signal,
          }
        );

        if (isSuccessStatus(res.status)) {
          let responseData = extractResponseData(res.data, resolvedDataPath);
          
          // Apply response decryption if enabled
          if (encryptionOptions && responseData) {
            responseData = applyResponseDecryption(responseData, encryptionOptions);
          }
          
          setData(responseData);
          setStatus(res.status);
          setLoading(false);
          return createSuccessResponse(responseData, res.status);
        }

        // Check for auth errors (avoid login route check)
        if (isAuthError(res.status)) {
          // Auth error - clear authentication
          app.clearAuth();
        }

        const errorMessage = extractErrorMessage(res);
        setError(errorMessage);
        setStatus(res.status);
        setLoading(false);
        return createErrorResponse(errorMessage, res.status);
      } catch (e: any) {
        // Handle abort errors - don't set error state for cancellations
        if (isAbortError(e)) {
          setLoading(false);
          setStatus(0);
          return createErrorResponse("Request cancelled", 0);
        }
        
        setLoading(false);
        const errorMessage = e.message || ERROR_MESSAGES.GENERIC;
        setError(errorMessage);
        setStatus(500);
        return createErrorResponse(errorMessage, 500);
      }
    },
    [route, option, auth, app, encryptionOptions, resolvedDataPath]
  );
  
  /**
   * Cancels the current mutation request
   */
  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  return [
    mutate,
    {
      loading,
      error,
      data,
      status,
      cancel,
    }
  ];
};

export default useMutationAsync;
