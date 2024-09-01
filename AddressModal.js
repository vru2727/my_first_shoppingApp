import React, { useState } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity } from 'react-native';

const AddressModal = ({ visible, onClose, onSave }) => {
  const [newAddress, setNewAddress] = useState('');

  const handleSave = () => {
    onSave(newAddress);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Address</Text>
          <TextInput
            style={styles.addressInput}
            placeholder="Enter new address"
            value={newAddress}
            onChangeText={(text) => setNewAddress(text)}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    //backgroundColor:"white"
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },
  addressInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10, color:'black'
  },
  saveButton: {
    backgroundColor: '#F83758',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#CCCCCC',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'black',
    fontSize: 16, fontWeight: 'bold',
  },
});

export default AddressModal;
