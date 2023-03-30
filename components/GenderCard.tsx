import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../theme/colors';

export const GenderCard: React.FC<GenderCardProps> = ({ text, icon, onPress, isActive }) => {
  const color = colors[isActive ? 'cyan' : 'darkGray'];
  return (
    <TouchableOpacity style={[styles.genderCard, { borderColor: color }]} onPress={onPress}>
      <Icon name={icon} size={55} color={color} />

      <Text numberOfLines={1} style={[styles.genderCardText, { color }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

interface GenderCardProps {
  icon: string;
  text: string;
  isActive: boolean;
  onPress: () => void;
}

const styles = StyleSheet.create({
  genderCard: {
    flex: 1,
    height: 100,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderCardText: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 28,
  },
});
