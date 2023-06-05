import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { getBuildInstructions } from '../BE/BuildPage';
import PDF from '../Assets/PDF';

const BuildPage = ({ route, navigation }) => {
    const [build, setBuild] = useState(route.params.build);
    const [instructions, setInstructions] = useState();

    useEffect(() => {
      const getInstructions = async () => {
        await getBuildInstructions(build, setInstructions);
      }
      getInstructions();
    }, []);

    return (
      <View style={styles.container}>
          <PDF source={instructions} build={build}/>
      </View>
    );
  };
  
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

  export default BuildPage;
  