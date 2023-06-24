import 'react-native-reanimated';
import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
// import { RNCamera, RNCameraProps } from 'react-native-camera';
import { useIsFocused } from '@react-navigation/native';
import { drawRect } from './ComputerVision/utilities';
import ButtonComponent from './ButtonComponent';
// import * as tf from '@tensorflow/tfjs';
// import {
//   fetch,
//   bundleResourceIO,
//   // cameraWithTensors,
// } from '@tensorflow/tfjs-react-native';

const CameraComponent = () => {
  const camera = useRef<Camera | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();
  // const [word, setWord] = useState('');
  // const [predictionFound, setPredictionFound] = useState(false);
  const [showCamera, setShowCamera] = useState(true);
  const [capturedImage, setCapturedImage] = useState('');
  // const [legoIdentifierModel, setlegoIdentifierModel] =
  //   useState<tf.LayersModel | null>(null);
  let requestAnimationFrameId = 0;
  const textureDims =
    Platform.OS === 'ios'
      ? { width: 1080, height: 1920 }
      : { width: 1600, height: 1200 };
  const tensorDims = { width: 152, height: 200 };

  useEffect(() => {
    // async function loadModel() {
    //   console.log('[+] Application started');
    //   //Wait for tensorflow module to be ready
    //   const tfReady = await tf.ready();
    //   console.log('[+] Loading custom lego detection model');
    //   const modelJson = await require('../../../assets/model/model.json');
    //   const modelWeight =
    //     await require('../../../assets/model/group1-shard.bin');
    //   const legoIdentifierModel = await tf.loadLayersModel(
    //     bundleResourceIO(modelJson, modelWeight),
    //   );
    //   setlegoIdentifierModel(legoIdentifierModel);
    //   console.log('[+] Model Loaded');
    // }
    // loadModel();

    const requestCameraPermission = async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    };
    requestCameraPermission();
  }, []);

  // const getPrediction = async tensor => {
  //   if (!tensor || !legoIdentifierModel) {
  //     return;
  //   }

  //   const prediction = await (legoIdentifierModel.predict(tensor) as tf.Tensor);
  //   console.log(`prediction: ${JSON.stringify(prediction)}`);

  //   if (!prediction || prediction.size === 0) {
  //     cancelAnimationFrame(requestAnimationFrameId);
  //     console.log('no predictions found');
  //     setPredictionFound(false);
  //     return;
  //   } else {
  //     setPredictionFound(true);
  //   }
  // };

  const capturePhoto = async () => {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({});
      setCapturedImage(photo.path);
      setShowCamera(false);
      console.log('photo saved to ' + photo.path);
    }
  };

  // const handleCameraStream = imageAsTensors => {
  //   const loop = async () => {
  //     const nextImageTensor = await imageAsTensors.next().value;
  //     await getPrediction(nextImageTensor);
  //     requestAnimationFrameId = requestAnimationFrame(loop);
  //   };
  //   loop();
  // };

  useEffect(() => {
    return () => {
      cancelAnimationFrame(requestAnimationFrameId);
    };
  }, [requestAnimationFrameId]);

  return device != null && hasPermission && isFocused ? (
    showCamera ? (
      <>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={showCamera}
          photo={true}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.camButton}
            onPress={() => capturePhoto()}
          />
        </View>
      </>
    ) : (
      <View style={StyleSheet.absoluteFill}>
        <Image
          source={{ uri: `file://'${capturedImage}` }}
          style={StyleSheet.absoluteFill}
        />
        <ButtonComponent text="Retake" func={() => setShowCamera(true)} />
      </View>
    )
  ) : null;
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    padding: 20,
  },
  camButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
});

export default CameraComponent;
