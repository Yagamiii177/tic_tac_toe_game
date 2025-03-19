import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PlayerNameModal = ({ visible, onClose, onSave }) => {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  const handleSave = () => {
    if (player1Name.trim() && player2Name.trim()) {
      onSave(player1Name, player2Name);
      setPlayer1Name("");
      setPlayer2Name("");
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardView}
          >
            <ScrollView
              contentContainerStyle={styles.scrollView}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.modalContent}>
                <Text style={styles.title}>Enter Player Names</Text>
                <TextInput
                  style={[styles.input, { color: "#476bed" }]}
                  placeholder="Player 1 (X) Name"
                  placeholderTextColor="#888"
                  value={player1Name}
                  onChangeText={setPlayer1Name}
                />
                <TextInput
                  style={[styles.input, { color: "#FF6347" }]}
                  placeholder="Player 2 (O) Name"
                  placeholderTextColor="#888"
                  value={player2Name}
                  onChangeText={setPlayer2Name}
                />
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSave}
                >
                  <Text style={styles.saveText}>Save</Text>
                  <Ionicons
                    name="save-outline"
                    size={15}
                    color="white"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  keyboardView: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 350,
    padding: 30,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 50,
  },
  title: {
    fontSize: 23,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 15,
  },
  saveButton: {
    flexDirection: "row",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  saveText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 3,
  },
  icon: {
    marginLeft: 0,
  },
});

export default PlayerNameModal;
