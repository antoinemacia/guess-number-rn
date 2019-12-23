import React, { useState } from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';
import BodyText from '../components/BodyText'

const GameOverScreen = props => {

  return (
    <View style={styles.screen}>
      <BodyText>The Game is Over!</BodyText>
      <Image source={}/>
      <BodyText>Number of Rounds: {props.roundsNumber}</BodyText>
      <BodyText>Number was: {props.userNumber}</BodyText>
      <View style={styles.buttonContainer}>
        <Button onPress={props.onRestart} title="NEW GAME" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  }
});

export default GameOverScreen
