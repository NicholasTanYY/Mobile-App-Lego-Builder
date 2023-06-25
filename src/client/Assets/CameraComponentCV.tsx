import 'react-native-reanimated';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';
import ButtonComponent from './ButtonComponent';
import { invokeLambdaFunction, imageToBase64 } from './HandleLambdaFunction';

const CameraComponent = () => {
  const camera = useRef<Camera | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();
  const [showCamera, setShowCamera] = useState(true);
  const [imagePath, setImagePath] = useState('');
  const [photoBase64, setPhotoBase64] = useState('');

  useEffect(() => {
    const requestCameraPermission = async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    };
    requestCameraPermission();
  }, []);

  function handlePhoto() {
    capturePhoto();
    renderProcessedImage();
  }

  const capturePhoto = async () => {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({});
      const imageBase64Data = await imageToBase64(photo.path);
      setPhotoBase64(imageBase64Data);
      setImagePath(photo.path);
      setShowCamera(false);
      console.log('photo saved to ' + photo.path);
    }
  };

  const renderProcessedImage = async () => {
    const processedImage = await invokeLambdaFunction(photoBase64);
    setPhotoBase64(processedImage);

    // invokeLambdaFunction(photoBase64)
    //   .then(response => {
    //     // Handle the response from the Lambda function
    //     console.log('Lambda function response:', response);
    //     // Process the response and draw bounding boxes in your React Native app
    //   })
    //   .catch(error => {
    //     // Handle any errors that occur during the invocation
    //     console.error('Error invoking Lambda function:', error);
    //   });
  };

  return device != null && hasPermission && isFocused ? (
    showCamera ? (
      <>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={showCamera}
          photo={true}
          enableAutoStabilization={true}
          qualityPrioritization={'quality'}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.camButton}
            onPress={() => handlePhoto()}
          />
        </View>
      </>
    ) : (
      <View style={StyleSheet.absoluteFill}>
        <Image
          source={{ uri: `data:image/jpg;base64,${photoBase64}` }}
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
