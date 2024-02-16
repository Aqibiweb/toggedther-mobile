import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { listUserPhotos } from '../../store/actions/user';
import { getNameInitials, getImage } from '../../utils/getMethods';
import Colors from '../../constants/Colors';
import Loader from '../UI/Loader';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileStatus = ({ onPress }) => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userGetProfile);
  const userListPhotos = useSelector((state) => state.userListPhotos);

  const { data: dataProfile, loading: loadingProfile } = userProfile;

  const { data: photos, loading: loadingPhoto } = userListPhotos;

  useEffect(() => {
    if (!photos) {
      dispatch(listUserPhotos());
    }
  }, []);

  if (loadingProfile || loadingPhoto) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.imgContainer}>
        <View style={styles.error_avatar_view}>
          <Loader />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{width:'100%',height:120, backgroundColor:'rgba(256,256,256,0.8)',paddingLeft:20,flexDirection:'row',marginBottom:20,justifyContent:'flex-end'}}>
    {/* Chatboot component */}
<View style={{justifyContent:'center',alignItems:'center'}}>
<TouchableOpacity
style={styles.profilePictureContainer}
onPress={onPress}
>
{loadingPhoto && <Loader size="small" />}
{photos?.length > 0 && (
<FastImage
  source={{
    uri: `${getImage(Object.values(photos)[0].image)}`,
    priority: FastImage.priority.high,
  }}
  style={styles.image}
/>
)}
{userProfile && photos?.length <= 0 && (
<View style={styles.avatar_view}>
  <Text style={styles.avatar_initials}>
    {getNameInitials(dataProfile?.name)}
  </Text>
</View>
)}
</TouchableOpacity>
{userProfile ? (
<View style={styles.nameView}>
<Text style={styles.name}>{dataProfile?.name}</Text>
<TouchableOpacity onPress={() => {}}>
<MaterialCommunityIcons name="police-badge" size={12} color="rgba(0,0,0,0.1)" />
</TouchableOpacity>
</View>
) : (
<Loader />
)}
<View style={{width:'85%',backgroundColor:'rgba(0,0,0,0.02)',borderRadius:10,justifyContent:'center',alignItems:'center',paddingVertical:2}}>
<Text style={{color:'rgba(0,0,0,0.6)',fontSize:12}}>Complete my profile</Text>
</View>
</View>
</View>
  );
};

export default ProfileStatus;

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
