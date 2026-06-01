import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Colors, Spacing, Radius, Typography } from '../theme';

export interface Property {
  id: string;
  name: string;
  location: string;
  price: string;
  priceDetail: string;
  beds: number;
  baths: number;
  sqft: number;
  match: number;
  featured?: boolean;
  saved?: boolean;
  gradient: 'blue' | 'green' | 'rose' | 'gold';
  amenities?: string[];
  status?: string;
  about?: string;
}

const GRADIENTS: Record<string, { from: string; label: string }> = {
  blue: { from: '#2D5986', label: '🏢' },
  green: { from: '#2B6340', label: '🌿' },
  rose: { from: '#803050', label: '🌸' },
  gold: { from: '#7A5515', label: '✨' },
};

interface Props {
  property: Property;
  onPress: (property: Property) => void;
  onShortlist?: (property: Property) => void;
  style?: ViewStyle;
}

export const PropertyCard: React.FC<Props> = ({
  property,
  onPress,
  onShortlist,
  style,
}) => {
  const grad = GRADIENTS[property.gradient];
  const matchColor = property.match >= 90 ? Colors.green : Colors.amber;
  const matchBg = property.match >= 90 ? Colors.greenBg : Colors.amberBg;

  return (
    <View style={[styles.card, property.featured && styles.featured, style]}>
      {/* Image / Hero */}
      <View style={[styles.cardImg, { backgroundColor: grad.from }]}>
        <Text style={styles.glyph}>⌂</Text>
        {property.featured && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>⌑ FEATURED</Text>
          </View>
        )}
        <TouchableOpacity style={styles.fav}>
          <Text style={{ fontSize: 13, color: property.saved ? Colors.red : '#fff' }}>
            {property.saved ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
        <View style={styles.dots}>
          {[0, 1, 2, 3].map((i) => (
            <View key={i} style={[styles.dot, i === 0 && styles.dotActive]} />
          ))}
        </View>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <View style={styles.topRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name} numberOfLines={1}>{property.name}</Text>
            <Text style={styles.loc}>{property.location}</Text>
          </View>
          <View style={[styles.matchBadge, { backgroundColor: matchBg }]}>
            <View style={[styles.matchDot, { backgroundColor: matchColor }]} />
            <Text style={[styles.matchText, { color: matchColor }]}>{property.match}%</Text>
          </View>
        </View>

        <Text style={styles.price}>
          {property.price}{' '}
          <Text style={styles.priceSub}>{property.priceDetail}</Text>
        </Text>

        <View style={styles.meta}>
          <Text style={styles.metaItem}>🛏 {property.beds}</Text>
          <Text style={styles.metaItem}>🚿 {property.baths}</Text>
          <Text style={styles.metaItem}>📐 {property.sqft.toLocaleString()} sqft</Text>
        </View>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={[styles.btn, property.saved ? styles.btnSaved : styles.btnGhost]}
            onPress={() => onShortlist?.(property)}
          >
            <Text style={[styles.btnText, { color: property.saved ? Colors.accent2 : Colors.text2 }]}>
              {property.saved ? '✓ Saved ▾' : '+ Shortlist ▾'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={() => onPress(property)}>
            <Text style={[styles.btnText, { color: '#fff' }]}>View →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface2,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  featured: {
    borderColor: Colors.accentBorder,
  },
  cardImg: {
    height: 162,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  glyph: {
    fontSize: 64,
    opacity: 0.4,
    color: '#fff',
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  fav: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: {
    position: 'absolute',
    bottom: 10,
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
    padding: 14,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 4,
  },
  name: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.text,
  },
  loc: {
    ...Typography.small,
    color: Colors.text2,
    marginTop: 2,
  },
  matchBadge: {
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
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 8,
  },
  priceSub: {
    fontSize: 11,
    fontWeight: '400',
    color: Colors.text2,
  },
  meta: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 7,
  },
  metaItem: {
    fontSize: 11,
    color: Colors.text3,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 11,
    paddingTop: 11,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  btn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 12,
    fontWeight: '600',
  },
  btnGhost: {
    backgroundColor: Colors.surface3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  btnPrimary: {
    backgroundColor: Colors.accent,
  },
  btnSaved: {
    backgroundColor: Colors.accentBg,
    borderWidth: 1,
    borderColor: Colors.accentBorder,
  },
});
