import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../theme';

export type TabName = 'Discover' | 'Shortlists' | 'Compare' | 'Profile';

const TABS: { name: TabName; icon: string }[] = [
  { name: 'Discover', icon: '⊙' },
  { name: 'Shortlists', icon: '♡' },
  { name: 'Compare', icon: '⊞' },
  { name: 'Profile', icon: '◉' },
];

interface Props {
  active: TabName;
  onPress: (tab: TabName) => void;
}

export const TabBar: React.FC<Props> = ({ active, onPress }) => {
  return (
    <View style={styles.bar}>
      {TABS.map((tab) => {
        const isActive = active === tab.name;

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => onPress(tab.name)}
          >
            <Text style={[styles.icon, isActive && styles.iconActive]}>
              {tab.icon}
            </Text>

            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 10,
    paddingBottom: 24,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },

  icon: {
    fontSize: 18,
    color: Colors.text3,
  },

  iconActive: {
    color: Colors.accent2,
  },

  label: {
    fontSize: 10,
    color: Colors.text3,
  },

  labelActive: {
    color: Colors.accent2,
    fontWeight: '600',
  },
});