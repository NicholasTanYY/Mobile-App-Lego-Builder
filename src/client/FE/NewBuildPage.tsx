import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonComponent from '../Assets/ButtonComponent';
import TextInputComponent from '../Assets/TextInputComponent';
import { handleSearchBuild, handleAddBuild } from '../BE/NewBuildPage';
import { DisplayLegoSetComponent } from '../Assets/DisplayLegoSetComponent';

const NewBuildPage = ({ navigation }) => {
  const [legoID, setlegoID] = useState('');
  const [legoSet, setLegoSet] = useState();
  const [selectedLegoSet, setSelectedLegoSet] = useState();

  return (
    <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems:'center'}}>
            <View style={{ flex: 1 }}>
              <TextInputComponent placeholder="Lego ID" func={setlegoID} value={legoID} />
            </View>
            <View style={{ flex: 0.6 }}>
              <ButtonComponent text="Search" func={() => handleSearchBuild(legoID, setLegoSet, navigation)} />
            </View>
        </View>
          {legoSet 
          ? <DisplayLegoSetComponent legoSet={legoSet} setSelectedLegoSet={setSelectedLegoSet} />
          : null}
      <ButtonComponent text="Create Build!" func={() => handleAddBuild(selectedLegoSet, navigation)} />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default NewBuildPage;
