import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../theme/colors';

interface AppBarProps {
  onClose: () => void;
}

export const AppBar: React.FC<AppBarProps> = ({ onClose }) => (
  <View style={{ backgroundColor: colors.darkGray, alignItems: 'flex-start' }}>
    <TouchableOpacity onPress={onClose} style={{ padding: 16 }}>
      <Icon name="arrow-back" size={24} color="#fff" />
    </TouchableOpacity>
  </View>
);
