import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ButtonComponent from '../Assets/ButtonComponent';
import TextInputComponent from '../Assets/TextInputComponent';
import { handleSearchBuild, handleAddBuild, LegoSet } from '../BE/NewBuildPage';
import { ScrollView } from 'react-native-gesture-handler';

const NewBuildPage = ({ navigation }) => {
  const [legoID, setlegoID] = useState('');
  const [legoSets, setLegoSets] = useState<LegoSet[]>([]);
  const [selectedLegoSet, setSelectedLegoSet] = useState(null);

  return (
    <View style={styles.container}>
      <TextInputComponent
        placeholder="Lego ID"
        func={setlegoID}
        value={legoID}
      />
      <ButtonComponent
        text="Search"
        func={() => handleSearchBuild(legoID, setLegoSets, navigation)}
      />
      <ScrollView style={styles.scrollView}>
        {legoSets.map((legoSet, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedLegoSet(legoSet)}>
            <Text>Name: {legoSet.name}</Text>
            <Text>Set Id: {legoSet.set_num}</Text>
            <Text>Year: {legoSet.year}</Text>
            <Text>Number of pieces: {legoSet.num_parts}</Text>
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: legoSet.set_img_url }}
            />
            {/* Print the value of legoSet in a Text component */}
            <Text>{JSON.stringify(legoSet)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ButtonComponent
        text="Create Build!"
        func={() => handleAddBuild(selectedLegoSet, navigation)}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  scrollView: {
    margin: 20,
    width: '80%', // Limit the width of the ScrollView
  },
});

export default NewBuildPage;
