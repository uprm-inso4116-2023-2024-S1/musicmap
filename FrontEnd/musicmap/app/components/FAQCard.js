import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FAQCard = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAnswer = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={toggleAnswer}>
        <Text style={styles.questionText}>{question}</Text>
      </TouchableOpacity>
      {isExpanded && <Text style={styles.answerText}>{answer}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    elevation: 4,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  answerText: {
    marginTop: 8,
    fontSize: 16,
    color: '#555',
  },
});

export default FAQCard;