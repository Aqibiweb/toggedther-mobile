import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';

const Loader = ({ size,color }) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size={size} color={color?color:Colors.icons} />
    </View>
  );
};
  
export default Loader;
