import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Linking, Keyboard, BackHandler, TextInput, TouchableWithoutFeedback } from 'react-native';
import Slider from '@react-native-community/slider';

const SWPCalculator = () => {
  const [totalInvestment, setTotalInvestment] = useState(50000); // Default values
  const [withdrawalPerMonth, setWithdrawalPerMonth] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(6); // Annual percentage
  const [timePeriod, setTimePeriod] = useState(5); // in years
  const [finalPortfolioValue, setFinalPortfolioValue] = useState(0); // Final portfolio value
  const [investmentError, setInvestmentError] = useState('');
  const [withdrawalError, setwithdrawalError] = useState('');
  const inputRef = useRef(null);


  const handleSWPInvestment = (value) => {
    // Validate input and check if it’s less than 500
    if (value === '') {
      setTotalInvestment(0);
      setInvestmentError(''); // Clear error on empty input
      return;
    }
    const parsedValue = parseInt(value.replace(/[^0-9]/g, ''), 10); // Remove non-numeric characters
    if (!isNaN(parsedValue)) {
      if (parsedValue < 10000) {
        setInvestmentError('Min. value allowed is ₹10000');
        setTotalInvestment(parsedValue); // Allow input but show error
      } else if (parsedValue >= 10000 && parsedValue <= 10000000) {
        setInvestmentError(''); // Clear error if valid
        setTotalInvestment(parsedValue);
      } else {
        setInvestmentError('Min. value allowed is ₹10000'); // Reset error if out of bounds
        setTotalInvestment(parsedValue > 10000000 ? 10000000 : parsedValue);
      }
    }
  };

  const handleWithdrawalPerMonth = (value) => {
    // Validate input and check if it’s less than 500
    if (value === '') {
      setWithdrawalPerMonth(0);
      setwithdrawalError(''); // Clear error on empty input
      return;
    }
    const parsedValue = parseInt(value.replace(/[^0-9]/g, ''), 10); // Remove non-numeric characters
    if (!isNaN(parsedValue)) {
      if (parsedValue < 500) {
        setwithdrawalError('Min. value allowed is ₹500');
        setWithdrawalPerMonth(parsedValue); // Allow input but show error
      } else if (parsedValue >= 500 && parsedValue <= 50000) {
        setwithdrawalError(''); // Clear error if valid
        setWithdrawalPerMonth(parsedValue);
      } else {
        setwithdrawalError('Min. value allowed is ₹500'); // Reset error if out of bounds
        setWithdrawalPerMonth(parsedValue > 50000 ? 50000 : parsedValue);
      }
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();  // Close the keyboard
    inputRef.current.blur();  // Remove focus from the TextInput
  };

  const calculateSWP = () => {
    const monthlyRate = expectedReturn / 12 / 100; // Convert annual rate to monthly
    const months = timePeriod * 12; // Convert years to months
    let balance = totalInvestment;
    let totalWithdrawals = 0;

    for (let i = 0; i < months; i++) {
      const interest = balance * monthlyRate; // Monthly interest
      balance += interest; // Add interest to the balance

      if (balance < withdrawalPerMonth) {
        break; // Stop if the balance is less than the withdrawal
      }

      balance -= withdrawalPerMonth; // Subtract the monthly withdrawal
      totalWithdrawals += withdrawalPerMonth;
    }

    //const finalPortfolioValue = totalInvestment*expectedReturn - totalWithdrawals; // Add total withdrawals and interest earned
    return { totalInvestment, totalWithdrawals, finalPortfolioValue: Math.round(balance) };
  };

  const result = calculateSWP();

  const handleButton = () => {
    Linking.openURL('https://zerodha.com/').catch((err) => console.error('Failed to open URL:', err));
  };
  // Update portfolio value whenever input values change
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
                onChangeText={handleSWPInvestment}
                 maxLength={10}  // Limit input length (₹ and space)
                onBlur={() => dismissKeyboard}
              />
            </View>
            {/* <Text style={styles.inputAmount}>₹ {totalInvestment.toLocaleString('en-IN')}</Text> */}
          </View>
          {investmentError !== '' && (
              <Text style={styles.errorText}>{investmentError}</Text>
            )}
          <Slider
            style={styles.slider}
            minimumValue={100000}
            maximumValue={10000000}
            step={10000}
            value={0}
            onValueChange={(value) => setTotalInvestment(value)}
          />
        </View>
        </TouchableWithoutFeedback>

        {/* Withdrawal Per Month Slider */}
        <View style={styles.inputGroup}>
          <View style={styles.row}>
            <Text style={styles.input}>Withdrawal Per Month</Text>
            <View style={styles.inputWrapper}>
            <Text style={styles.currencySymbol}>₹</Text>
            <TextInput
              ref={inputRef}
              style={styles.inputAmount}
              //value={`₹ ${totalInvestment}`}
              value={withdrawalPerMonth.toString()} 
              keyboardType="numeric"  // Only allows numeric input
                onChangeText={handleWithdrawalPerMonth}
                 maxLength={10}  // Limit input length (₹ and space)
                onBlur={() => dismissKeyboard}
              />
            </View>
            {/* <Text style={styles.inputAmount}>₹ {withdrawalPerMonth.toLocaleString('en-IN')}</Text> */}
          </View>
          {withdrawalError !== '' && (
              <Text style={styles.errorText}>{withdrawalError}</Text>
            )}
          <Slider
            style={styles.slider}
            minimumValue={1000}
            maximumValue={50000}
            step={1000}
            value={0}
            onValueChange={(value) => setWithdrawalPerMonth(value)}
          />
        </View>

        {/* Expected Return Rate Slider */}
        <View style={styles.inputGroup}>
          <View style={styles.row}>
            <Text style={styles.input}>Expected Return Rate (p.a)</Text>
            <Text style={styles.inputAmount}>{expectedReturn.toFixed(1)}%</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={20}
            step={0.5}
            value={0}
            onValueChange={(value) => setExpectedReturn(value)}
          />
        </View>

        {/* Time Period Slider */}
        <View style={styles.inputGroup}>
          <View style={styles.row}>
            <Text style={styles.input}>Time Period (Years)</Text>
            <View style={styles.space}>
              <Text style={styles.inputAmount}>{timePeriod} Yr</Text>
            </View>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={30}
            step={1}
            value={0}
            onValueChange={(value) => setTimePeriod(value)}
          />
        </View>

        {/* Results */}
        <View style={styles.results}>
          <View style={styles.resultsContainer}>
            <View style={styles.resultsRow}>
              <Text style={{ marginBottom: 6, fontSize: 15 }}>Total Investment </Text>
              <Text style={{ marginBottom: 6, fontSize: 15 }}>Total withdrawal </Text>
              <Text style={{ fontSize: 15 }}>Final Portfolio Value </Text>
            </View>
            <View>
              <Text style={{ marginBottom: 6, fontWeight: 'bold' }}>₹ {result.totalInvestment.toLocaleString('en-IN')}</Text>
              <Text style={{ marginBottom: 6, fontWeight: 'bold' }}>₹ {result.totalWithdrawals.toLocaleString('en-IN')}</Text>
              <Text style={{ fontWeight: 'bold' }}>₹ {Math.floor(result.finalPortfolioValue).toLocaleString('en-IN')}</Text>
            </View>
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
    alignItems: 'center',
     marginBottom: 10,
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
  space: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 0,
    alignItems: 'center',
  },
  results: {
    marginVertical: 5,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 0.2,
    marginBottom: 20,
    marginTop: 20,
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
  resultsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D4C4FF',  // Same background color as input
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  currencySymbol: {
    fontSize: 18,  // Same size as input text
    color: 'purple',  // Match the color
    marginLeft: 10,  // Add some space between the symbol and input
  },
  errorText: {
    color: 'red',
    marginTop: 0,
    marginRight: 10,
    fontSize: 12,
    alignSelf: 'flex-end'
  },
});

export default SWPCalculator;
