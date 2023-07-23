import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import TextComponent from './TextComponent';
import PictureComponent from './PictureComponent';

export type LegoSet = {
  last_modified_dt: string;
  name: string;
  num_parts: number;
  set_img_url: string;
  set_num: string;
  set_url: string;
  theme_id: number;
  year: number;
};

export const DisplayLegoSetComponent = ({ legoSet, func, isSelected }) => {
  return (
    <View style={[styles.box, isSelected ? styles.selectedBox : null]}>
      <TouchableOpacity onPress={() => func(legoSet)}>
        <TextComponent type="text" text={'Name: ' + legoSet.name} />
        <TextComponent
          type="text"
          text={'Set ID: ' + legoSet.set_num.slice(0, -2)}
        />
        <TextComponent type="text" text={'Year: ' + legoSet.year} />
        <TextComponent
          type="text"
          text={'Number of pieces: ' + legoSet.num_parts}
        />
        <PictureComponent source={legoSet.set_img_url} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
  },
  selectedBox: {
    borderColor: 'blue',
    borderWidth: 2,
    backgroundColor: '#F6F6F6',
  },
});

export default DisplayLegoSetComponent;
