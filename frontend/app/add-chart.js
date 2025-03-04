import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Switch, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { addChart } from "../services/horoscopeAPI";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

export default function AddChartScreen() {
  const [chartName, setChartName] = useState("");
  const [chartDescription, setChartDescription] = useState("");
  const [chartData, setChartData] = useState([
    { id: 1, description: "", type: "", latitude: "", longitude: "", date: "", time: "", displayOptions: { planets: false, aspects: false } }
  ]);
  const [showSharedAspects, setShowSharedAspects] = useState(false);
  const [selectedHousesChart, setSelectedHousesChart] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (chartData.length > 0 && selectedHousesChart === null) {
      setSelectedHousesChart(chartData[0].id); // Select the first chart by default
    }
  }, [chartData]);


  

    const showDatePicker = (index) => {
    DateTimePickerAndroid.open({
        value: new Date(),
        mode: "date",
        onChange: (event, selectedDate) => {
        if (selectedDate) {
            const updatedCharts = [...chartData];
            updatedCharts[index].date = selectedDate.toISOString().split("T")[0];
            setChartData(updatedCharts);
        }
        }
    });
    };

    const showTimePicker = (index) => {
        DateTimePickerAndroid.open({
            value: new Date(),
            mode: "time",
            is24Hour: true,
            onChange: (event, selectedTime) => {
                if (selectedTime) {
                    const updatedCharts = [...chartData];
                    updatedCharts[index].time = selectedTime.toTimeString().split(" ")[0]; // Extracts HH:MM:SS in 24-hour format
                    setChartData(updatedCharts);
                }
            }
        });
    };
    


  const addChartData = () => {
    const newId = Date.now(); // Generates a unique timestamp ID
    setChartData([...chartData, { id: newId, description: "", type: "", latitude: "", longitude: "", date: "", time: "", displayOptions: { planets: false, aspects: false } }]);
  };
  

  const removeChartData = (id) => {
    if (chartData.length > 1) {
      setChartData(chartData.filter(chart => chart.id !== id));
    }
  };

  const handleDiscard = () => {
    console.log("Changes discarded");
    router.back();
  }

  const handleCancel = () => {
    Alert.alert(
      "Unsaved Changes",
      "Do you want to save your changes before exiting?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Discard", style: "destructive", onPress: handleDiscard },
        { text: "Save", onPress: handleSave }
      ]
    );
  };
  
  const handleSave = async () => {
    console.log("trying to save chart...");
    for (let chart of chartData) {
      if (!chartName || !chart.date || !chart.time || !chart.latitude || !chart.longitude) {
        Alert.alert("Error", "Please enter a valid name, date, time, latitude, and longitude for all charts.");
        return;
      }
    }

    const formattedChartData = chartData.map(chart => {
        const combinedDateTime = new Date(`${chart.date}T${chart.time}`);
        console.log("Converted datetime type:", typeof combinedDateTime);

        return {
            ...chart,
            datetime: combinedDateTime.toISOString(), // Convert to actual ISO Date format
            date: undefined,
            time: undefined
        };
    });

    console.log('Formatted chart data:', formattedChartData);

    try {
        console.log("Saving chart...");
        const response = await addChart({
            name: chartName,
            description: chartDescription,
            data: formattedChartData,
            showSharedAspects,
            selectedHousesChart,
        });

        if (response.success) {
            Alert.alert("Success", "Chart saved successfully!");
            router.back();
        } else {
            Alert.alert("Error", response.message || "Failed to save chart.");
        }
    } catch (error) {
        console.error("Error saving chart:", error);
        Alert.alert("Error", "Something went wrong while saving the chart.");
    }
};

  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Add New Chart</Text>
      <TextInput style={styles.input} placeholder="Chart Name" value={chartName} onChangeText={setChartName} />
      <TextInput style={styles.input} placeholder="Chart Description" value={chartDescription} onChangeText={setChartDescription} multiline />
      
      {chartData.map((chart, index) => (
        <View key={chart.id} style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Chart Data {index + 1}</Text>
          <TextInput style={styles.input} placeholder="Chart Data Description" value={chart.description} onChangeText={(text) => {
            const updatedCharts = [...chartData];
            updatedCharts[index].description = text;
            setChartData(updatedCharts);
          }} />
          <TextInput style={styles.input} placeholder="Who or What (Person, Thing, Event, Spell)" value={chart.type} onChangeText={(text) => {
            const updatedCharts = [...chartData];
            updatedCharts[index].type = text;
            setChartData(updatedCharts);
          }} />
          <TextInput 
                style={styles.input} 
                placeholder="Latitude" 
                keyboardType="numeric"
                value={chart.latitude} 
                onChangeText={(text) => {
                    const updatedCharts = [...chartData];
                    updatedCharts[index].latitude = text;
                    setChartData(updatedCharts);
                }} 
                />
                <TextInput 
                style={styles.input} 
                placeholder="Longitude" 
                keyboardType="numeric"
                value={chart.longitude} 
                onChangeText={(text) => {
                    const updatedCharts = [...chartData];
                    updatedCharts[index].longitude = text;
                    setChartData(updatedCharts);
                }} 
                />

                <TouchableOpacity onPress={() => showDatePicker(index)}>
                <Text style={styles.input}>
                    {chart.date ? chart.date : "Select Date"}
                </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => showTimePicker(index)}>
                <Text style={styles.input}>
                    {chart.time ? chart.time : "Select Time"}
                </Text>
                </TouchableOpacity>

          
          <View style={styles.switchContainer}>
            <Text>Show Planets</Text>
            <Switch value={chart.displayOptions.planets} onValueChange={(value) => {
              const updatedCharts = [...chartData];
              updatedCharts[index].displayOptions.planets = value;
              setChartData(updatedCharts);
            }} />
          </View>
          <View style={styles.switchContainer}>
            <Text>Show Aspects</Text>
            <Switch value={chart.displayOptions.aspects} onValueChange={(value) => {
              const updatedCharts = [...chartData];
              updatedCharts[index].displayOptions.aspects = value;
              setChartData(updatedCharts);
            }} />
          </View>
          
          {chartData.length > 1 && (
            <TouchableOpacity style={styles.removeButton} onPress={() => removeChartData(chart.id)}>
              <Ionicons name="trash" size={20} color="red" />
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addChartData}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      {chartData.length > 1 && (
        <View style={styles.compoundOptions}>
          <Text style={styles.sectionTitle}>Compound Display Options</Text>
          <View style={styles.switchContainer}>
            <Text>Show Shared Aspects</Text>
            <Switch value={showSharedAspects} onValueChange={setShowSharedAspects} />
          </View>
          <Text>Select Houses Displayed:</Text>
            {chartData.map((chart, index) => {
            const isSelected = selectedHousesChart === chart.id;
            return (
                <TouchableOpacity
                key={chart.id}
                style={isSelected ? styles.selectedOption : styles.unselectedOption}
                onPress={() => setSelectedHousesChart(chart.id)}
                >
                <Text style={isSelected ? styles.selectedText : styles.unselectedText}>
                    {chart.description.trim() !== "" ? chart.description : `Chart Data ${index + 1}`}
                </Text>
                </TouchableOpacity>
            );
            })}
        </View>
      )}

        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={{ color: "white" }}>Save</Text>
        </TouchableOpacity>
        </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 10 },
  chartSection: { padding: 15, borderWidth: 1, borderColor: "#ddd", borderRadius: 8, marginBottom: 10 },
  switchContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  addButton: { backgroundColor: "#6200ea", padding: 15, borderRadius: 8, alignItems: "center", marginBottom: 20 },
  removeButton: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  removeButtonText: { color: "red", marginLeft: 5 },
  compoundOptions: { marginTop: 20, padding: 15, borderWidth: 1, borderColor: "#ddd", borderRadius: 8 },
  radioButton: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 5 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 , marginBottom: 60},
  cancelButton: { padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#ccc" },
  saveButton: { padding: 10, borderRadius: 8, backgroundColor: "#6200ea", alignItems: "center" },
  
  selectedOption: {
    marginTop:15,
    backgroundColor: "#4CAF50", // Green for selected option
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  
  unselectedOption: {
    marginTop:15,
    backgroundColor: "#E0E0E0", // Light gray for unselected options
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  
  selectedText: {
    fontWeight: "bold",
    color: "#FFFFFF", // White text for selected button
  },
  
  unselectedText: {
    fontWeight: "bold",
    color: "#333333", // Darker text for unselected button
  },
  
});
