import { useState, useCallback, useRef, useEffect } from "react";
import http, { Method } from "../utils/service";
import { useApp } from "store/contexts/app-context";
import { Keyboard } from "react-native";
import { Route } from "types";
import useCache from "./use-cache";
import { MutationOptions, MutationResult, MutationResponse } from "./types";
import {
  extractErrorMessage,
  isSuccessStatus,
  isAuthError,
  isAbortError,
  createErrorResponse,
  createSuccessResponse,
} from "hooks/utils";
import { ERROR_MESSAGES } from "./constants";
import { extractResponseData } from "./utils/response-helpers";
import { useAlphaConfig } from "../store/contexts/config-context";
import {
  resolveEncryptionOptions,
  applyRequestEncryption,
  applyResponseDecryption,
} from "./utils/encryption-helpers";

/**
 * Custom hook for data mutations (POST, PUT, DELETE operations)
 * @param route - The API route key
 * @param option - Mutation options (keyboard dismiss, text response)
 * @returns MutationResult with mutate function, loading state, error, and data
 */
const useMutation = <T = any,>(
  route: Route,
  option?: MutationOptions
): MutationResult<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<T | undefined>(undefined);
  const [status, setStatus] = useState<number | undefined>(undefined);

  const app = useApp();
  const { auth } = app;
  const { getContext } = useCache();
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

        const { path, method, rawPath } = getContext(route, variables);

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
          ? applyRequestEncryption(variables, encryptionOptions)
          : variables;

        const res: any = await http(
          path,
          (method as Method) || "POST",
          requestData,
          {
            returnStatus: true,
            auth: auth?.accessToken,
            returnText: option?.text,
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

        let errorMessage = extractErrorMessage(res);

        // Check for auth errors
        if (rawPath.includes(":customerId") && isAuthError(res.status)) {
          errorMessage = ERROR_MESSAGES.SESSION_EXPIRED;
          // Auth error - clear authentication
          app.clearAuth();
        }

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
    [route, option, auth, app, getContext, encryptionOptions, resolvedDataPath]
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

export default useMutation;
