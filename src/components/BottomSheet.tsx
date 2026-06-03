import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { Colors, Radius, Spacing } from '../theme';
import { Property } from './PropertyCard';

interface Collection {
  id: string;
  name: string;
  count: number;
  icon: string;
  iconColor: string;
  iconBg: string;
  selected?: boolean;
}

const COLLECTIONS: Collection[] = [
  { id: '1', name: 'Bangalore Investment', count: 12, icon: '⌂', iconColor: '#A89AF9', iconBg: 'rgba(124,110,245,0.15)', selected: true },
  { id: '2', name: 'Rental Leads', count: 7, icon: '⌗', iconColor: '#4ADE80', iconBg: 'rgba(74,222,128,0.1)' },
  { id: '3', name: 'Premium Properties', count: 4, icon: '◆', iconColor: '#FBBF24', iconBg: 'rgba(251,191,36,0.1)' },
];

interface Props {
  visible: boolean;
  property: Property | null;
  onClose: () => void;
  onCreateNew: () => void;
  onSave: (collectionId: string) => void;
}

export const BottomSheet: React.FC<Props> = ({
  visible,
  property,
  onClose,
  onCreateNew,
  onSave,
}) => {
  const slideAnim = useRef(new Animated.Value(400)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [selected, setSelected] = React.useState('1');

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 400, duration: 250, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  if (!property) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.handle} />

        <View style={styles.head}>
          <Text style={styles.title}>Add to Collection</Text>
          <Text style={styles.sub}>
            Save <Text style={{ color: Colors.text, fontWeight: '600' }}>{property.name}</Text>
          </Text>
        </View>

        <View style={styles.divider} />

        <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
          {COLLECTIONS.map((col) => (
            <TouchableOpacity
              key={col.id}
              style={[styles.colRow, selected === col.id && styles.colRowSel]}
              onPress={() => setSelected(col.id)}
            >
              <View style={[styles.radio, selected === col.id && styles.radioOn]}>
                {selected === col.id && <View style={styles.radioDot} />}
              </View>
              <View style={[styles.colIcon, { backgroundColor: col.iconBg }]}>
                <Text style={{ color: col.iconColor, fontSize: 16 }}>{col.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.colName}>{col.name}</Text>
                <Text style={styles.colInfo}>{col.count} PROPERTIES</Text>
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.createRow} onPress={onCreateNew}>
            <View style={styles.plusBtn}><Text style={styles.plusText}>+</Text></View>
            <Text style={styles.createText}>Create New Collection</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.sheetBtns}>
          <TouchableOpacity style={[styles.btn, styles.btnGhost]} onPress={onClose}>
            <Text style={[styles.btnText, { color: Colors.text2 }]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={() => onSave(selected)}>
            <Text style={[styles.btnText, { color: '#fff' }]}>Save</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.overlay,
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.sheetBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderColor: Colors.border2,
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.surface3,
    marginTop: 12,
    marginBottom: 4,
  },
  head: {
    padding: Spacing.xxl,
    paddingBottom: Spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  sub: {
    fontSize: 12,
    color: Colors.text2,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.xxl,
  },
  list: {
    maxHeight: 280,
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.md,
  },
  colRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: Radius.md,
    marginBottom: 6,
    backgroundColor: Colors.surface2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  colRowSel: {
    backgroundColor: Colors.accentBg,
    borderColor: Colors.accentBorder,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: Colors.text3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: {
    borderColor: Colors.accent,
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
  },
  colIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  colInfo: {
    fontSize: 10,
    color: Colors.text3,
    marginTop: 2,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  createRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  plusBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.accentBg,
    borderWidth: 1,
    borderColor: Colors.accentBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusText: {
    fontSize: 18,
    color: Colors.accent2,
    fontWeight: '600',
  },
  createText: {
    fontSize: 13,
    color: Colors.accent2,
    fontWeight: '600',
  },
  sheetBtns: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: Spacing.xxl,
    paddingTop: 16,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: Radius.md,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 13,
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
});
