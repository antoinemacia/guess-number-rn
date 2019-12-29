import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import Card from '../components/Card'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import MainButton from '../components/MainButton'
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
        <MainButton onPress={() => onStartGame(selectedNumber)}>START GAME</MainButton>
      </Card>
    )
  }

  return (
    <ScrollView>
      // KeyboardAvoidingView ensures that the keyboard does not overlay the Input
      // the text is destinated to (used here for landscape view)
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
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
      </KeyboardAvoidingView>
    </ScrollView>
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
    marginVertical: 10,
    fontFamily: 'open-sans-bold'
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
  button: {
    // Dimensions API gives you the available width or height
    // for the device in use ( can be use for media query like styling)
    // Can also be used in conditionals to define particular components
    width: Dimensions.get('window').width / 4
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
