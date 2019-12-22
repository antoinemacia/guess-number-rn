import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return rndNum
  }
}

const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
  const [rounds, setRounds] = useState(0);
  // useRef allows to store state that will not been reset in between renders
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  // useEffect allows to add an event that will execute after every re-renders
  // The second argument (array) is dependencies, which should contain all the
  // the variables defined outside of the function (state & props included)
  // If a re-render occured and the dependencies have not changed, the useEffect
  // hook will not run

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if(currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = direction => {
    if (
      (direction === 'LOWER' && currentGuess < userChoice) ||
      (direction === 'GREATER' && currentGuess > userChoice)
    ) {
      Alert.alert('Dont lie!', 'You know this is wrong...', [
        { text: 'Sorry!', style: 'cancel', }
      ]);
      return
    }
    switch (direction) {
      case 'LOWER':
        currentHigh.current = currentGuess;
      case 'GREATER':
        currentLow.current = currentGuess;
    }
    setCurrentGuess(generateRandomBetween(currentLow.current, currentHigh.current, currentGuess))
    setRounds(currentRounds => currentRounds + 1)
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={() => nextGuessHandler('LOWER')}/>
        <Button title="GREATER" onPress={() => nextGuessHandler('GREATER')}/>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
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

export default GameScreen
