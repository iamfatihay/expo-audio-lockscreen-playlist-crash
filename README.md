# expo-audio: Android crash when an AudioPlaylist moves to a track added later

Minimal repro for an expo-audio bug on Android. A blank SDK 58 app; all the code is in `App.js`.

## Steps

1. `npm install`
2. `npx expo run:android` (or a release build: `npx expo run:android --variant release`)
3. Tap **Play track 1** and wait until the media notification shows "Track 1".
4. Tap **Add track 2 and skip**. It calls `playlist.add()` and then `playlist.next()`.

**Expected:** track 2 plays.

**Actual:** the app crashes:

```
java.lang.IllegalStateException: Invalid PlayerInfo update, old index: 0 (count=1), new index = 1, sent from com.example.audiolockscreencrash, interface version=8
	at androidx.core.util.Preconditions.checkState(Preconditions.java:169)
	at androidx.media3.session.MediaUtils.mergePlayerInfo(MediaUtils.java:150)
	at androidx.media3.session.MediaControllerImplBase.onPlayerInfoChanged(MediaControllerImplBase.java:2919)
	...
```

Tested with expo 58.0.19 and expo-audio 58.0.10 on an Android 15 (API 35) emulator.

The audio files are the public SoundHelix examples.
