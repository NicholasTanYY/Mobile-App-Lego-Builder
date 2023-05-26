import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TextComponent from '../Assets/TextComponent';
import { FAQquestions } from '../data/FAQdata';

const FAQPage = () => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const handleQuestionPress = (questionId) => {
    if (expandedQuestion === questionId) {
      setExpandedQuestion(null); // Collapse the question if it is already expanded
    } else {
      setExpandedQuestion(questionId); // Expand the question
    }
  };

  return (
      <ScrollView style={styles.container}>
        <TextComponent type="textTitle" text="FAQ" />
        {FAQquestions.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handleQuestionPress(item.id)}>
            <TextComponent type="text" text={item.question} />
            {expandedQuestion === item.id 
              ? <TextComponent type="subText" text={item.description} />
              : null
            }
          </TouchableOpacity>
        ))}
      </ScrollView>
  );
};

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: 'flex-start',
      margin: 12
    }
});

export default FAQPage;
