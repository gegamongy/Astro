import { useState } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ChartOptionsModal from "./ChartOptionsModal"; // Import the modal


const screenWidth = Dimensions.get("window").width;
// const pinnedTileSize = (screenWidth - 40) / 4; // Adjusted for better layout
const tileSize = (screenWidth - 40) / 2; // Ensures 2 tiles per row with spacing
const pinnedTileSize = tileSize * 0.9;  // Make pinned charts slightly smaller

export default function PinnedCharts({ pinnedCharts, refreshCharts }) {
    const router = useRouter();
    const [selectedChart, setSelectedChart] = useState(null);
    
      const handleLongPress = (chart) => {
        setSelectedChart(chart);
      };
    
      const handleClose = () => {
        setSelectedChart(null);
      };

    return (
        <View>
        <Text style={styles.sectionTitle}>Pinned Charts</Text>
        <FlatList
            horizontal
            data={pinnedCharts}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
            <TouchableOpacity 
                style={[styles.pinnedTile, { width: pinnedTileSize, height: pinnedTileSize }]}
                onPress={() => router.push(`/chart/${item._id}`)}
                onLongPress={() => handleLongPress(item)}
                >
                    <Ionicons name="pin" size={16} color="gold" style={styles.pinIcon} />
                <Text style={styles.chartText}>{item.name}</Text>
            </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
        />
        <ChartOptionsModal
                chart={selectedChart}
                onClose={handleClose}
                onEdit={() => { router.push(`/chart/${selectedChart._id}/edit`); handleClose(); }}
                refreshCharts={refreshCharts}
        />
        </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  pinnedTile: {
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 8,
    position: "relative",
  },
  pinIcon: { position: "absolute", top: 5, left: 5 },
  chartText: { fontSize: 14, fontWeight: "600", textAlign: "center" },
});
