import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TextInputComponent from '../TextInputComponent';
import Modal from 'react-native-modal';
import TextComponent from '../TextComponent';
import ButtonComponent from '../ButtonComponent';
import { handleChangeUsernameOrPassword } from '../../BE/SettingsPage';

const ChangeDetailsModal = ({ modalState, setModalState }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(() => {
      setUsername("");
      setPassword("");
    }, [modalState]);

    return (
      <View>
        <Modal isVisible={modalState} onBackdropPress={() => setModalState(false)}>
              <View style={styles.modalContent}>
                <TextComponent type="textTitle" text="Update Username/Password" />
                <TextInputComponent placeholder="Username" func={setUsername} value={username} />
                <TextInputComponent placeholder="Password" func={setPassword} value={password} />
                <ButtonComponent text="Update" func={() => {handleChangeUsernameOrPassword(username, password, setModalState)}} />
              </View>
        </Modal>        
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
    },
  });
  
  export default ChangeDetailsModal;