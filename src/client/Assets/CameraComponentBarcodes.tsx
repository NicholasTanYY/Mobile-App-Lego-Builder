import 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useCameraDevices } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner';
import { useIsFocused } from '@react-navigation/native';

const CameraComponent = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {checkInverted: true});
  
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
        {barcodes.map((barcode, idx) => (
          <View key={idx} style={{padding: 50}}>
            <Text style={styles.barcodeTextURL}>{barcode.displayValue}</Text>
          </View>
        ))}
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