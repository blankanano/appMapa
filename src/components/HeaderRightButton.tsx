import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface HeaderRightButtonProps {
  onPress: () => void;
}

const HeaderRightButton: React.FC<HeaderRightButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.menuButton} onPress={onPress}>
    <Text style={styles.menuButtonText}>☰</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
    backgroundColor: 'green',
    borderRadius: 8,
  },
  menuButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HeaderRightButton;
