import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Text,
  overall,
  Alert,
} from 'react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import sendimg from '../../assets/images/send-button.png';
import { MaterialIcons } from 'expo-vector-icons';

const ChatTextInput = ({ chatMessage, setChatMessage, handleSendMessage,grammerResultPress,overall,spellCheckonPress }) => {
  const [inputHeight, setInputHeight] = useState(0);

  const handleTextChange = (newText) => {
    setChatMessage(newText);
  };

  const handleContentSizeChange = (event) => {
    setInputHeight(event.nativeEvent.contentSize.height);
    const { height } = event.nativeEvent.contentSize;
    if (height > styles.inputMessage.height * 6) {
      setInputHeight(height);
    }
  };

  return (
    <View style={styles.container}>
        {
          overall&&(
            <TouchableOpacity onPress={grammerResultPress} style={styles.button3}>
            <Text>
              {overall.toString() }
            </Text>
          </TouchableOpacity>
          )
        }
    <View style={styles.secondaryContainer}>
      <View>
      <TouchableOpacity onPress={spellCheckonPress} style={styles.button1}>
        <MaterialIcons color="white" name="spellcheck" size={24} />
      </TouchableOpacity>
      </View>
      <View style={styles.inputMessageContainer}>
        <TextInput
          inputMode="text,url"
          style={{
            ...styles.inputMessage,
            height: Math.min(Math.max(15, inputHeight), 150),
            maxHeight: 150,
          }}
          onChangeText={(text) => handleTextChange(text)}
          value={chatMessage}
          autoCorrect={false}
          maxLength={1000}
          onContentSizeChange={handleContentSizeChange}
          multiline
          keyboardType="default"
        />
      </View>

      <TouchableOpacity
        onPress={() => handleSendMessage()}
        style={styles.imgContainer}
      >
        <Image source={sendimg} style={styles.image} />
      </TouchableOpacity>
    </View>
    </View>

  );
};

export default ChatTextInput;

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  secondaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
  },

  inputMessageContainer: {
    width: '70%',
    backgroundColor: Colors.white,
    borderRadius: 20,
    minHeight: 40,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  inputMessage: {
    width: '100%',
    borderRadius: 20,
    fontSize: 15,
    textAlignVertical: 'center',
    lineHeight: 20,
  },
  button1: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: Colors.orange,
  },
  imgContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  button3: {
    width: 40,
    height: 40,
    marginBottom:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: Colors.white,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
