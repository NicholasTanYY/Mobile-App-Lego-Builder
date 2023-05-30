import { Linking, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PORT } from '@env';
import axios from "axios";

export const handleChangeProfilePicture = () => {
}

export const handleChangeUsernameOrPassword = () => {
}

export const deleteAccount = (navigation) => {
  Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const username = await AsyncStorage.getItem("userData");
            const resp = await axios.post(`http://10.0.2.2:${PORT}/api/deleteAccount`, {username});
            if (resp.data.error) {
              alert(resp.data.error);
              return;
            }
            alert("Account deleted");
            await AsyncStorage.clear();
            navigation.navigate("Home");
          },
        },
      ],
    );
}

export const handleVolumeChange = (value, setFunc) => {
    let volume = Math.round(value);
    setFunc(volume);
    // Logic for volume change
  };

export const openPhoneSettings = async () => {
    Linking.openSettings();
  };
