import React, { useState } from 'react';
import { View, StyleSheet, Button, Image, Text } from 'react-native';
import BodyText from '../components/BodyText'
import Colors from '../constants/colors'

const GameOverScreen = props => {

  return (
    <View style={styles.screen}>
      <BodyText>The Game is Over!</BodyText>
      {
        // Loading local images using the above syntax
        // <Image source={require('../assets/images/success.png')}/>
        // From web:
        // <Image source={uri: 'https://image.com'}/>
      }
      <Image
        source={require('../assets/images/success.png')}
        style={styles.image}
        resizeMode="cover"/>
      <BodyText>Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text>
        rounds to guess <Text style={styles.highlight}>{props.userNumber}</Text>
      </BodyText>
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
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30
  },
  resultText: {
    textAlign: 'center'
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  }
});

export default GameOverScreen
