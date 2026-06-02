import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import { Colors, Spacing, Radius } from '../theme';
import { PropertyCard, Property } from '../components/PropertyCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { TabBar, TabName } from '../components/TabBar';
import { BottomSheet } from '../components/BottomSheet';
import { CreateCollectionModal } from '../components/CreateCollectionModal';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    name: 'Prestige Lakeside Habitat',
    location: 'Varthur, Whitefield',
    price: '₹ 1.85 Cr',
    priceDetail: '· 3 BHK · 1,650 sqft',
    beds: 3,
    baths: 3,
    sqft: 1650,
    match: 94,
    featured: true,
    gradient: 'blue',
    amenities: ['Pool', 'Gym', 'Park', 'Parking'],
    status: 'Ready to Move',
    about: 'Premium lakeside community with panoramic views, world-class amenities and 3 BHK residences. Minutes from ITPL with seamless ORR access.',
  },
  {
    id: '2',
    name: 'Sobha Dream Acres',
    location: 'Panathur Road',
    price: '₹ 1.20 Cr',
    priceDetail: '· 3 BHK · 1,420 sqft',
    beds: 3,
    baths: 2,
    sqft: 1420,
    match: 89,
    saved: true,
    gradient: 'green',
    amenities: ['Pool', 'Parking'],
    status: 'Dec 2026',
    about: 'Well-designed 3 BHK apartments in a gated community with modern amenities. Close to major IT corridors and shopping destinations.',
  },
  {
    id: '3',
    name: 'Embassy Boulevard',
    location: 'Devanahalli, North Bangalore',
    price: '₹ 3.20 Cr',
    priceDetail: '· 4 BHK · 3,100 sqft',
    beds: 4,
    baths: 4,
    sqft: 3100,
    match: 91,
    gradient: 'gold',
    amenities: ['Gym', 'Park', 'Parking'],
    status: 'Ready to Move',
    about: 'Ultra-luxury villa plots and apartments near KIAL with Embassy\'s signature quality. An investment in tomorrow\'s prime address.',
  },
];

const FILTER_CHIPS = ['All', 'Apartment', 'Villa', '3 BHK'];

interface Props {
  onPropertyPress: (property: Property) => void;
  onShortlist: (property: Property) => void;
  onOpenCompare: () => void;
  onOpenShortlists: () => void;
  savedProperties: Property[];
}

export const ListingScreen: React.FC<Props> = ({
  onPropertyPress,
  onShortlist,
  onOpenCompare,
  onOpenShortlists,
  savedProperties,
}) => {
  const [activeTab, setActiveTab] = useState<TabName>('Discover');
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState(MOCK_PROPERTIES);
  const [sheetProperty, setSheetProperty] = useState<Property | null>(null);
  const [showSheet, setShowSheet] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('Whitefield, Bangalore');

  useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 2000);

  return () => clearTimeout(timer);
}, []);

  const toggleSave = (prop: Property) => {
  onShortlist(prop);

  setProperties((prev) =>
    prev.map((p) =>
      p.id === prop.id
        ? {
            ...p,
            saved: !p.saved,
          }
        : p
    )
  );
};

  const openSheet = (property: Property) => {
    setSheetProperty(property);
    setShowSheet(true);
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.surface} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.logo}>
            prop<Text style={{ color: Colors.accent2 }}>find</Text>
          </Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconBtn}>
              <Text style={styles.iconBtnText}>🔔</Text>
            </TouchableOpacity>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AS</Text>
            </View>
          </View>
        </View>

        {/* Search */}
        <TouchableOpacity style={styles.searchBar} activeOpacity={0.85}>
          <Text style={styles.searchIcon}>⌕</Text>
          <Text style={styles.searchText}>{searchText}</Text>
        </TouchableOpacity>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          {FILTER_CHIPS.map((chip) => (
            <TouchableOpacity
              key={chip}
              style={[styles.chip, activeFilter === chip && styles.chipActive]}
              onPress={() => setActiveFilter(chip)}
            >
              <Text style={[styles.chipText, activeFilter === chip && styles.chipTextActive]}>
                {chip}
                {chip === '3 BHK' ? ' ×' : ''}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results meta */}
      <View style={styles.resultsMeta}>
        <Text style={styles.count}>
          <Text style={{ color: Colors.text, fontWeight: '600' }}>211</Text>
          {' '}properties · Bangalore
        </Text>
        <TouchableOpacity style={styles.sortBtn}>
          <Text style={styles.sortBtnText}>Match ▾</Text>
        </TouchableOpacity>
      </View>

      {/* Cards */}
      <ScrollView
        style={styles.feed}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
        <>
           <SkeletonCard />
           <SkeletonCard />
           <SkeletonCard />
           <SkeletonCard />
        </>
        ) : (
      
          properties.map((property) => {
  const isSaved = savedProperties.some(
    (p) => p.id === property.id
  );

  return (
    <PropertyCard
      key={property.id}
      property={{
        ...property,
        saved: isSaved,
      }}
      onPress={onPropertyPress}
      onShortlist={openSheet}
    />
  );
})
        )}
      </ScrollView>

      {/* Bottom Tab */}
      {/* <TabBar active={activeTab} onPress={setActiveTab} /> */}
<TabBar
  active={activeTab}
  onPress={(tab) => {
    setActiveTab(tab);

    if (tab === 'Compare') {
      onOpenCompare();
    }

    if (tab === 'Shortlists') {
      onOpenShortlists();
    }
  }}
/>

      {/* Bottom Sheet */}
      <BottomSheet
        visible={showSheet}
        property={sheetProperty}
        onClose={() => setShowSheet(false)}
        onCreateNew={() => {
          setShowSheet(false);
          setTimeout(() => setShowModal(true), 300);
        }}
       
onSave={() => {
  if (sheetProperty) {
    toggleSave(sheetProperty);
  }

  setShowSheet(false);
}}
      />

      {/* Create Collection Modal */}
      <CreateCollectionModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={(name, desc, priv) => {
          setShowModal(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  header: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    fontStyle: 'italic',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.surface2,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnText: {
    fontSize: 16,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.surface2,
    borderWidth: 1,
    borderColor: Colors.border2,
    borderRadius: 12,
    padding: 10,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  searchIcon: {
    fontSize: 15,
    color: Colors.text2,
    opacity: 0.5,
  },
  searchText: {
    fontSize: 13,
    color: Colors.text2,
  },
  chips: {
    gap: 7,
    paddingRight: 4,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: {
    backgroundColor: Colors.accentBg,
    borderColor: Colors.accentBorder,
  },
  chipText: {
    fontSize: 11.5,
    fontWeight: '500',
    color: Colors.text2,
  },
  chipTextActive: {
    color: Colors.accent2,
  },
  resultsMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    paddingBottom: 8,
  },
  count: {
    fontSize: 12,
    color: Colors.text2,
  },
  sortBtn: {
    backgroundColor: Colors.accentBg,
    borderWidth: 1,
    borderColor: Colors.accentBorder,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  sortBtnText: {
    fontSize: 11,
    color: Colors.accent2,
    fontWeight: '600',
  },
  feed: {
    flex: 1,
  },
  feedContent: {
    padding: 14,
    gap: 12,
    paddingBottom: 24,
  },
});
