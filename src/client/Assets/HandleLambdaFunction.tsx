import axios from 'axios';
import * as RNFS from 'react-native-fs';
// import ImageManipulator from 'react-native-image-manipulator';

export async function invokeLambdaFunction(imageData: string): Promise<any> {
  const lambdaEndpoint =
    'https://n8yoxcqzfk.execute-api.ap-southeast-1.amazonaws.com/dev';

  try {
    const response = await axios.post(lambdaEndpoint, { imageData });
    return response.data;
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error('Error invoking Lambda function:', error);
    throw error;
  }
}

export async function imageToBase64(filePath: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    RNFS.readFile(filePath, 'base64')
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export async function ImageConverterAPI(imgUri: string): Promise<string> {
  const API_ENDPOINT =
    'https://n8yoxcqzfk.execute-api.ap-southeast-1.amazonaws.com/dev/post-list';

  // const processedImg = await ImageManipulator.manipulate(
  //   imgUri,
  //   [{ resize: { width: 300, height: 300 } }],
  //   { format: 'jpeg' },
  // );

  // const byteImg = await RNFS.readFile(imgUri, 'base64');

  const response = await axios.post(API_ENDPOINT, imgUri, {
    headers: { 'Content-Type': 'application/octet-stream' },
  });

  const base64Img = response.data;

  return base64Img;
}
