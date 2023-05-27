import { Linking } from "react-native";

export const handleChangeProfilePicture = () => {
}

export const handleChangeUsernameOrPassword = () => {
}

export const handleVolumeChange = (value, setFunc) => {
    let volume = Math.round(value);
    setFunc(volume);
    // Logic for volume change
  };

export const openPhoneSettings = async () => {
    Linking.openSettings();
  };
