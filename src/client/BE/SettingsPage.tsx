import { Linking } from "react-native";

export const handleVolumeChange = (value, setFunc) => {
    let volume = Math.round(value);
    setFunc(volume);
    // Logic for volume change
  };

export const openPhoneSettings = async () => {
    Linking.openSettings();
  };
