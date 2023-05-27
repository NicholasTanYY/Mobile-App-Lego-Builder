import React from 'react';
import {TouchableOpacity } from 'react-native';
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

export const DisplayLegoSetComponent = ({legoSet, setSelectedLegoSet}) => {
    return (    
        <TouchableOpacity onPress={() => setSelectedLegoSet(legoSet)}>
            <TextComponent type="text" text={"Name: " + legoSet.name}/>
            <TextComponent type="text" text={"Set ID: " + legoSet.set_num}/>
            <TextComponent type="text" text={"Year: " + legoSet.year}/>
            <TextComponent type="text" text={"Number of pieces: " + legoSet.num_parts}/>
            <PictureComponent source={legoSet.set_img_url} />
        </TouchableOpacity>
        );
}