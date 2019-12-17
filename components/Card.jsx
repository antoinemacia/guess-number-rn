import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
  return (
    <View style={{ ...styles.card, ...props.style}}>
      {props.children}
    </View>
  )
}


const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: 'white'
  }
});

export default Card
