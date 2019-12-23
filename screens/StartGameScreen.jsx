import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import Colors from '../constants/colors'

const StartGameScreen = ({ onStartGame }) => {

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''))
  }

  const resetInputHandler = () => {
    setEnteredValue('')
    setConfirmed(false)
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue)
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number', 'Numbers dees to be between 1 & 99', [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
      return
    }
    setConfirmed(true)
    setEnteredValue('')
    // Entered value is still available here, as the value will only be reset in
    // the next re-render
    setSelectedNumber(chosenNumber)
  }

  let confirmedOutput

  if(confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryCard}>
        <Text>You Selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button title="START GAME" onPress={() => onStartGame(selectedNumber)}></Button>
      </Card>
    )
  }

  return (
    // TouchableWithoutFeedback is a iOS specific keyboard trick to allow
    // Dismissing the keyboard when tapping outside of it
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a new game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            onChangeText={numberInputHandler}
            value={enteredValue}
            maxLength={2}/>
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/>
            </View>
            <View style={styles.button}>
              <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  )
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center'
  },
  buttons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  input: {
    width: 50,
    textAlign: 'center'
  },
  summaryCard: {
    margin: 20,
    alignItems: 'center'
  }
});

export default StartGameScreen
