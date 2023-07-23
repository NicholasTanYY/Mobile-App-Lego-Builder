import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import TextComponent from '../Assets/TextComponent';
import ButtonComponent from '../Assets/ButtonComponent';
import DisplayLegoSetComponent from '../Assets/DisplayLegoSetComponent';
import {
  getExistingCollection,
  handleBuild,
  removeBuild,
} from '../BE/ExistingBuildPage';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { remove } from 'cheerio/lib/api/manipulation';

const ExistingBuildPage = ({ navigation }) => {
  const [existingCollection, setExistingCollection] = useState([]);
  const [selectedBuild, setSelectedBuild] = useState();
  const [refreshList, setRefreshList] = useState(false);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      setSelectedBuild(null);
    });
  }, [navigation]);

  useEffect(() => {
    async function set() {
      const result = await getExistingCollection();
      setExistingCollection(result);
    }
    set();

    setRefreshList(false);
  }, [refreshList === true]);

  return (
    <ImageBackground
      source={require('../Assets/images/white_lego.jpg')}
      style={styles.background_img}>
      <View style={styles.container}>
        <ScrollView>
          {existingCollection.map(collection => {
            return (
              <DisplayLegoSetComponent
                legoSet={collection}
                func={() => setSelectedBuild(collection)}
                isSelected={selectedBuild === collection}
              />
            );
          })}
        </ScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 0.8 }}>
            <ButtonComponent
              text="Remove Build"
              func={() =>
                removeBuild(selectedBuild, setSelectedBuild, setRefreshList)
              }
            />
          </View>
          <View style={{ flex: 1 }}>
            <ButtonComponent
              text="Let's start building!"
              func={() => handleBuild(selectedBuild, navigation)}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background_img: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default ExistingBuildPage;
