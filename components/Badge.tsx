import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from '../theme/colors';

interface BadgeProps {
  text: string;
  isActive: boolean;
  onPress: () => void;
}

export const Badge: React.FC<BadgeProps> = ({ text, isActive, onPress }) => {
  const color = colors[isActive ? 'cyan' : 'darkGray'];
  return (
    <TouchableOpacity onPress={onPress} style={[styles.badge, { borderColor: color }]}>
      <Text style={[styles.badgeText, { color }]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 1,
    height: 30,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 16,
  },
});
