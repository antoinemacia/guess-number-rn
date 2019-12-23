import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/colors'
import BodyText from './BodyText'

const Header = ({title}) => {
  return (
    <View style={ styles.header }>
      <BodyText style={styles.headerTitle}>{title}</BodyText>
    </View>
  )
}


const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    color: 'black',
    fontSize: 18
  }

});

export default Header
