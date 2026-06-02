import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius } from '../theme';
import { Property } from '../components/PropertyCard';
import { TabBar, TabName } from '../components/TabBar';

const GRADIENT_COLORS: Record<string, string> = {
  blue: '#2D5986',
  green: '#2B6340',
  rose: '#803050',
  gold: '#7A5515',
};

interface CompareRow {
  label: string;
  key: keyof Property | 'pool' | 'gym' | 'pricePerSqft';
}

const ROWS: CompareRow[] = [
  { label: 'Match', key: 'match' },
  { label: 'Price', key: 'price' },
  { label: 'Sqft', key: 'sqft' },
  { label: 'Pool', key: 'pool' },
  { label: 'Gym', key: 'gym' },
  { label: '₹/sqft', key: 'pricePerSqft' },
  { label: 'Status', key: 'status' },
];

interface Props {
  properties: Property[];
  onBack: () => void;
  activeTab?: TabName;
  onTabPress?: (tab: TabName) => void;
}

const getCellValue = (prop: Property, key: string): string => {
  if (key === 'pool') return prop.amenities?.includes('Pool') ? '✓' : '—';
  if (key === 'gym') return prop.amenities?.includes('Gym') ? '✓' : '—';
  if (key === 'pricePerSqft') {
    const crores = parseFloat(prop.price.replace(/[^\d.]/g, ''));
    return `₹${Math.round((crores * 10000000) / prop.sqft / 100).toLocaleString()}`;
  }
  const val = (prop as any)[key];
  if (key === 'match') return `${val}%`;
  if (key === 'sqft') return val?.toLocaleString();
  return val ? String(val) : '—';
};

const isBest = (props: Property[], key: string, idx: number): boolean => {
  if (key === 'match') {
    const max = Math.max(...props.map((p) => p.match));
    return props[idx].match === max;
  }
  if (key === 'sqft') {
    const max = Math.max(...props.map((p) => p.sqft));
    return props[idx].sqft === max;
  }
  if (key === 'pricePerSqft' || key === 'price') {
    const crores = props.map((p) => parseFloat(p.price.replace(/[^\d.]/g, '')));
    const min = Math.min(...crores);
    return crores[idx] === min;
  }
  return false;
};

const BEST_LABELS: Record<string, string> = {
  match: 'TOP',
  sqft: 'LARGEST',
  price: 'LOWEST',
  pricePerSqft: 'BEST',
};

export const CompareScreen: React.FC<Props> = ({
  properties,
  onBack,
  activeTab = 'Compare',
  onTabPress = () => {},
}) => {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.surface} />

      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.heading}>Compare</Text>
          <Text style={styles.subheading}>{properties.length} properties selected</Text>
        </View>
        <TouchableOpacity style={[styles.exportChip]}>
          <Text style={styles.exportText}>Export</Text>
        </TouchableOpacity>
      </View>

      {/* Table */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.tableWrap}>
          {/* Header row */}
          <View style={styles.row}>
            <View style={[styles.labelCell, styles.headerLabelCell]}>
              <Text style={styles.headerFeatureText}>FEATURE</Text>
            </View>
            {properties.map((prop) => (
              <View key={prop.id} style={[styles.valueCell, styles.headerCell]}>
                <View style={[styles.propThumb, { backgroundColor: GRADIENT_COLORS[prop.gradient] }]}>
                  <Text style={{ fontSize: 22, opacity: 0.5, color: '#fff' }}>⌂</Text>
                </View>
                <Text style={styles.propName} numberOfLines={2}>{prop.name}</Text>
                <Text style={styles.propLoc}>{prop.location.split(',')[0]}</Text>
              </View>
            ))}
          </View>

          {/* Data rows */}
          {ROWS.map((row, rowIdx) => (
            <View key={row.key} style={[styles.row, rowIdx % 2 === 1 && styles.rowAlt]}>
              <View style={[styles.labelCell]}>
                <Text style={styles.rowLabel}>{row.label}</Text>
              </View>
              {properties.map((prop, i) => {
                const val = getCellValue(prop, row.key);
                const best = isBest(properties, row.key, i);
                const isCheck = val === '✓';
                const isDash = val === '—';

                return (
                  <View key={prop.id} style={styles.valueCell}>
                    {best && BEST_LABELS[row.key] && (
                      <View style={styles.bestTag}>
                        <Text style={styles.bestTagText}>{BEST_LABELS[row.key]}</Text>
                      </View>
                    )}
                    <Text
                      style={[
                        styles.cellText,
                        isCheck && { color: Colors.green, fontWeight: '600' },
                        isDash && { color: Colors.text3 },
                        row.key === 'price' && { color: Colors.text },
                      ]}
                    >
                      {val}
                    </Text>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>

      <TabBar active={activeTab} onPress={onTabPress} />
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
  exportChip: {
    marginLeft: 'auto',
    backgroundColor: Colors.accentBg,
    borderWidth: 1,
    borderColor: Colors.accentBorder,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  exportText: {
    fontSize: 11,
    color: Colors.accent2,
    fontWeight: '600',
  },
  tableWrap: {
    margin: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  rowAlt: {
    backgroundColor: 'rgba(255,255,255,0.015)',
  },
  labelCell: {
    width: 80,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: Colors.surface3,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  headerLabelCell: {
    backgroundColor: Colors.surface3,
  },
  headerFeatureText: {
    fontSize: 9,
    color: Colors.text3,
    fontWeight: '600',
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  rowLabel: {
    fontSize: 10,
    color: Colors.text3,
    fontWeight: '500',
    letterSpacing: 0.06,
    textTransform: 'uppercase',
  },
  valueCell: {
    flex: 1,
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: Colors.border,
    minHeight: 48,
  },
  headerCell: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  propThumb: {
    width: '100%',
    height: 60,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  propName: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 15,
  },
  propLoc: {
    fontSize: 10,
    color: Colors.text3,
    marginTop: 2,
    textAlign: 'center',
  },
  cellText: {
    fontSize: 11.5,
    color: Colors.text2,
  },
  bestTag: {
    backgroundColor: Colors.greenBg,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    marginBottom: 3,
  },
  bestTagText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.green,
    letterSpacing: 0.04,
  },
});
