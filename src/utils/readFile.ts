import RNFetchBlob from 'react-native-blob-util';

const readFile = async (path:string) => {
	try {
		return await RNFetchBlob.fs.readFile(path.replace("file://", ""), 'base64');
	} catch (error) {
		console.error('Error reading file:', error);
		return null;
	}
};

export default readFile
