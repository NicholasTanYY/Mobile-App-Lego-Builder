import axios from 'axios';
import * as RNFS from 'react-native-fs';

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
        // console.log(res);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
