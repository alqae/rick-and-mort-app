import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { HomeProps } from '../screens';
import { colors } from '../theme/colors';
import { Character } from '../models';

interface CharacterCardProps extends Character { }

export const CharacterCard: React.FC<CharacterCardProps> = (character) => {
  const navigation = useNavigation<HomeProps['navigation']>();
  const {image, id, name, status} = character

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Character', { character })}>
      <Image
        source={{ uri: image }}
        style={styles.image}
      />
  
      <View style={styles.identificatorWrapper}>
        <Text style={styles.identificator}>{id}</Text>
      </View>
  
      <LinearGradient colors={['transparent', '#139991']} style={styles.gradient}>
        <Text numberOfLines={1} style={styles.name}>{name}</Text>
        <Text style={styles.status}>{status}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    padding: 0,
    marginHorizontal: 12,
    marginVertical: 12,
    position: 'relative',
    height: 175,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    paddingBottom: 7,
    paddingHorizontal: 12,
  },
  name: {
    color: colors.light,
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 16,
  },
  status: {
    color: colors.light,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 12,
  },
  identificatorWrapper: {
    position: 'absolute',
    width: 30,
    height: 30,
    backgroundColor: colors.dark,
    top: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  identificator: {
    color: colors.light,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 12,
  }
});
