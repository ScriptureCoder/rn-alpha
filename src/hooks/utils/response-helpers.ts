/**
 * Extracts data from API response based on configured data path
 * @param response - The Axios response object (res.data)
 * @param dataPath - The path to extract (e.g., "data" for res.data.data, "" for res.data)
 * @returns The extracted data
 */
export const extractResponseData = (response: any, dataPath?: string): any => {
  if (!dataPath) {
    return response;
  }
  
  const path = dataPath.trim();
  if (!path) {
    return response;
  }
  
  // Support dot notation for nested paths (e.g., "data.items")
  return path.split('.').reduce((obj, key) => obj?.[key], response);
};

