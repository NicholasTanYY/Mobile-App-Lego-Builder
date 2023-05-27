import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const PictureComponent = ({source}) => {
  const defaultImage = "https://media.fds.fi/product_image/500/121RoomCopenhagen_iso_TH.jpg";

  return (
    <View style={styles.container}>
      <Image source={source ? { uri:source } : {uri:defaultImage}} style={styles.image}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default PictureComponent;