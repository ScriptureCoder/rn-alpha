import RNFetchBlob from 'react-native-blob-util';
import { logger } from './logger';

const readFile = async (path: string) => {
	try {
		return await RNFetchBlob.fs.readFile(path.replace("file://", ""), 'base64');
	} catch (error) {
		logger.error('Error reading file:', error);
		return null;
	}
};

export default readFile
