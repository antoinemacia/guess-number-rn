import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import { Ionicons } from '@expo/vector-icons'
import MainButton from '../components/MainButton'
import BodyText from '../components/BodyText';

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

const renderListItem = (value, round) => {
  return (
    <View key={value} style={styles.listItem}>
      <BodyText>#{round}</BodyText>
      <BodyText>{value}</BodyText>
    </View>
  )
}

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [rounds, setRounds] = useState([initialGuess]);
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
      onGameOver(rounds.length);
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
    if (direction === 'LOWER') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = genNextNumber(currentGuess)
    setCurrentGuess(nextNumber)
    setRounds(currentRounds => [nextNumber, ...currentRounds])
  }

  const genNextNumber = (currentGuess) => {
    return generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuessHandler('LOWER')}>
          <Ionicons name='md-remove' size={24} color="white" />
        </MainButton>
        <MainButton onPress={() => nextGuessHandler('GREATER')}>
          <Ionicons name='md-add' size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.list}>
        <FlatList data={rounds} renderItem={(item) => renderListItem(item.item, rounds.length - item.index)} />
      </View>
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
  },
  list: {
    width: '80%',
  },
  listItem: {
    borderColor: '#ccc',
    padding: 15,
    borderWidth: 1,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  }
});

export default GameScreen
