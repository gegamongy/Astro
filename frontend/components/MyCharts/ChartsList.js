import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ChartOptionsModal from "./ChartOptionsModal"; // Import the modal
import { deleteChart, togglePinChart } from "../../services/horoscopeAPI"; // Import API functions

const screenWidth = Dimensions.get("window").width;
const tileSize = (screenWidth - 40) / 2; // Ensures 2 tiles per row with spacing

export default function ChartsList({ charts, refreshCharts }) {
  const router = useRouter();
  const [selectedChart, setSelectedChart] = useState(null);

  const handleLongPress = (chart) => {
    setSelectedChart(chart);
  };

  const handleClose = () => {
    setSelectedChart(null);
  };

  
  return (
    <>
      <FlatList
        data={[{ _id: "add", name: "Add Chart" }, ...charts]} // Prepend Add button dynamically
        keyExtractor={(item) => item._id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.chartTile, { width: tileSize, height: tileSize }]}
            onPress={() => item._id === "add" ? router.push("/add-chart") : router.push(`/chart/${item._id}`)}
            onLongPress={() => item._id !== "add" && handleLongPress(item)}
          >
            {item._id === "add" ? (
              <Ionicons name="add" size={40} color="gray" />
            ) : (
              <Text style={styles.chartText}>{item.name}</Text>
            )}
          </TouchableOpacity>
        )}
        columnWrapperStyle={styles.row}
      />

      <ChartOptionsModal
        chart={selectedChart}
        onClose={handleClose}
        onEdit={() => { router.push(`/chart/${selectedChart._id}/edit`); handleClose(); }}
        refreshCharts={refreshCharts}
      />
    </>
  );
}

const styles = StyleSheet.create({
  row: { justifyContent: "space-between" },
  chartTile: {
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 8,
  },
  chartText: { fontSize: 14, fontWeight: "600", textAlign: "center" },
});
