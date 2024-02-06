import React from 'react';
import { useDispatch } from 'react-redux';
import { exist } from '../../utils/checks';
import Colors from '../../constants/Colors';
import * as r from '../../constants/responses/match';
import * as w from '../../constants/requestTypes/swipe';
import SwipeMatch from '../../components/SwipeMatch';
import { Dimensions, Text,View,StyleSheet } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const ItsGrammarResultModal = (props) => {
  const { resultData } = props.route.params;

  const dispatch = useDispatch();
  const handleGoToMatches = () => {
    props.navigation.goBack(null);
    props.navigation.navigate('Match');
  };

  const handleCloseMatch = () => {
    dispatch({ type: w.LIKE_PROFILE_RESET });
    props.navigation.goBack(null);
  };

  const getProfileImage = (profile) => {
    if (exist(profile.photos[0])) {
      return profile.photos[0].image;
    }
    return null;
  };


  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
      <Text style={styles.primaryText}>
        Overall:
      </Text>
      <Text style={styles.secondaryText}>
        {resultData?.overall}
      </Text>
      </View>
      <View style={styles.textContainer}>
      <Text style={styles.primaryText}>
      Spelling:</Text>
      <Text style={styles.secondaryText}>
        {resultData?.spelling}
      </Text>
      </View>
      <View style={styles.textContainer}>
      <Text style={styles.primaryText}>
      Grammar:</Text>
      <Text style={styles.secondaryText}>
        {
          resultData?.grammar
        }
      </Text>
      </View>
      <View style={styles.textContainer}>
      <Text style={styles.primaryText}>
      Readability:</Text>
      <Text style={styles.secondaryText}>
        {
          resultData?.readability
        }
      </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container:{
    flex: 1,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      backgroundColor: Colors.bg,
      paddingTop:'20%',
      paddingHorizontal:'10%'
  },
  textContainer:{
    flexDirection:'row',
    marginTop:10
  },
  primaryText:{
    color:Colors.orange,
    fontSize:25,
    flex:1
  },
  secondaryText:{
    color:Colors.white,
    fontSize:25,

  }
});
export default ItsGrammarResultModal;
