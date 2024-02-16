import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import Colors from '../../constants/Colors';
import { color } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getNameInitials, getImage } from '../../utils/getMethods';
import NameCounter from '../../components/MyProfile/NameCounter';
import ProfileStatus from '../../components/Chatbot/ProfileStatus';

const ChatBot = (props) => {
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

  const handleOpenChatBot = () => {
    props.navigation.navigate('Match', {
      screen: 'ChatNavigator',
      params: {
        screen: 'ChatBotScreen',
      },
    });
  }

  return (
    <View style={styles.screen}>
        <ProfileStatus onPress={handleOpenPreview}/>
       <View style={{width:'100%',height:90, backgroundColor:'rgba(256,256,256,0.8)',alignItems:'center',paddingLeft:20,flexDirection:'row'}}>
          <TouchableOpacity style={styles.button3}
                  onPress={handleOpenChatBot}          
          >
              <Text>Pic</Text>
          </TouchableOpacity>
          <Text style={{paddingLeft:20,}}>Chat with App Buddy</Text>
       </View>
    </View>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  screen: { 
    backgroundColor: Colors.bg,
    flex: 1,
    paddingHorizontal:5,
    alignItems:'center',
    paddingTop:'20%'
  },
  button3: {
    width: 70,
    height: 70,
    borderRadius: 100,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'rgb(243,175,86)',
  },
  name: {
    fontSize: 12,
    // marginRight: 10,
    color: Colors.black,
    padding: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  profilePictureContainer: {
    alignItems: 'center'
    },
  avatar_view: {
    backgroundColor: Colors.orange,
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar_initials: {
    color: Colors.white,
    fontSize: 25,
  },
  nameView: {
    flexDirection: 'row',
    width: '65%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});
