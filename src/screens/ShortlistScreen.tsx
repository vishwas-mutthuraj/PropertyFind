import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../theme';
import { PropertyCard, Property } from '../components/PropertyCard';

interface Props {
  properties: Property[];
  onPropertyPress: (property: Property) => void;
  onBack: () => void;
}

export const ShortlistScreen: React.FC<Props> = ({
  properties,
  onPropertyPress,
  onBack,
}) => {
  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.heading}>Saved Properties</Text>
          <Text style={styles.subheading}>
            {properties.length} shortlisted
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {properties.length === 0 ? (
          <Text style={styles.empty}>
            No properties shortlisted yet.
          </Text>
        ) : (
          properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onPress={onPropertyPress}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bg,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
  },

  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: Colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backText: {
    fontSize: 14,
    color: Colors.text,
  },

  heading: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },

  subheading: {
    fontSize: 11,
    color: Colors.text2,
  },

  content: {
    padding: 14,
    gap: 12,
  },

  empty: {
    textAlign: 'center',
    color: Colors.text2,
    marginTop: 40,
  },
});