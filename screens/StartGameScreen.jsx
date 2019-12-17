import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Card from '../components/Card'
import Input from '../components/Input'
import Colors from '../constants/colors'

const StartGameScreen = () => {

  const [enteredValue, setEnteredValue] = useState('');

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''))
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
            maxLength={2}/>
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button title="Reset" onPress={() => { }} color={Colors.accent}/>
            </View>
            <View style={styles.button}>
              <Button title="Confirm" onPress={() => { }} color={Colors.primary} />
            </View>
          </View>
        </Card>
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
  }

});

export default StartGameScreen
