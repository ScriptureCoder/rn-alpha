import { Route } from "../../types";
import { Method } from "../../utils/service";
import PATHS from "../../paths";
import { getHttpConfig } from "../../utils/service";

export interface ParsedRoute {
  path: string;
  method: Method;
  key: string;
  rawPath: string;
}

/**
 * Parses a route string and replaces path parameters with actual values
 * @param route - The route key from PATHS or a raw route string
 * @param variables - Object containing path parameters and query variables
 * @param customerId - The customer ID to inject into paths
 * @returns ParsedRoute object with path, method, key, and rawPath
 */
export function parseRoute(
  route: Route,
  variables: Record<string, any> = {},
  customerId?: string
): ParsedRoute {
  const config = getHttpConfig();
  
  // Merge default PATHS with custom paths (custom takes precedence)
  const allPaths = { 
    ...PATHS, 
    ...(config.paths || {}) 
  };
  
  const rawPath = allPaths[route] || route;
  const [method, pathTemplate] = rawPath.split(":/");
  
  // Clone variables to avoid mutation
  const variablesCopy = { ...variables };
  
  // Replace path parameters
  const path = "/" + pathTemplate.replace(/:\w+/g, (matched: string) => {
    const params = { customerId, ...variablesCopy };
    const paramName = matched.replace(/\W/g, "");
    
    // Remove from variables copy so it's not added to query string
    delete variablesCopy[paramName];
    
    return params[paramName as keyof typeof params] || matched;
  });
  
  // Generate cache key
  const key = path + JSON.stringify(variablesCopy);
  
  return {
    path,
    method: (method as Method) || "GET",
    key,
    rawPath,
  };
}

/**
 * Generates a cache key for a given route and variables
 * @param route - The route key from PATHS
 * @param variables - Object containing route variables
 * @param customerId - The customer ID
 * @returns Cache key string
 */
export function generateCacheKey(
  route: Route,
  variables: Record<string, any> = {},
  customerId?: string
): string {
  const { key } = parseRoute(route, variables, customerId);
  return key;
}

