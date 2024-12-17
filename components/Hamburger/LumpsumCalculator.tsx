import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Linking, Keyboard, BackHandler, TouchableWithoutFeedback } from 'react-native';
import Slider from '@react-native-community/slider';
import { PieChart } from 'react-native-chart-kit';
import { TextInput } from 'react-native';

const LumpsumCalculator = () => {
  const [totalInvestment, setTotalInvestment] = useState(50000); // Default value
  const [expectedReturn, setExpectedReturn] = useState(8); // Annual percentage
  const [timePeriod, setTimePeriod] = useState(5); // in years
  const [investmentError, setInvestmentError] = useState('');
  const inputRef = useRef(null);

  const screenWidth = Dimensions.get('window').width;

  const handleLumpsumInvestment = (value) => {
    // Validate input and check if it’s less than 500
    if (value === '') {
      setTotalInvestment(0);
      setInvestmentError(''); // Clear error on empty input
      return;
    }
    const parsedValue = parseInt(value.replace(/[^0-9]/g, ''), 10); // Remove non-numeric characters
    if (!isNaN(parsedValue)) {
      if (parsedValue < 10000) {
        setInvestmentError('Min. value allowed is ₹10 K');
        setTotalInvestment(parsedValue); // Allow input but show error
      } else if (parsedValue >= 10000 && parsedValue <= 500000000) {
        setInvestmentError(''); // Clear error if valid
        setTotalInvestment(parsedValue);
      } else {
        setInvestmentError('Max. value allowed is ₹50 Cr'); // Reset error if out of bounds
        setTotalInvestment(parsedValue > 500000000 ? 500000000 : parsedValue);

        setTimeout(() => {
          setInvestmentError('');
        }, 2000);

      }
    }
  };

  const handleExpectedReturn = (value) => {
    // Remove non-numeric and extra decimal characters
    const cleanedValue = value.replace(/[^0-9.]/g, '');

    // Allow only one decimal point
    const parts = cleanedValue.split('.');
    if (parts.length > 2) {
      return; // Ignore input if more than one decimal point
    }

    // Handle the case when backspace clears the input
    if (cleanedValue === '') {
      setExpectedReturn(0); // Reset to 0 on empty input
      return;
    }

    // Parse the value into a float
    const parsedValue = parseFloat(cleanedValue);

    // Validation and boundary checks
    if (!isNaN(parsedValue)) {
      if (parsedValue > 40) {
        setExpectedReturn(40); // Set to max value if input exceeds max
      } else if (parsedValue < 0) {
        setExpectedReturn(0); // Prevent values below 0
      } else {
        setExpectedReturn(parsedValue); // Update state with valid value
      }
    }
  };

  const handleTimePeriod = (value) => {
    // Remove non-numeric characters
    const cleanedValue = value.replace(/[^0-9]/g, '');

    // Handle empty input (backspace)
    if (cleanedValue === '') {
      setTimePeriod(0); // Reset to minimum value
      return;
    }

    // Parse the value to an integer
    const parsedValue = parseInt(cleanedValue, 10);

    // Validate and clamp the value within the range 1 to 100
    if (!isNaN(parsedValue)) {
      if (parsedValue < 1) {
        setTimePeriod(0); // Set to minimum if less than 1
      } else if (parsedValue > 100) {
        setTimePeriod(100); // Set to maximum if greater than 100
      } else {
        setTimePeriod(parsedValue); // Set valid value
      }
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();  // Close the keyboard
    inputRef.current.blur();  // Remove focus from the TextInput
  };
  // Lumpsum Calculation with Compounding Effect
  const calculateLumpsum = () => {
    const minInvestment = 10000;
    const investment = totalInvestment < minInvestment ? minInvestment : totalInvestment;

    const annualRate = expectedReturn / 100;
    const futureValue = investment * Math.pow(1 + annualRate, timePeriod);
    const estimatedReturns = futureValue - investment;

    return { futureValue, estimatedReturns, totalInvestment: investment };
  };

  const result = calculateLumpsum();

  const data = [
    {
      name: 'Invested Amount',
      population: result.totalInvestment,
      color: 'blue',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Returns',
      population: result.estimatedReturns,
      color: 'orange',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  const handleButton = () => {
    Linking.openURL('https://zerodha.com/').catch((err) => console.error('Failed to open URL:', err));
  };

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
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.inputGroup}>
            {/* Total Investment Slider */}
            <View style={styles.row}>
              <Text style={styles.input}>Total Investment</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.currencySymbol}>₹</Text>
                {/* <Text style={styles.inputAmount}>₹ {totalInvestment.toLocaleString('en-IN')}</Text> */}
                <TextInput
                  ref={inputRef}
                  style={styles.inputAmount}
                  //value={`₹ ${totalInvestment}`}
                  value={totalInvestment.toString()}
                  keyboardType="numeric"  // Only allows numeric input
                  onChangeText={handleLumpsumInvestment}
                  maxLength={10}  // Limit input length (₹ and space)
                  onBlur={() => dismissKeyboard}
                />
              </View>
            </View>
            {investmentError !== '' && (
              <Text style={styles.errorText}>{investmentError}</Text>
            )}
            <Slider
              style={styles.slider}
              minimumValue={10000}
              maximumValue={500000000}
              step={10000}
              value={0}
              onValueChange={(value) => {
                setTotalInvestment(value);
                if (value >= 10000) {
                  setInvestmentError(''); // Clear error when using slider
                }
              }}
              maximumTrackTintColor='purple'
              minimumTrackTintColor='blue'
              thumbTintColor='blue'
            />
          </View>
        </TouchableWithoutFeedback>

        {/* Expected Return Slider */}
        <View style={styles.inputGroup}>
          <View style={styles.row}>
            <Text style={styles.input}>Expected Return (p.a)</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                ref={inputRef}
                style={styles.inputAmount}
                value={expectedReturn.toString()} // Display the value with a % sign
                keyboardType="numeric"
                onChangeText={handleExpectedReturn} // Validation handler
                maxLength={5} // e.g., 40.0
              />
              <Text style={styles.percentSymbol}>%</Text>
            </View>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={40}
            step={0.5}
            value={0}
            onValueChange={(value) => setExpectedReturn(value)}
            maximumTrackTintColor='purple'
            minimumTrackTintColor='blue'
            thumbTintColor='blue'
          />
        </View>

        {/* Time Period Slider */}
        <View style={styles.inputGroup}>
          <View style={styles.row}>
            <Text style={styles.input}>Time Period</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                ref={inputRef}
                style={styles.inputAmount}
                value={timePeriod.toString()}
                keyboardType="numeric"
                onChangeText={handleTimePeriod} // Validation handler
                maxLength={5} // e.g., 40.0
              />
              <Text style={styles.year}> Yr</Text>
            </View>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={100}
            step={1}
            value={0}
            onValueChange={(value) => setTimePeriod(value)}
            maximumTrackTintColor='purple'
            minimumTrackTintColor='blue'
            thumbTintColor='blue'
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
              <Text style={{ marginBottom: 6, fontWeight: 'bold' }}> ₹ {result.totalInvestment.toLocaleString('en-IN')}</Text>
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
  inputGroup: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    fontSize: 15,
  },
  inputAmount: {
    fontSize: 18,
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
    height: 40,
  },
  results: {
    marginVertical: 5,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 0.2,
  },
  resultsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  resultsRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  resultText: {
    marginBottom: 6,
    fontWeight: 'bold',
    fontSize: 16,
  },
  space: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 0,
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
  percentSymbol: {
    fontSize: 18,  // Same size as input text
    color: 'purple',  // Match the color
    marginLeft: -10,  // Add some space between the symbol and input
    marginRight: 5,  // Add some space between the symbol and input
  },
  year: {
    fontSize: 18,
    color: 'purple',
    marginLeft: -20,
    marginRight: 10,
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

export default LumpsumCalculator;
