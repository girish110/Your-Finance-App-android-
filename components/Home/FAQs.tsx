import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Collapsible from 'react-native-collapsible';


const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Example questions and answers
  const faqData = [
    { 
        question: 'How does SIP work?', 
        answer: `
    Rupee Cost Averaging:

SIPs can help you escape market volatility by eliminating the guessing game of market performance. Regular investing ensures that the average purchase cost is evened out in the long run.
When the markets rise, you get fewer units, and when the markets fall, you receive more units. This minimizes your risk and ensures you acquire investments at a lower average cost per unit.

    Compounding:

Saving a small sum of money regularly for long periods of time can have an exponential impact on your investment because of the effect of compounding. The following examples illustrate that:

‘A’ starts investing for his 60th birthday at the age of 40.

Assuming returns of 7% and a monthly investment of Rs. 1000, his total corpus at the end of 20 years will be Rs. 5,28,000.
        
‘B’ starts investing for his 60th birthday at the age of 20.
Regular investments spread over longer durations yield greater returns and profits. `
        
    },

    { 
        question: 'How does an SWP work?', 
        answer: 
        `SWP (Systematic Withdrawal Plan) is a feature offered by mutual funds where the investor can withdraw a fixed amount of money at regular intervals (monthly, quarterly, etc.) from their mutual fund investment.

Here's how it works:

1.  The investor selects a mutual fund and opens 
     an account with the fund house.
2.  The investor chooses to invest a lump sum or 
     make periodic investments in the mutual
     fund.
3.  The investor selects the SWP option 
     and specifies the amount and frequency of 
     withdrawals.
4.  The mutual fund sells units of the fund to 
     meet the withdrawal request and the investor 
     receives the money in their account.
5.  The mutual fund continues to sell units to 
     meet the withdrawal request at the specified 
     intervals until the investor cancels the SWP or the investment value becomes zero.` 
    },

    { 
        question: 'How does a Lumpsum Investment work?', 
        answer: `Lumpsum Mutual Fund is a mutual fund that invests in stocks, bonds, and other securities. It is a type of mutual fund that does not require investors to make periodic contributions. 

Lump sum investment involves the investment of the entire money available to an investor. For instance, if someone desires to invest the whole amount present with him in mutual funds or similar investment instruments, then it will be termed a lump sum investment.` 
    },
    {
        question: 'What is the difference between lumpsum and SIP?',
        answer: `Lump sum investment is a one-time investment scheme. It is the most common type of investment, being the simplest yet having high risk.

Meanwhile, SIPs are a series of investments made over time. They are usually done in small amounts and can be done monthly, quarterly, or annually.`
    },
    {
        question: 'What is better SWP or FD?',
        answer: `SWP may be a better option for those who need a steady stream of income and are willing to accept fluctuating returns, while FD may be a better option for those who want a guaranteed return on their investment and are willing to lock their money for a certain period of time. It is important to evaluate your financial goals and risk tolerance before deciding which option is better for you.`
    }
  ];

  const toggleCollapse = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      {faqData.map((item, index) => (
        <View key={index} style={styles.faqItem}>
          <TouchableOpacity onPress={() => toggleCollapse(index)}>
            <View style={styles.dropdown}>
            <Text style={styles.questionText}>{item.question}</Text>
            {/* <Text style={{fontSize:30}}>+</Text> */}
            <Text style={{
                fontSize:30,
                height: 50,
                fontWeight: 'bold',
                color: activeIndex==index?'red':'green'}}>
            {activeIndex === index ? '⇧' : '⇩'} 
            </Text>
            </View>
            {/* <Icon
              name={activeIndex === index ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={24}
              color="#333"
            /> */}
          </TouchableOpacity>
          <Collapsible collapsed={activeIndex !== index}>
            <Text style={styles.answerText}>{item.answer}</Text>
          </Collapsible>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFE0FA',
  },
  faqItem: {
    borderBottomWidth: 2,
    borderColor: '#ddd',
    paddingVertical: 10,
    marginTop: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  answerText: {
    fontSize: 16,
    paddingVertical: 8,
    color: '#555',
  },
  dropdown: {
    flexDirection: 'row',
    // alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: 10,
  }
});

export default FAQs;
