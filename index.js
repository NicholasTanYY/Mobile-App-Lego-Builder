import { AppRegistry } from 'react-native';
import App from './src/client/App';
import { name as appName } from './app.json';
import { playbackService } from './src/client/BE/MusicSettings';
import TrackPlayer from 'react-native-track-player';
import 'react-native-reanimated';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => playbackService);
