import { Button, StyleSheet, Text, TextInput, View, ActivityIndicator } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from 'react-native-element-dropdown';

import React, { useState, useEffect } from "react";
import { useCurrency } from "../hooks/useCurrency";

export default function Index() {
  const [inputValueOne, setInputValueOne] = useState("");
  const [inputValueTwo, setInputValueTwo] = useState("");
  const [selectedCurrencyOne, setSelectedCurrencyOne] = useState("USD");
  const [selectedCurrencyTwo, setSelectedCurrencyTwo] = useState("LKR");
  
  const { 
    loading, 
    error, 
    convertCurrency, 
    getAvailableCurrencies,
    getExchangeRate 
  } = useCurrency();
  
  
  const currencyData = getAvailableCurrencies();
  
  
  const onPressConvert = () => {
    if (!inputValueOne) return;
    
    const amount = parseFloat(inputValueOne);
    if (isNaN(amount)) return;
    
    const result = convertCurrency(amount, selectedCurrencyOne, selectedCurrencyTwo);
    setInputValueTwo(result.toFixed(2));
  }
  
 
  const exchangeRate = getExchangeRate(selectedCurrencyOne, selectedCurrencyTwo);

  const styles = StyleSheet.create({
    inputOne: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      fontSize: 25,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 50,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 100
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      margin: 20
    }
  });
  
  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading exchange rates...</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
  
  if (error) {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <Text style={styles.errorText}>Error loading rates: {error.message}</Text>
          <Button title="Retry" onPress={() => window.location.reload()} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
  
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <Text style={styles.title}>Currency Converter</Text>
          <View>
            <TextInput 
              style={styles.inputOne}
              placeholder="1" 
              value={inputValueOne} 
              keyboardType="numeric"
              onChangeText={(text) => setInputValueOne(text)} 
            />
            <Dropdown
              style={styles.inputOne}
              data={currencyData.length > 0 ? currencyData : [
                { label: 'USD', value: 'USD' }, 
                { label: 'LKR', value: 'LKR' }
              ]}
              labelField="label"
              valueField="value"
              placeholder="Select Currency"
              value={selectedCurrencyOne}
              onChange={(item) => {
                setSelectedCurrencyOne(item.value);
              }}
            />
            <Button onPress={onPressConvert} title="Convert"/>
            
            {/* <TextInput 
              style={styles.inputOne}
              placeholder="Result" 
              value={inputValueTwo}
              editable={false}
              onChangeText={(text) => setInputValueTwo(text)}
            /> */}
            <Dropdown
              style={styles.inputOne}
              data={currencyData.length > 0 ? currencyData : [
                { label: 'USD', value: 'USD' }, 
                { label: 'LKR', value: 'LKR' }
              ]}
              labelField="label"
              valueField="value"
              placeholder="Select Currency"
              value={selectedCurrencyTwo}
              onChange={(item) => {
                setSelectedCurrencyTwo(item.value);
              }}
            />
          </View>
          <Text style={styles.title}>1 {selectedCurrencyOne} = {exchangeRate.toFixed(2)} {selectedCurrencyTwo}</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}