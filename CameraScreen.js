import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const CameraScreen = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermission();
      const microphoneStatus = await Camera.requestMicrophonePermission();
      console.log('Camera permission:', cameraStatus);
      console.log('Microphone permission:', microphoneStatus);

      if (cameraStatus === 'authorized' && microphoneStatus === 'authorized') {
        setPermission('authorized');
      } else {
        setPermission('denied');
      }
    })();
  }, []);

  if (permission === 'denied') {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission is required</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Camera.requestCameraPermission().then(setPermission)}
        >
          <Text style={styles.buttonText}>Retry Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) return <Text style={styles.text}>Loading Camera...</Text>;

  return (
    <View style={styles.container}>
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Capture</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CameraScreen;
