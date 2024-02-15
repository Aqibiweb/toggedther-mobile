import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import Colors from '../../constants/Colors';

const ChatBot = (props) => {

  return (
    <View style={styles.screen}>
        <Text>
            Text value---
        </Text>
    </View>
  );
};

export default ChatBot;

const styles = StyleSheet.create({


  screen: {
    backgroundColor: Colors.bg,
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },

});
