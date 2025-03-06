import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { 
  View, Text, FlatList, TextInput, TouchableOpacity, 
  StyleSheet, Dimensions 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";  // Import useRouter for navigation
import { getMyCharts } from "../../services/horoscopeAPI";
import ChartsList from "../../components/MyCharts/ChartsList";
import PinnedCharts from "../../components/MyCharts/PinnedCharts";

// Get screen width for dynamic sizing
const screenWidth = Dimensions.get("window").width;
const tileSize = (screenWidth - 40) / 2; // Ensures 2 tiles per row with spacing
const pinnedTileSize = tileSize * 0.9;  // Make pinned charts slightly smaller

// // Dummy chart data
// const pinnedCharts = [
//   { id: "1", name: "Natal Chart" },
//   { id: "2", name: "Transit Chart" },
//   { id: "3", name: "Trant Chart" },
//   { id: "4", name: "Transiart" },
// ];




export default function MyChartsScreen() {
  const router = useRouter();  // Initialize router for navigation
  const [search, setSearch] = useState("");
  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to refresh charts
  const refreshCharts = async () => {
    console.log('Refresh charts called')
    setLoading(true);  // Show loading indicator if needed
    const data = await getMyCharts();
    setCharts(data);
    setLoading(false);
  };

   // **Filter pinned and unpinned charts**
   const pinnedCharts = charts.filter(chart => chart.pinned);
   const unpinnedCharts = charts.filter(chart => !chart.pinned);

//   useEffect(() => {
//     refreshCharts();
//   }, []);

  useFocusEffect(
    useCallback(() => {
        console.log("UseFocusEffect called");
        refreshCharts();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* Pinned Charts */}
      <PinnedCharts pinnedCharts={pinnedCharts} refreshCharts={refreshCharts}/>

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
        <ChartsList charts={unpinnedCharts} refreshCharts={refreshCharts}/>
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
