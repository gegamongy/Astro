import React, { useState } from "react";
import { 
  View, Text, FlatList, TextInput, TouchableOpacity, 
  StyleSheet, Dimensions 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Get screen width for dynamic sizing
const screenWidth = Dimensions.get("window").width;
const tileSize = (screenWidth - 40) / 2; // Ensures 2 tiles per row with spacing
const pinnedTileSize = tileSize * 0.9;  // Make pinned charts slightly smaller

// Dummy chart data
const pinnedCharts = [
  { id: "1", name: "Natal Chart" },
  { id: "2", name: "Transit Chart" },
  { id: "3", name: "Trant Chart" },
  { id: "4", name: "Transiart" },
];

const charts = [
  { id: "add", name: "Add Chart" }, // "+" Button
  { id: "3", name: "Synastry Chart" },
  { id: "4", name: "Composite Chart" },
  { id: "5", name: "Solar Return" },
  { id: "6", name: "SynaChart" },
  { id: "7", name: "Composart" },
  { id: "8", name: "Solareturn" },
];

export default function MyChartsScreen() {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      {/* Pinned Charts */}
      <View>
        <Text style={styles.sectionTitle}>Pinned Charts</Text>
        <FlatList
          horizontal
          data={pinnedCharts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.pinnedTile, { width: pinnedTileSize, height: pinnedTileSize }]}>
              <Ionicons name="pin" size={16} color="gold" style={styles.pinIcon} />
              <Text style={styles.chartText}>{item.name}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
      </View>

      {/* Charts Section */}
      <View style={styles.chartsSection}>
        <View style={styles.searchBarContainer}>
          <TextInput 
            style={styles.searchBar}
            placeholder="Search charts..."
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Charts List */}
        <FlatList
          data={charts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.chartTile, { width: tileSize, height: tileSize }]}>
              {item.id === "add" ? (
                <Ionicons name="add" size={40} color="gray" />
              ) : (
                <Text style={styles.chartText}>{item.name}</Text>
              )}
            </TouchableOpacity>
          )}
          columnWrapperStyle={styles.row}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },

  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },

  // Pinned Charts Styles
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

  // Charts Section
  chartsSection: { flex: 1, marginTop: 15 },

  searchBarContainer: { flexDirection: "row", marginBottom: 10, alignItems: "center" },
  searchBar: {
    flex: 1, height: 40, backgroundColor: "#f0f0f0",
    borderRadius: 8, paddingHorizontal: 10, marginRight: 10,
  },
  filterButton: {
    backgroundColor: "#6200ea", padding: 10, borderRadius: 8,
  },

  // Charts Grid
  row: { justifyContent: "space-between" },
  chartTile: {
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 8,
  },
});
