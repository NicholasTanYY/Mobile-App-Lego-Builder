import React from 'react';
import { TouchableOpacity } from 'react-native';
import TextComponent from './TextComponent';

const TouchableTextComponent = ({text, func}) => {
  return (
    <TouchableOpacity onPress={func}>
        <TextComponent type="subText" text={text} />
    </TouchableOpacity>
  );
};

export default TouchableTextComponent;