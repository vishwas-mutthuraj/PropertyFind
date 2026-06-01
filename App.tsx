import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListingScreen } from './src/screens/ListingScreen';
import { DetailScreen } from './src/screens/DetailScreen';
import { CompareScreen } from './src/screens/CompareScreen';
import { Property } from './src/components/PropertyCard';
import { ShortlistScreen } from './src/screens/ShortlistScreen';
import { Colors } from './src/theme';

type Screen = 'listing' | 'detail' | 'compare' | 'shortlists';
export default function App() {
  const [screen, setScreen] = useState<Screen>('listing');
  const [selectedProperty, setSelectedProperty] =
    useState<Property | null>(null);

  const [savedProperties, setSavedProperties] = useState<Property[]>([]);

  const handlePropertyPress = (property: Property) => {
    setSelectedProperty(property);
    setScreen('detail');
  };

  const handleBack = () => {
    setScreen('listing');
    setSelectedProperty(null);
  };

  const handleShortlist = (property: Property) => {
    setSavedProperties((prev) => {
      const exists = prev.some((p) => p.id === property.id);

      if (exists) {
        return prev.filter((p) => p.id !== property.id);
      }

      return [...prev, { ...property, saved: true }];
    });
  };

  return (
    <View style={styles.root}>
      {screen === 'listing' && (
     <ListingScreen
  onPropertyPress={handlePropertyPress}
  onShortlist={handleShortlist}
  onOpenCompare={() => setScreen('compare')}
  onOpenShortlists={() => setScreen('shortlists')}
  savedProperties={savedProperties}
/>
      )}

      {screen === 'detail' && selectedProperty && (
        <DetailScreen
          property={selectedProperty}
          onBack={handleBack}
        />
      )}

      {screen === 'compare' && (
        <CompareScreen
          properties={savedProperties}
          onBack={handleBack}
          activeTab="Compare"
          onTabPress={(tab) => {
            if (tab === 'Discover') {
              setScreen('listing');
            }
          }}
        />
      )}

      {screen === 'shortlists' && (
<ShortlistScreen
  properties={savedProperties}
  onPropertyPress={handlePropertyPress}
  onBack={() => setScreen('listing')}
/>
)}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
});