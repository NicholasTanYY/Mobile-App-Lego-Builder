import 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';
import { DetectedObject, detectObjects, FrameProcessorConfig } from 'vision-camera-realtime-object-detection';
import { runOnJS } from 'react-native-reanimated';

const CameraComponent = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();
  const [objects, setObjects] = useState<DetectedObject[]>([]);

  const frameProcessorConfig: FrameProcessorConfig = {
    modelFile: `legoDetectionModel.tflite`, // <!-- name and extension of your model
    scoreThreshold: 0.2
  };

  const windowDimensions = useWindowDimensions();

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const detectedObjects: DetectedObject[] = detectObjects(frame, frameProcessorConfig);
    console.log(detectedObjects);
    runOnJS(setObjects)(
      detectedObjects.map((obj) => ({
        ...obj,
        top: obj.top * windowDimensions.height,
        left: obj.left * windowDimensions.width,
        width: obj.width * windowDimensions.width,
        height: obj.height * windowDimensions.height,
      }))
    );
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
              {objects?.map(
        (
          { top, left, width, height, labels }: DetectedObject,
          index: number
        ) => (
          <View
            key={`${index}`}
            style={[styles.detectionFrame, { top, left, width, height }]}
          >
            <Text style={styles.detectionFrameLabel}>
              {labels
                .map((label) => `${label.label} (${label.confidence})`)
                .join(',')}
            </Text>
          </View>
        )
      )}
      </>
    )
  );
};

const styles = StyleSheet.create({
  detectionFrame: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#00ff00',
    zIndex: 9,
  },
  detectionFrameLabel: {
    backgroundColor: 'rgba(0, 255, 0, 0.25)',
  },
});

export default CameraComponent;