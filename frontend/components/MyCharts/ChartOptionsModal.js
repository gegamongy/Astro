import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { togglePinChart, deleteChart } from "../../services/horoscopeAPI";
// import { useRouter } from "expo-router";

export default function ChartOptionsModal({ chart, onClose, onEdit, refreshCharts}) {
  if (!chart) return null;
    // const router = useRouter();

  
    const handleDelete = async () => {
      Alert.alert(
        "Delete Chart?",
        "Are you sure you want to delete this chart? This action cannot be undone.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              try {
                await deleteChart(chart._id);
                refreshCharts(); // Refresh chart list after deletion
              } catch (error) {
                console.error("Error deleting chart:", error);
              }
              onClose();
            },
          },
        ]
      );
    };
  
    const handlePin = async () => {
      try {
        await togglePinChart(chart._id, !chart.pinned);
        refreshCharts(); // Refresh list after pinning
      } catch (error) {
        console.error("Error pinning chart:", error);
      }
      onClose();
    };
    

    return (
        <Modal transparent animationType="fade" visible={!!chart}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>{chart.name}</Text>
                <TouchableOpacity style={styles.modalButton} onPress={onEdit}>
                    <Ionicons name="pencil" size={20} color="black" />
                    <Text style={styles.modalButtonText}>Edit Chart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={handlePin}>
                    <Ionicons name="star" size={20} color="black" />
                    <Text style={styles.modalButtonText}>{chart.pinned ? "Un-pin Chart" : "Pin Chart"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.deleteButton]} onPress={handleDelete}>
                    <Ionicons name="trash" size={20} color="red" />
                    <Text style={[styles.modalButtonText, { color: "red" }]}>Delete Chart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
                    <Text style={styles.modalCloseButtonText}>Cancel</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>
        );
    }

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 250,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
  },
  modalButtonText: {
    fontSize: 16,
    marginLeft: 10,
  },
  deleteButton: {
    marginTop: 10,
  },
  modalCloseButton: {
    marginTop: 15,
    padding: 10,
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: "blue",
  },
});
