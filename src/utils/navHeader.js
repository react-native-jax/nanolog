import React from 'react';
import { View, Text, Image } from 'react-native';
import colors from './colors';

const navTitle = title => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Image
      style={{ width: 30, height: 30, resizeMode: 'contain' }}
      source={require('../assets/logo.png')}
    />
    <Text style={{ fontWeight: '600', color: 'white', fontSize: 16 }}>
      {title}
    </Text>
  </View>
);

const navHeader = title => {
  return {
    title: navTitle(title),
    style: {
      backgroundColor: colors.navBarBg,
    },
    tintColor: 'white',
  };
};
export default navHeader;
