import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
import BodyText from '../components/BodyText'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton'

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
      <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text>
        rounds to guess <Text style={styles.highlight}>{props.userNumber}</Text>
      </BodyText>
      <View style={styles.buttonContainer}>
        <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
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
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30
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
