import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextComponent from '../TextComponent';
import TouchableTextComponent from '../TouchableTextComponent';
import { handleChangeProfilePicture, handleChangeUsernameOrPassword, deleteAccount } from '../../BE/SettingsPage';

const SettingsAccountComponent = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <TextComponent type="textTitle" text="Account information" />
                <View>
                    <TouchableTextComponent text="Change profile picture" func={handleChangeProfilePicture}/>
                    <TouchableTextComponent text="Change username or password" func={handleChangeUsernameOrPassword}/>
                    <TouchableTextComponent text="Delete account" func={() => deleteAccount(navigation)} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    box: {
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 10,
        padding: 16,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    slider: {
        width: '100%'
    }
});

export default SettingsAccountComponent;