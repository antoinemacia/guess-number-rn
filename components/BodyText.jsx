import React from 'react';
import { Text, StyleSheet } from 'react-native';

// This component is a styling wrapper used tyo apply comnmon
// styling (font) to all application texts
const BodyText = props => {
  return (
    <Text style={{ ...styles.text, ...props.style }}>
      {props.children}
    </Text>
  )
}


const styles = StyleSheet.create({
  text: {
    fontFamily: 'open-sans'
  }
});

export default BodyText
