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
  
  const app = useApp();
  const { auth } = app;
  const config = useAlphaConfig();
  
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

        const res: any = await http(
          path,
          (method as any) || "POST",
          variablesCopy,
          {
            returnStatus: true,
            auth: auth.accessToken,
            signal: abortControllerRef.current.signal,
          }
        );

        if (isSuccessStatus(res.status)) {
          const responseData = extractResponseData(res.data, config.dataPath);
          setData(responseData);
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
        setLoading(false);
        return createErrorResponse(errorMessage, res.status);
      } catch (e: any) {
        // Handle abort errors - don't set error state for cancellations
        if (isAbortError(e)) {
          setLoading(false);
          return createErrorResponse("Request cancelled", 0);
        }
        
        setLoading(false);
        const errorMessage = e.message || ERROR_MESSAGES.GENERIC;
        setError(errorMessage);
        return createErrorResponse(errorMessage, 500);
      }
    },
    [route, option, auth, app]
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
      cancel,
    }
  ];
};

export default useMutationAsync;
