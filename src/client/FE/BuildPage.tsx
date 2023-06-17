import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { getBuildInstructions, openCloseCamera } from '../BE/BuildPage';
import PDF from '../Assets/PDF';
import CameraComponent from '../Assets/CameraComponentCV';
import ButtonComponent from '../Assets/ButtonComponent';

const BuildPage = ({ route, navigation }) => {
  const [build, setBuild] = useState(route.params.build);
  const [instructions, setInstructions] = useState();
  const [showCamera, setShowCamera] = useState(false);
  const [cameraButtonText, setCameraButtonText] = useState('Open Camera');

  useEffect(() => {
    const getInstructions = async () => {
      await getBuildInstructions(build, setInstructions);
    };
    getInstructions();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <PDF source={instructions} build={build} />
      </View>
      {showCamera && (
        <View style={styles.bottomHalf}>
          <CameraComponent />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <ButtonComponent
          text={cameraButtonText}
          func={() =>
            openCloseCamera(showCamera, setShowCamera, setCameraButtonText)
          }
        />
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  topHalf: {
    flex: 1,
  },
  bottomHalf: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});

export default BuildPage;
