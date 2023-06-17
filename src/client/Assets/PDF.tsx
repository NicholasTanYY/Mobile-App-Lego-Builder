import React, { useEffect, useRef, useState } from 'react';
import Pdf from 'react-native-pdf';
import { View, StyleSheet } from 'react-native';
import ButtonComponent from './ButtonComponent';
import { goToPage } from '../BE/BuildPage';

export const PDF = ({ source, build }) => {
  const [currentPage, setCurrentPage] = useState(build.currentPage);
  const pdf = useRef();

  return (
    <View style={styles.container}>
      <Pdf
        enablePaging={true}
        page={currentPage}
        ref={pdf}
        trustAllCerts={false}
        source={{ uri: source }}
        onPageChanged={setCurrentPage}
        onError={error => {
          console.log(`Error: ${error}`);
        }}
        style={styles.pdf}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <ButtonComponent
            text="Previous"
            func={() => goToPage(pdf, build, currentPage - 1)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <ButtonComponent
            text="Next"
            func={() => goToPage(pdf, build, currentPage + 1)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    height: '40%',
  },
});

export default PDF;
