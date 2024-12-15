import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Linking } from 'react-native';

export default function AboutApp() {
    return (
        // <SafeAreaView style={styles.container}>
        // <View style={styles.about}>
        //     <Text style={styles.text}>
        //         This is a financial calcualtor app, which helps calculate
        //         investment goals and plannning for people. It provides various
        //         types of calculators like, 
        //         <Text style={{ fontWeight: 'bold' }}>
        //             SIP calculator,SWP calculator and Lumpsum calculator. 
        //         </Text>

        //     </Text>
        // </View>
        // </SafeAreaView>

        <ScrollView style={{ flex: 2, height: 50, paddingBottom: 200 }}>
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.question}>➔   What is a SIP Calculator?</Text>
                    <Text style={styles.text}>
                        A SIP calculator is a simple tool that allows individuals to get an idea of the returns on their mutual fund investments made through SIP. SIP investments in mutual funds have become one of the most popular investment options for millennials lately.
                        These mutual fund sip calculators are designed to give potential investors an estimate on their mutual fund investments. However, the actual returns offered by a mutual fund scheme varies depending on various factors. The SIP calculator does not provide clarification for the exit load and expense ratio (if any).
                        This calculator will calculate the wealth gain and expected returns for your monthly SIP investment. Indeed, you get a rough estimate on the maturity amount for any of your monthly SIP, based on a projected annual return rate.</Text>
                </View>

                <View>
                    <Text style={styles.question}>➔   What is a SWP Calculator?</Text>
                    <Text style={styles.text}>
                        The Systematic Withdrawal Plan or SWP offers investors a regular income and returns money that is left in the scheme.
                        You may withdraw a fixed or a variable amount on a pre-decided date every month, quarter, or year. You may customise cash flows to withdraw, either a fixed amount or the capital gains on the investment.
                        For example, you have 8,000 units in a mutual fund scheme. You have specified a set of instructions to the mutual fund house where you seek to withdraw Rs 5,000 every month through the Systematic Withdrawal Plan.
                        On January 01, 2020, the NAV of the scheme was Rs 10. You would get an equivalent number of mutual fund units = Rs 5,000/10 = 500 units. The mutual fund house would redeem 500 units and give you an amount of Rs 5,000.
                    </Text>
                </View>

                <View>
                    <Text style={styles.question}>➔   What is a Lumpsum Calculator?</Text>
                    <Text style={styles.text}>
                        A lumpsum investment is when the depositor invests a significant sum of money on a particular mutual fund scheme.
                        SIP or Systematic Investment Plan, on the other hand, entails the investment of smaller amounts on a monthly basis.
                        Both these type of mutual fund investment strategies have their fair share of benefits.
                        Lumpsum investments are particularly preferred by a majority of investors, as there are lesser variables involved and returns are generally on the higher side.
                        To find out the estimated returns on your lumpsum mutual fund investment, you may use a mutual fund lumpsum calculator available online.
                    </Text>
                </View>

            </SafeAreaView>
        </ScrollView>

    )
}

const styles = StyleSheet.create({

    about: {
        // alignSelf: 'center',
        padding: 10,
    },
    // text: {
    //     fontSize: 20,
    //     paddingTop: 20,
    //     margin: 'auto',
    // },
    text: {
        fontSize: 17,
        // alignContent: 'center',
        // alignSelf: 'center',
        // padding: 20,
        paddingLeft: 10,
        paddingRight: 5,
        textAlign: 'justify',          // Justifies text to align both left and right edges
        paddingHorizontal: 30,  
      },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFE0FA',
    },
    question: {
        fontWeight: 'bold',
        fontSize: 20,
        padding: 20,
        color: 'purple',
        paddingHorizontal: 10,
        paddingVertical: 20,
      },

}
);
