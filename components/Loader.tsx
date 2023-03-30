import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { colors } from '../theme/colors';

export const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#8FFFFF" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: colors.dark,
  },
});
