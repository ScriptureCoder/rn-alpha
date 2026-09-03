import { getPlatformAdapter } from '../platform/registry';

/**
 * Reads a file and returns its base64 contents (null on failure).
 * Uses react-native-blob-util on native and fetch + FileReader on the web.
 */
const readFile = async (path: string) => getPlatformAdapter().readFile(path);

export default readFile;
