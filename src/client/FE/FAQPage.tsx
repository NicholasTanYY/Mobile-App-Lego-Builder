import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TextComponent from '../Assets/TextComponent';
import { FAQquestions } from '../data/FAQdata';

const FAQPage = () => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const handleQuestionPress = questionId => {
    if (expandedQuestion === questionId) {
      setExpandedQuestion(null); // Collapse the question if it is already expanded
    } else {
      setExpandedQuestion(questionId); // Expand the question
    }
  };

  return (
    <ImageBackground
      source={require('../Assets/images/white_lego.jpg')}
      style={styles.background_img}>
      <ScrollView style={styles.container}>
        {FAQquestions.map(item => (
          <TouchableOpacity
            style={styles.questionContainer}
            key={item.id}
            onPress={() => handleQuestionPress(item.id)}>
            <TextComponent type="text" text={item.question} />
            {expandedQuestion === item.id ? (
              <TextComponent type="subText" text={item.description} />
            ) : null}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'flex-start',
    margin: 12,
  },
  background_img: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  questionContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
});

export default FAQPage;
