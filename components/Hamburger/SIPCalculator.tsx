import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Linking, ScrollView, TextInput, Keyboard, BackHandler, TouchableWithoutFeedback } from 'react-native';
import Slider from '@react-native-community/slider';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(1000); // Default values
  const [expectedReturn, setExpectedReturn] = useState(5);
  const [timePeriod, setTimePeriod] = useState(1);
  const [investmentError, setInvestmentError] = useState('');
  const inputRef = useRef(null);



  const handleMonthlyInvestment = (value) => {
    // Validate input and check if it’s less than 500
    if (value === '') {
      setMonthlyInvestment(0);
      setInvestmentError(''); // Clear error on empty input
      return;
    }                                                                                       
    const parsedValue = parseInt(value.replace(/[^0-9]/g, ''), 10); // Remove non-numeric characters
    if (!isNaN(parsedValue)) {
      if (parsedValue < 500) {
        setInvestmentError('Min. value allowed is ₹500');
        setMonthlyInvestment(parsedValue); // Allow input but show error
      } else if (parsedValue >= 1000 && parsedValue <= 500000) {
        setInvestmentError(''); // Clear error if valid
        setMonthlyInvestment(parsedValue);
      } else {
        setInvestmentError(''); // Reset error if out of bounds
        setMonthlyInvestment(parsedValue > 500000 ? 500000 : parsedValue);
      }
    }
  };


  const dismissKeyboard = () => {
    Keyboard.dismiss();  // Close the keyboard
    inputRef.current.blur();  // Remove focus from the TextInput
  };


  const calculateSIP = () => {
    const minInvestment = 500;
    const effectiveInvestment = monthlyInvestment < minInvestment ? minInvestment : monthlyInvestment;

    const monthlyRate = expectedReturn === 0 ? 0 : expectedReturn / 12 / 100;
    const months = timePeriod * 12;

    // Future value calculation (avoid dividing by 0)
    const futureValue = monthlyRate === 0
      ? effectiveInvestment * months // No return scenario
      : effectiveInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);

    const totalInvested = effectiveInvestment * months;
    const estimatedReturns = futureValue - totalInvested;

    return { totalInvested, estimatedReturns, futureValue };
  };

  const result = calculateSIP();

  const data = [
    {
      name: 'Invested Amount',
      population: result.totalInvested,
      color: 'green',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Returns',
      population: result.estimatedReturns,
      color: 'yellow',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  const handleButton = () => {
    Linking.openURL('https://zerodha.com/').catch((err) => console.error('Failed to open URL:', err));
  };

  // useeffect hook is used to handle the cursor appear and disappear for textinputs based on back button press on android devices
  useEffect(() => {
    const handleBackPress = () => {
      if (inputRef.current?.isFocused()) {  // Check if the TextInput is focused
        inputRef.current.blur();  // Blur the TextInput to remove focus
        return true;  // Prevent default back button behavior
      }
      return false;  // Let the back button work as expected otherwise
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      backHandler.remove();  // Clean up the listener on component unmount
    };
  }, []);

  return (
    <ScrollView style={{ height: 200 }}>
      <SafeAreaView style={styles.container}>
        {/* <Text style={styles.title}>SIP Calculator</Text> */}
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          {/* Monthly Investment Input */}
          <View style={styles.inputGroup}>
            <View style={styles.row}>
              <Text style={styles.input}>Monthly Investment </Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.currencySymbol}>₹</Text>
                {/* <Text style={styles.inputAmount}></Text> */}
                <TextInput
                  ref={inputRef}
                  style={styles.inputAmount}
                  // value={`₹ ${monthlyInvestment}`}
                  value={monthlyInvestment.toString()}
                  keyboardType="numeric"  // Only allows numeric input
                  onChangeText={handleMonthlyInvestment}
                  maxLength={8}  // Limit input length (₹ and space)
                  onBlur={() => dismissKeyboard}
                />
              </View>
            </View>
            {investmentError !== '' && (
              <Text style={styles.errorText}>{investmentError}</Text>
            )}
            <Slider
              style={styles.slider}
              minimumValue={1000}
              maximumValue={500000}
              step={1000}
              value={0}
              onValueChange={(value) => setMonthlyInvestment(value)}
            // minimumTrackTintColor="green"
            // maximumTrackTintColor="grey"
            // thumbTintColor="green"
            />
          </View>
        </TouchableWithoutFeedback>

        {/* Expected Return Rate Input */}
        <View style={styles.inputGroup}>
          <View style={styles.row}>
            <Text style={styles.input}>Expected Return Rate (p.a)</Text>
            <View style={styles.space}>
              <Text style={styles.inputAmount}>{expectedReturn.toFixed(1)}%</Text>
            </View>
          </View>

          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={30}
            step={0.5}
            value={0}
            onValueChange={(value) => setExpectedReturn(value)}
          />
        </View>

        {/* Time Period Input */}
        <View style={styles.inputGroup}>
          <View style={styles.row}>
            <Text style={styles.input}>Time Period</Text>
            <View style={styles.space}>
              <Text style={styles.inputAmount}> {timePeriod}Yr</Text>
            </View>
          </View>

          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={60}
            step={1}
            value={0}
            onValueChange={(value) => setTimePeriod(value)}
          />
        </View>

        {/* Results */}
        <View style={styles.results}>
          <View style={styles.resultsContainer}>
            <View style={styles.resultsRow}>
              <Text style={{ marginBottom: 6 }}>Invested Amount </Text>
              <Text style={{ marginBottom: 6 }}>Estimated Returns </Text>
              <Text>Total Value </Text>

            </View>
            <View>
              <Text style={{ marginBottom: 6, fontWeight: 'bold' }}> ₹ {result.totalInvested.toLocaleString('en-IN')}</Text>
              <Text style={{ marginBottom: 6, fontWeight: 'bold' }}> ₹ {Math.floor(result.estimatedReturns).toLocaleString('en-IN')}</Text>
              <Text style={{ fontWeight: 'bold' }}> ₹ {Math.floor(result.futureValue).toLocaleString('en-IN')}</Text>
            </View>
          </View>

          <View style={styles.piechart}>
            <PieChart
              data={data}
              width={screenWidth - 65}
              height={140}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                color: (opacity = 2) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"-10"}
              absolute={false}
            />
          </View>
        </View>

        {/* Invest Now Button */}
        <TouchableOpacity style={styles.button} onPress={handleButton}>
          <Text style={styles.buttonText}>Invest Now</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#FFE0FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 0,
    marginBottom: 50,
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    fontSize: 15,
  },
  inputAmount: {
    fontSize: 18,
    // marginBottom: 3,
    backgroundColor: '#D4C4FF',
    color: 'purple',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
  },
  slider: {
    width: '100%',
    textShadowRadius: 60,
    height: 40,
    // backgroundColor: '#9E98FF',
    fontSize: 50,
  },
  results: {
    marginVertical: 5,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 0.2,
  },
  resultsRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  resultsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  space: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 0,
    alignItems: 'center',
  },
  piechart: {
    alignItems: 'center',
    marginTop: 30,
    marginRight: 20,
  },
  button: {
    marginTop: 20,
    borderRadius: 20,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: 'purple', // background color of the button
    padding: 15, // padding to add space inside the button
    alignItems: 'center', // to center the text horizontally
    overflow: 'hidden', // ensures rounded corners apply correctly
  },
  buttonText: {
    color: 'white', // text color (important for visibility on the purple button)
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 0,
    marginRight: 10,
    fontSize: 12,
    alignSelf: 'flex-end'
  },
  currencySymbol: {
    fontSize: 18,  // Same size as input text
    color: 'purple',  // Match the color
    marginLeft: 10,  // Add some space between the symbol and input
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D4C4FF',  // Same background color as input
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
});

export default SIPCalculator;
