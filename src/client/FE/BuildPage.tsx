import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { getBuildInstructions, openCloseCamera } from '../BE/BuildPage';
import PDF from '../Assets/PDF';
import CameraComponent from '../Assets/CameraComponentBarcodes';
import ButtonComponent from '../Assets/ButtonComponent';

const BuildPage = ({ route, navigation }) => {
  const [build, setBuild] = useState(route.params.build);
  const [instructions, setInstructions] = useState();
  const [showCamera, setShowCamera] = useState(false);
  const [cameraButtonText, setCameraButtonText] = useState('Open Camera');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getInstructions = async () => {
      // Simulate PDF loading (Replace this with actual PDF loading logic)
      await new Promise(resolve => setTimeout(resolve, 3000));
      // Fetch the build instructions
      await getBuildInstructions(build, setInstructions);

      setIsLoading(false); // Set loading to false once the PDF is loaded
    };
    getInstructions();
  }, [build]);

  return (
    <View style={styles.container}>
      {isLoading ? ( // Use conditional rendering to show the loading GIF while the PDF is loading
        <View style={styles.loadingContainer}>
          <Image
            source={require('../Assets/images/lego-loader.gif')}
            style={styles.loadingGif}
          />
        </View>
      ) : (
        <>
          <ImageBackground
            source={require('../Assets/images/white_lego.jpg')}
            style={styles.background_img}>
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
                  openCloseCamera(
                    showCamera,
                    setShowCamera,
                    setCameraButtonText,
                  )
                }
              />
            </View>
          </ImageBackground>
        </>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  topHalf: {
    flex: 1,
  },
  bottomHalf: {
    flex: 1,
  },
  buttonContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingGif: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    marginLeft: '10%',
  },
  background_img: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default BuildPage;
