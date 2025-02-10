// ios/AreaScanner.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import ARKit from 'react-native-arkit';

const AreaScanner = () => {
  const [area, setArea] = useState(0);

  const handlePlaneDetected = (anchor) => {
    try {
      if (!anchor.extent) {
        throw new Error("No valid plane data detected.");
      }
      const detectedArea = anchor.extent.x * anchor.extent.z;
      setArea(detectedArea.toFixed(2));
    } catch (error) {
      console.error("Plane detection error:", error);
      Alert.alert("Error", "Could not detect a surface.");
    }
  };

  return (
    <View style={styles.container}>
      <ARKit
        style={styles.arkit}
        planeDetection={ARKit.ARPlaneDetection.Horizontal}
        onPlaneDetected={handlePlaneDetected}
      />
      <View style={styles.overlay}>
        <Text style={styles.text}>Detected Area: {area} m²</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  arkit: { flex: 1 },
  overlay: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default AreaScanner;
