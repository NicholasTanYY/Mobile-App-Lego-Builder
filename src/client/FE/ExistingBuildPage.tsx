import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextComponent from '../Assets/TextComponent';
import ButtonComponent from '../Assets/ButtonComponent'
import DisplayLegoSetComponent from '../Assets/DisplayLegoSetComponent';
import {getExistingCollection, handleBuild} from '../BE/ExistingBuildPage';

const ExistingBuildPage = ({ navigation }) => {
  const [existingCollection, setExistingCollection] = useState([]);
  
  useEffect(() => {
      async function set() {
          const result = await getExistingCollection();
          setExistingCollection(result);
      }
      set();
 }, [])
  return (
    <View style={styles.container}>
        <TextComponent type="textTitle" text="Existing Build Screen"/>
        {existingCollection.map(collection => {
          return (<DisplayLegoSetComponent legoSet={collection} func={(x) => {console.log(x)}} />)
        })}
        <ButtonComponent text="Let's start building!" func={() => handleBuild(navigation)} />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExistingBuildPage;
