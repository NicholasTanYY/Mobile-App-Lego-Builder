import React from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonComponent from '../Assets/ButtonComponent';
import CameraComponent from '../Assets/CameraComponent';



const BuildPage = ({ navigation }) => {
  
    return (
      <View style={styles.container}>
        <View style={{flex:0.7}}>
            <CameraComponent />
        </View>
        <View style={{alignItems:'center'}}>
            <ButtonComponent text="Create Project" func={()=>{}} />
        </View>
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
  