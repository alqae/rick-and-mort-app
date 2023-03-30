import { View, Text, StyleSheet, Image } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation/MainStack';
import { colors } from '../theme/colors';
import { Panel } from '../components';

export interface CharacterProps extends NativeStackScreenProps<RootStackParamList, 'Character'> { }

export const CharacterScreen: React.FC<CharacterProps> = ({ route }) => {
  const data = route.params.character;

  return (
    <View style={styles.container}>
      <Panel width={300} height={400} style={{ marginBottom: 50 }}>
        <View style={styles.row}>
          <Text style={styles.label}>{data.status}</Text>
          <Text style={styles.label}>{data.id}</Text>
        </View>

        <Image source={{ uri: data.image }} style={styles.image} />

        <View style={styles.stack}>
          <Text style={[styles.label, styles.center]}>{data.name}</Text>
          <Text style={[styles.label, styles.regular]}>{data.species}</Text>
        </View>

        <Text style={[styles.label, styles.gender]}>{data.gender}</Text>
      </Panel>

      <Panel width={300} height={150} style={{ paddingHorizontal: 24, alignItems: 'flex-start' }}>
        <View style={{ marginBottom: 16 }}>
          <Text style={styles.label}>Origin</Text>
          <Text numberOfLines={2} style={[styles.label, styles.value]}>{data.origin?.name}</Text>
        </View>

        <View>
          <Text style={styles.label}>Location</Text>
          <Text numberOfLines={2} style={[styles.label, styles.value]}>{data.location?.name}</Text>
        </View>
      </Panel>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    width: 220,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 10,
    borderColor: 'red'
  },
  stack: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 20,
    margin: 0,
    lineHeight: 20,
    color: colors.cyan,
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 16,
  },
  gender: {
    position: 'absolute',
    fontWeight: '400',
    bottom: 7,
    left: 10,
  },
  value: {
    fontWeight: '400',
    fontSize: 16,
  },
  center: {
    textAlign: 'center',
  },
  regular: {
    fontWeight: '400',
  }
});

