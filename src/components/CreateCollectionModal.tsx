import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors, Radius, Spacing } from '../theme';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (name: string, description: string, isPrivate: boolean) => void;
}

export const CreateCollectionModal: React.FC<Props> = ({ visible, onClose, onSave }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 220, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 70, friction: 10 }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 0.92, duration: 180, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim(), description.trim(), isPrivate);
      setName('');
      setDescription('');
      setIsPrivate(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} />
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.centeredView}
        pointerEvents="box-none"
      >
        <Animated.View
          style={[styles.modal, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
        >
          {/* Header */}
          <View style={styles.modalHead}>
            <View>
              <Text style={styles.modalTitle}>New Collection</Text>
              <Text style={styles.modalSub}>Organise your shortlisted properties</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeX}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Name */}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>COLLECTION NAME</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="e.g. Hyderabad Q2 Picks"
              placeholderTextColor={Colors.text3}
              selectionColor={Colors.accent}
            />
          </View>

          {/* Description */}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>
              DESCRIPTION{' '}
              <Text style={styles.optional}>— optional</Text>
            </Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Add a short note about this collection…"
              placeholderTextColor={Colors.text3}
              multiline
              numberOfLines={3}
              selectionColor={Colors.accent}
            />
          </View>

          {/* Private toggle */}
          <View style={styles.toggleRow}>
            <View style={[styles.checkbox, isPrivate && styles.checkboxOn]}>
              {isPrivate && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.toggleLabel}>Make this collection private</Text>
            <Switch
              value={isPrivate}
              onValueChange={setIsPrivate}
              trackColor={{ false: Colors.surface3, true: Colors.accent }}
              thumbColor="#fff"
              style={{ marginLeft: 'auto' }}
            />
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.btn, styles.btnGhost]} onPress={onClose}>
              <Text style={[styles.btnText, { color: Colors.text2 }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.btnPrimary, !name.trim() && styles.btnDisabled]}
              onPress={handleSave}
              disabled={!name.trim()}
            >
              <Text style={[styles.btnText, { color: '#fff' }]}>Save</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.overlay,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modal: {
    backgroundColor: '#1E1E28',
    borderRadius: Radius.xl,
    padding: Spacing.xxl,
    borderWidth: 1,
    borderColor: Colors.border2,
  },
  modalHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    fontStyle: 'italic',
  },
  modalSub: {
    fontSize: 12,
    color: Colors.text2,
    marginTop: 4,
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.surface3,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeX: {
    fontSize: 18,
    color: Colors.text2,
    lineHeight: 22,
  },
  field: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.12,
    color: Colors.text2,
    marginBottom: 7,
    textTransform: 'uppercase',
  },
  optional: {
    color: Colors.text3,
    fontSize: 9,
    textTransform: 'none',
    letterSpacing: 0,
  },
  input: {
    backgroundColor: Colors.surface2,
    borderWidth: 1,
    borderColor: Colors.border2,
    borderRadius: Radius.md,
    padding: 11,
    paddingHorizontal: 13,
    fontSize: 13,
    color: Colors.text,
  },
  textarea: {
    height: 68,
    textAlignVertical: 'top',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
    marginBottom: 2,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.text3,
    backgroundColor: Colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOn: {
    borderColor: Colors.accent,
    backgroundColor: Colors.accentBg,
  },
  checkmark: {
    fontSize: 10,
    color: Colors.accent,
    fontWeight: '700',
  },
  toggleLabel: {
    fontSize: 12,
    color: Colors.text2,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
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
  btnDisabled: {
    opacity: 0.5,
  },
});
