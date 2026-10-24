import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createAudioPlaylist, setAudioModeAsync } from 'expo-audio';

const TRACK_1 = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
const TRACK_2 = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3';

export default function App() {
  const playlist = useRef(null);
  const [status, setStatus] = useState('Step 1: tap "Play track 1".');

  const playTrack1 = async () => {
    await setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      interruptionMode: 'doNotMix',
    });
    // A playlist with one track, shown on the lock screen / notification.
    playlist.current = createAudioPlaylist({ sources: [{ uri: TRACK_1 }] });
    playlist.current.setActiveForLockScreen(true, { title: 'Track 1' }, { showNextTrack: true });
    playlist.current.play();
    setStatus('Step 2: wait for the notification, then tap "Add track 2 and skip".');
  };

  const addTrack2AndSkip = () => {
    // Add a track after the lock screen session exists, then move to it.
    playlist.current.add({ uri: TRACK_2 });
    playlist.current.next();
    setStatus('Expected: track 2 plays. Actual on Android: the app crashes.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{status}</Text>
      <Button title="Play track 1" onPress={playTrack1} />
      <View style={styles.gap} />
      <Button title="Add track 2 and skip" onPress={addTrack2AndSkip} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  status: { fontSize: 16, marginBottom: 24, textAlign: 'center' },
  gap: { height: 16 },
});
