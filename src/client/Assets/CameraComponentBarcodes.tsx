import 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';
import { DetectedObject, detectObjects, FrameProcessorConfig } from 'vision-camera-realtime-object-detection';

const CameraComponent = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();

  const frameProcessorConfig: FrameProcessorConfig = {
    modelFile: `../../../assets/model/M1_float16.tflite`, // <!-- name and extension of your model
    scoreThreshold: 0.5,
  };
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const detectedObjects: DetectedObject[] = detectObjects(frame, frameProcessorConfig);
    alert(detectedObjects);
  }, []);
  
  useEffect(() => {
    const requestCameraPermission = async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    };
    requestCameraPermission();
  }, []);

  return (
    device != null && hasPermission && isFocused && (
      <>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          enableZoomGesture={true}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
      </>
    )
  );
};

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CameraComponent;