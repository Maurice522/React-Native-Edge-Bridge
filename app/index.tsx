import { Assurance } from '@adobe/react-native-aepassurance';
import { LogLevel, MobileCore } from '@adobe/react-native-aepcore';
import { EdgeBridge } from "@adobe/react-native-aepedgebridge";
import { Consent } from '@adobe/react-native-aepedgeconsent';
import { Identity } from '@adobe/react-native-aepedgeidentity';
import React, { useState } from 'react';
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';

export default function Index() {
  const [assuranceLink, setAssuranceLink] = useState("");
  const [showInput, setShowInput] = useState(false);

  const DEFAULT_LINK = "YOUR ASSURANCE LINK HERE";

  MobileCore.initializeWithAppId("YOUR APP ID HERE")
    .then(() => console.log("Initialized APP with AEP"))
    .catch((e) => console.log("Error initializing: ", e));
  MobileCore.setLogLevel(LogLevel.VERBOSE);

  const showToast = () => {
    ToastAndroid.show('Hello from the Home screen!', ToastAndroid.SHORT);
    console.log("Home");
  };

  const showExtensionVersion = () => {
    Assurance.extensionVersion().then(v => console.log("Assurance:", v));
    EdgeBridge.extensionVersion().then(v => console.log("Edge Bridge:", v));
    Identity.extensionVersion().then(v => console.log("Identity:", v));
    Consent.extensionVersion().then(v => console.log("Consent:", v));
    ToastAndroid.show('Logging versions', ToastAndroid.SHORT);
  };

  const connectToAssurance = (link) => {
    Assurance.startSession(link);
    ToastAndroid.show('Connecting to Assurance...', ToastAndroid.SHORT);
    setShowInput(false);
    setAssuranceLink("");
  }

  const sendTrackAction = () => {
    MobileCore.trackAction("Track Action Send", { plan: "Gold" });
    ToastAndroid.show('Send Track Action!', ToastAndroid.SHORT);
  };

  const sendTrackState = () => {
    MobileCore.trackState("Track State Send", { screenCategory: "Home" });
    ToastAndroid.show('Send Track State', ToastAndroid.SHORT);
  };

  const ActionButton = ({ title, onPress, color }) => (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>React Native with Edge Bridge</Text>
        <Text style={styles.subtitle}>Integrations & Tracking</Text>

        <ActionButton title="Show Toast" onPress={showToast} color="#4CAF50" />
        <ActionButton title="Show Extension Version" onPress={showExtensionVersion} color="#2196F3" />
        <View style={styles.spacer} />
        <ActionButton title="Connect to Assurance" onPress={() => setShowInput(true)} color="#9C27B0" />
        <View style={styles.spacer} />
        <ActionButton title="Send TrackAction" onPress={sendTrackAction} color="#FF9800" />
        <ActionButton title="Send TrackState" onPress={sendTrackState} color="#E91E63" />
      </ScrollView>

      {/* Modal for input box */}
      <Modal
        visible={showInput}
        transparent
        animationType="fade"
        onRequestClose={() => setShowInput(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ color: '#fff', fontSize: 18, marginBottom: 10 }}>Enter Assurance Link</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Assurance Link"
              placeholderTextColor="#ccc"
              value={assuranceLink}
              onChangeText={setAssuranceLink}
            />
            <View style={styles.buttonRow}>
              <Button title="Connect" onPress={() => connectToAssurance(assuranceLink)} />
              <Button title="Use Default" onPress={() => connectToAssurance(DEFAULT_LINK)} />
            </View>
            <View style={{ marginTop: 10 }}>
              <Button title="Cancel" color="red" onPress={() => setShowInput(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  }, 
  spacer: {
    height: 10,
  },
  input: {
    backgroundColor: '#252538',
    color: '#fff',
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputBox: {
    marginTop: 10,
    backgroundColor: '#3a3a4e',
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#BBBBBB',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2a2a3e',
    padding: 20,
    borderRadius: 12,
    width: '80%',
  }
});
