import React, { useState, useEffect, useContext } from 'react';
import {
  Alert,
  View,
  StyleSheet,
  Image,
  FlatList,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Context } from '../../context/ContextProvider';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { getPostCall } from '../../utils/service';
import {
  addConversationMessage,
  listMessages,
  deleteConversation,
  loadMoreMessages,
} from '../../store/actions/conversation';
import { getImage, getMessageWithLinks, getWebSocketURL } from '../../utils/getMethods';
import { blockProfile } from '../../store/actions/block';
import { reportProfile } from '../../store/actions/user';
import { checkServerError } from '../../utils/errors';
import ActivityModal from '../../components/UI/ActivityModal';
import Colors from '../../constants/Colors';
import Message from '../../components/Chat/Message';
import ChatHeader from '../../components/Chat/ChatHeader';
import ChatTextInput from '../../components/Chat/ChatTextInput';
import * as u from '../../constants/requestTypes/user';
import * as b from '../../constants/requestTypes/block';
import * as c from '../../constants/requestTypes/conversation';
import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Constants from 'expo-constants';
import Loader from '../../components/UI/Loader';
import ProfileStatus from '../../components/Chatbot/ProfileStatus';
import uuid from 'react-native-uuid';

const WS_URL = getWebSocketURL();
const ChatBotScreen = (props) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const { profileContext } = useContext(Context);
  const [chatMessage, setChatMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [chatResponse, setChatResponse] = useState([]);
  const userListPhotos = useSelector((state) => state.userListPhotos);
  const { data: photos, loading: loadingPhoto } = userListPhotos;
  const userGetProfile = useSelector((state) => state.userGetProfile);
  const {
    data: userProfile,
  } = userGetProfile;





  const handleOpenPreview = () => {

    props.navigation.navigate('Match', {
      screen: 'ChatNavigator',
      params: {
        screen: 'SwipeProfile',
        params: {
          mainProfileId: userProfile.id,
          isInGroup: userProfile.is_in_group,
          isMyProfile: true,
        },
      },
    });
  }



  useEffect(()=>{

    if(conversation.length==0)
    {
        setConversation([{
          id: uuid.v4(),
          sent_by_current: false,
          sent_at: '',
          sender_name: 'App Buddy',
          sender_photo: 'app_buddy',
          message: 'Hello',
        },...conversation]
          )

    }
    else
    {
      setConversation([{
        id: uuid.v4(),
        sent_by_current: false,
        sent_at: '',
        sender_name: 'App Buddy',
        sender_photo: 'app_buddy',
        message: chatResponse,
      },...conversation]
        )
    }
  },[chatResponse])



  const handleShowProfile = (profile, isInGroup, isMyProfile) => {
    if (profile) {
      if (isMyProfile) {
        props.navigation.navigate('SwipeProfile', {
          mainProfileId: profileContext.id,
          isInGroup: profileContext.is_in_group,
          isMyProfile: true,
        });
      }
      props.navigation.navigate('SwipeProfile', {
        mainProfileId: profile.id,
        isInGroup: isInGroup,
      });
    }
  };


  const handleSendMessage = () => {
    if (chatMessage.length >= 1000) {
      return Alert.alert(
        'Message too long',
        'You can only send messages up to 1000 characters'
      );
    }
    if (chatMessage) {
      setConversation([{
        id: uuid.v4(),
        sent_by_current: true,
        sent_at: '',
        sender_photo: `${getImage(photos[0]?.image)}`,
        sender_name: 'App Buddy',
        message: chatMessage,
      },...conversation]
        )
        getPostCall('/api/v1/chats/actions/buddy-chat/',"POST",{
          message:chatMessage,
          user_name:profileContext?.name,
        }).then((res)=>{
          let response=res?.data?.output
          console?.log('Response data',response)
          setChatResponse(response)

        }).catch((error)=>{
          setIsLoading(false)
          console.log('Error ---',error)}
        )
      setChatMessage('');
    }
  };

  const renderMessages = ({ item }) => {
    return (
      <Message
        key={item.id}
        message={item}
        isMyMessage={item.sent_by_current}
        onShowProfile={() =>
          item.sent_by_current
            ? handleShowProfile(
                profileContext,
                profileContext.is_in_group,
                true
              )
            : handleShowProfile({}, {})
        }
      />
    );
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="height">
      <View style={{
    paddingTop: Constants.statusBarHeight + 15,
      }}>
      <ProfileStatus onPress={handleOpenPreview}/>
      <View style={styles?.headerContainer}>
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName={
            Platform.OS === 'android' ? 'ios-arrow-back' : 'ios-arrow-back'
          }
          title="Back"
          onPress={() => props?.navigation?.navigate('ChatBot')}
        />
      </HeaderButtons>
      <View
      style={styles.profilePictureButton}
      >
              <Text>Pic</Text>
      </View>
      <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.matched_Name}>
            App Buddy
          </Text>
      </View>
      </View>
      </View>
      {conversation?.length == 0 ? (
        <View style={styles.noMsgContainer}>
          <Image
            style={styles.noMsgImage}
            source={require('../../assets/images/no-messages.png')}
          />
          <Text style={styles.noMsgText}>Start the conversation!</Text>
        </View>
      ) : (
        <View style={styles.messages_Container}>
          <FlatList
            inverted={true}
            data={conversation}
            keyExtractor={(message) => message.id}
            renderItem={renderMessages}
            contentContainerStyle={{ flexDirection: 'column' }}
            onEndReachedThreshold={0.2}
          />
        </View>
      )}
      <ChatTextInput
        isLoading={isLoading}
        chatMessage={chatMessage}
        setChatMessage={setChatMessage}
        handleSendMessage={handleSendMessage}
        overall={resultData?.Overall}
        grammerResultPress={()=>{
          props.navigation.navigate('GrammarResult',{
            resultData});
        }}
        spellCheckonPress={()=>{
          if(chatMessage.length>0)
          {
            setIsLoading(true)
            console.log('api hit ---')
            getPostCall('/api/v1/chats/actions/grammar-check/',"POST",{
              recipient_name:'App Buddy',
              message:chatMessage,
              user_name:profileContext?.name,
              history_message:chatMessage
            }).then((res)=>{
              let response=JSON.parse(res?.data?.outputs?.grammar)
              console?.log('Response data',response["Correct Grammar"])
              setResultData(response)
              setIsLoading(false)
            }).catch((error)=>{
              setIsLoading(false)
              console.log('Error ---',error)}
            )
          }
        }
        }
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    height: '100%',
    width: '100%',
    paddingHorizontal:5,
    paddingBottom: 20,
  },

  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
  },

  noMsgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
    width: '100%',
  },

  noMsgImage: {
    width: '30%',
    height: '12%',
    resizeMode: 'contain',
  },

  noMsgText: {
    color: 'white',
    fontSize: 24,
  },

  messages_Container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: Colors.bg,
    height: '90%',
    width: '100%',
    marginBottom: 20,
  },

  sendMessage: {
    backgroundColor: Colors.blue,
    height: '10%',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },

  inputMessage: {
    // flex: 2,
    lineHeight: 23,
    backgroundColor: Colors.white,
    borderRadius: 50,
    marginTop: 2.5,
    paddingLeft: 10,
    width: '85%',
    height: 40,
    textAlignVertical: 'top',
  },

  imgContainer: {
    backgroundColor: Colors.orange,
    borderRadius: 50,
    width: 40,
    height: 40,
    marginLeft: 15,
    justifyContent: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingBottom: 5,
    width: '100%',
  },
  profilePictureButton: {
    alignSelf: 'flex-start',
    width: '12%',
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: 'rgb(243,175,86)',
  },
  textContainer: {
    alignSelf: 'center',
    width: '60%',
    marginTop: 5,
    paddingLeft: 8,
  },
  matched_Name: {
    maxWidth: '100%',
    // alignSelf: 'center',
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatBotScreen;
