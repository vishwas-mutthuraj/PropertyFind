import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Colors, Spacing, Radius } from '../theme';
import { Property } from '../components/PropertyCard';

const GRADIENT_COLORS: Record<string, string> = {
  blue: '#2D5986',
  green: '#2B6340',
  rose: '#803050',
  gold: '#7A5515',
};

interface Props {
  property: Property;
  onBack: () => void;
}

export const DetailScreen: React.FC<Props> = ({ property, onBack }) => {
  const [saved, setSaved] = useState(property.saved ?? false);
  const bgColor = GRADIENT_COLORS[property.gradient];

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Hero image area */}
      <View style={[styles.hero, { backgroundColor: bgColor }]}>
        <Text style={styles.heroGlyph}>⌂</Text>

        {/* Back */}
        <TouchableOpacity style={styles.circleBtn} onPress={onBack}>
          <Text style={styles.circleBtnText}>←</Text>
        </TouchableOpacity>

        {/* Fav */}
        <TouchableOpacity
          style={[styles.circleBtn, styles.circleRight]}
          onPress={() => setSaved(!saved)}
        >
          <Text style={{ fontSize: 14, color: saved ? Colors.red : '#fff' }}>
            {saved ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>

        {/* Match badge */}
        <View style={[styles.matchBadge, { backgroundColor: Colors.greenBg }]}>
          <View style={[styles.matchDot, { backgroundColor: Colors.green }]} />
          <Text style={[styles.matchText, { color: Colors.green }]}>{property.match}% match</Text>
        </View>

        {/* Image dots */}
        <View style={styles.dots}>
          {[0, 1, 2, 3, 4].map((i) => (
            <View key={i} style={[styles.dot, i === 0 && styles.dotActive]} />
          ))}
        </View>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Title row */}
        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{property.name}</Text>
            <Text style={styles.loc}>
              {property.location} · {property.status ?? 'Ready to Move'}
            </Text>
          </View>
        </View>

        {/* Price card */}
        <View style={styles.priceCard}>
          <Text style={styles.priceLabel}>ASKING PRICE</Text>
          <Text style={styles.priceVal}>{property.price}</Text>
          <Text style={styles.priceSub}>
            {property.beds} BHK · {property.sqft.toLocaleString()} sqft ·
            ≈ ₹{Math.round((parseInt(property.price.replace(/[^\d]/g, '')) * 100) / property.sqft).toLocaleString()}/sqft
          </Text>
        </View>

        {/* Amenities */}
        <Text style={styles.sectionLabel}>AMENITIES</Text>
        <View style={styles.amenRow}>
          {(property.amenities ?? ['Pool', 'Gym', 'Park', 'Parking']).map((a) => (
            <View key={a} style={styles.amenPill}>
              <Text style={styles.amenText}>{a}</Text>
            </View>
          ))}
        </View>

        {/* About */}
        <Text style={styles.sectionLabel}>ABOUT</Text>
        <Text style={styles.about}>{property.about}</Text>

        {/* Specs */}
        <Text style={styles.sectionLabel}>DETAILS</Text>
        <View style={styles.specGrid}>
          <SpecItem label="Bedrooms" value={`${property.beds}`} />
          <SpecItem label="Bathrooms" value={`${property.baths}`} />
          <SpecItem label="Area" value={`${property.sqft.toLocaleString()} sqft`} />
          <SpecItem label="Status" value={property.status ?? 'Ready'} />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* CTA bar */}
      <View style={styles.cta}>
        <TouchableOpacity
          style={[styles.ctaBtn, styles.ctaBtnGhost]}
          onPress={() => setSaved(!saved)}
        >
          <Text style={[styles.ctaBtnText, { color: Colors.text2 }]}>
            {saved ? '♥ Saved' : '♡ Save'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.ctaBtn, styles.ctaBtnPrimary, { flex: 1 }]}>
          <Text style={[styles.ctaBtnText, { color: '#fff' }]}>📞 Contact Agent</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const SpecItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={specStyles.item}>
    <Text style={specStyles.label}>{label}</Text>
    <Text style={specStyles.value}>{value}</Text>
  </View>
);

const specStyles = StyleSheet.create({
  item: {
    width: '48%',
    backgroundColor: Colors.surface2,
    borderRadius: Radius.md,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  label: {
    fontSize: 10,
    color: Colors.text3,
    fontWeight: '600',
    letterSpacing: 0.1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
  },
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  hero: {
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heroGlyph: {
    fontSize: 100,
    opacity: 0.35,
    color: '#fff',
  },
  circleBtn: {
    position: 'absolute',
    top: 10,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    elevation: 10,
  },
circleRight: {
  position: 'absolute',
  top: 50,
  right: 16,
  left: undefined,
},
  circleBtnText: {
    fontSize: 16,
    color: '#fff',
  },
  matchBadge: {
    position: 'absolute',
    top: 54,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  matchDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  matchText: {
    fontSize: 10,
    fontWeight: '700',
  },
  dots: {
    position: 'absolute',
    bottom: 14,
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dotActive: {
    width: 16,
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    padding: 18,
    paddingTop: 18,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 14,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    fontStyle: 'italic',
    lineHeight: 28,
  },
  loc: {
    fontSize: 12,
    color: Colors.text2,
    marginTop: 4,
  },
  priceCard: {
    backgroundColor: '#1A1530',
    borderWidth: 1,
    borderColor: Colors.accentBorder,
    borderRadius: Radius.lg,
    padding: 16,
    marginBottom: 18,
  },
  priceLabel: {
    fontSize: 10,
    color: Colors.text2,
    fontWeight: '600',
    letterSpacing: 0.12,
    textTransform: 'uppercase',
  },
  priceVal: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text,
    fontStyle: 'italic',
    marginTop: 4,
    lineHeight: 38,
  },
  priceSub: {
    fontSize: 11,
    color: Colors.text2,
    marginTop: 6,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.12,
    color: Colors.text3,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  amenRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18,
  },
  amenPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface2,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.sm,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  amenText: {
    fontSize: 11,
    color: Colors.text2,
  },
  about: {
    fontSize: 12.5,
    color: Colors.text2,
    lineHeight: 20,
    marginBottom: 18,
  },
  specGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  cta: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 18,
    paddingVertical: 14,
    paddingBottom: 24,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  ctaBtn: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  ctaBtnGhost: {
    backgroundColor: Colors.surface3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ctaBtnPrimary: {
    backgroundColor: Colors.accent,
  },
});
