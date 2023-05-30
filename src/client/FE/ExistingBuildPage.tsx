import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextComponent from '../Assets/TextComponent';
import ButtonComponent from '../Assets/ButtonComponent'
import DisplayLegoSetComponent from '../Assets/DisplayLegoSetComponent';
import {getExistingCollection, handleBuild, removeBuild} from '../BE/ExistingBuildPage';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const ExistingBuildPage = ({ navigation }) => {
  const [existingCollection, setExistingCollection] = useState([]);
  const [selectedBuild, setSelectedBuild] = useState();
  
  useEffect(() => {
      async function set() {
          const result = await getExistingCollection();
          setExistingCollection(result);
      }
      set();
 }, [selectedBuild])
  return (
    <View style={styles.container}>
        <TextComponent type="textTitle" text="Existing Build Screen"/>
        <ScrollView>
              {existingCollection.map(collection => {
                return (
                    <DisplayLegoSetComponent legoSet={collection} func={() => setSelectedBuild(collection)} />
                )
              })}
        </ScrollView>
          <View style={{ flexDirection: 'row', alignItems:'center'}}>
            <View style={{ flex: 0.8 }}>
            <ButtonComponent text="Remove Build" func={() => removeBuild(selectedBuild, setSelectedBuild)} />
            </View>
            <View style={{ flex: 1 }}>
            <ButtonComponent text="Let's start building!" func={() => handleBuild(selectedBuild, navigation)} />
            </View>
        </View>
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
