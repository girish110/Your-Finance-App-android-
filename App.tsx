import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Linking, ScrollView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import SIPCalculator from './components/Hamburger/SIPCalculator';
import SWPCalculator from './components/Hamburger/SWPCalculator';
import LumpsumCalculator from './components/Hamburger/LumpsumCalculator';
import AboutApp from './components/Hamburger/AboutApp';
import FAQs from './components/Home/FAQs';
import { createStackNavigator } from '@react-navigation/stack';
//const screenWidth = Dimensions.get('window').width;

 
// Create Drawer Navigator
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// const handleButton = () => {
//   Linking.openURL('https://zerodha.com/').catch((err) => console.error('Failed to open URL:', err));
// };

const openLink = (url) => {
  Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
        <Text style={styles.drawerClose}> X </Text>
      </TouchableOpacity>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};



const HomeScreen = ({ navigation }) => (
  <ScrollView style={styles.scrollContainer}>
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.headerTitle}>Calculators</Text> */}

      <TouchableOpacity style={styles.SIPCard} onPress={() => navigation.navigate('SIP Calculator')}>
        <Image source={require('./assets/SIP_icon2.png')} style={styles.cardIcon} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>SIP Calculator</Text>
          <Text style={styles.cardDescription}>Calculate estimated returns on SIP investments.</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('SWP Calculator')}>
        <Image source={require('./assets/SWP_icon.png')} style={styles.cardIcon} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>SWP Calculator</Text>
          <Text style={styles.cardDescription}>Get insights on systematic withdrawals for steady income.</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Lumpsum Calculator')}>
        <Image source={require('./assets/Lumpsum_icon2.png')} style={styles.cardIcon} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>Lumpsum Calculator</Text>
          <Text style={styles.cardDescription}>Calculate estimated returns on one-time lumpsum investments</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('FAQs')}>
        <Image source={require('./assets/question.png')} style={styles.cardIcon} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>FAQs</Text>
          <Text style={styles.cardDescription}>The most commonly asked questions on how to use a financial calculator</Text>
        </View>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.button} onPress={handleButton}>
          <Text style={styles.buttonText}>Invest Now</Text>
        </TouchableOpacity> */}
      <Text style={{ alignSelf: 'center', marginTop: 5 }}>Connect with me</Text>
      <View style={styles.footer}>

        <TouchableOpacity onPress={() => openLink('https://github.com/girish110')}>
          <Image source={require('./assets/github_icon.png')} style={styles.footerIconGithub} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://www.linkedin.com/in/girish-sharma-4b98b2214/')}>
          <Image source={require('./assets/linkedin_icon.png')} style={styles.footerIconLinkedin} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://www.instagram.com/girisharma10/')}>
          <Image source={require('./assets/instagram_icon.png')} style={styles.footerIconInstagram} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </ScrollView>
);


// Navigation setup
export default function App() {
  return (
    <>
      <NavigationContainer>

        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <CustomDrawerContent {...props} />} >
          {/* <Drawer.Screen name="" component={HomeScreen} /> */}
          
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: '',
              headerBackground: () => (  // Customize the top header label
                <Image
                  source={require('./assets/header_fin.png')} // Replace with your image path
                  style={styles.headerImage}
                />
              ),
              headerLeft: (Navigation) => (
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Text style={styles.drawerIcon}>☰</Text>
                </TouchableOpacity>
              ),
              headerTitleAlign: 'center',
              drawerLabel: ({ focused }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View>
                    <Image
                      source={require('./assets/home_icon1.png')} // Replace with your home icon path
                      style={[styles.iconImage, { tintColor: focused ? '#56399C' : 'grey' }]}
                    />
                  </View>
                  <Text style={{ fontSize: 20, marginLeft: 18, color: focused ? 'purple' : 'grey', fontWeight: 'bold' }}>
                    Home
                  </Text>
                </View>
              ),
            })}
          />
          <Drawer.Screen
            name="SIP Calculator"
            component={SIPCalculator}
            options={{
              title: 'SIP Calculator',  // Customize the top header label
              headerTitleStyle: {
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
              },
              headerBackground: ()=> (
                <Image
                source={require('./assets/gradient.png')} // Replace with your image path
                  style={styles.headerImage}
                />
              ),
              headerTitleAlign: 'center',
              drawerLabel: ({ focused }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View>
                    {/* <Text style={{ fontSize: 22, fontWeight: 'bold', color: focused ? 'purple' : "grey" }}>
                    ⌂
                  </Text> */}
                    <Image
                      source={require('./assets/SIP_icon2.png')}  // Path to your PNG image
                      style={[styles.iconImageSIP, { tintColor: focused ? '#56399C' : 'grey' }]}  // Optional tint color
                    />
                  </View>
                  <View>
                    <Text style={{ fontSize: 20, marginLeft: 18, color: focused ? 'purple' : 'grey', fontWeight: 'bold' }}>
                      SIP Calculator
                    </Text>
                  </View>
                </View>
              ),
            }} />

          <Drawer.Screen
            name="SWP Calculator"
            component={SWPCalculator}
            options={{
              title: 'SWP Calculator',  // Customize the top header label
              headerTitleStyle: {
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
              },
              headerBackground: ()=> (
                <Image
                source={require('./assets/gradient.png')} // Replace with your image path
                  style={styles.headerImage}
                />
              ),
              headerTitleAlign: 'center',
              drawerLabel: ({ focused }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View>
                    <Image
                      source={require('./assets/SWP_icon.png')}  // Path to your PNG image
                      style={[styles.iconImageSWP, { tintColor: focused ? '#56399C' : 'grey' }]}  // Optional tint color
                    />
                  </View>
                  <View>
                    <Text style={{ fontSize: 20, marginLeft: 18, color: focused ? 'purple' : 'grey', fontWeight: 'bold' }}>
                      SWP Calculator
                    </Text>
                  </View>
                </View>
              ),
            }} />

          <Drawer.Screen
            name="Lumpsum Calculator"
            component={LumpsumCalculator}
            options={{
              title: 'Lumpsum Calculator',  // Customize the top header label
              headerTitleStyle: {
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
              },
              headerBackground: ()=> (
                <Image
                source={require('./assets/gradient.png')} // Replace with your image path
                  style={styles.headerImage}
                />
              ),
              headerTitleAlign: 'center',
              drawerLabel: ({ focused }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View>
                    {/* <Text style={{ fontSize: 22, fontWeight: 'bold', color: focused ? 'purple' : "grey" }}>
                    ⌂
                  </Text> */}
                    <Image
                      source={require('./assets/Lumpsum_icon2.png')}  // Path to your PNG image
                      style={[styles.iconImageLumpsum, { tintColor: focused ? '#56399C' : 'grey' }]}  // Optional tint color
                    />
                  </View>
                  <Text style={{ fontSize: 20, marginLeft: 18, color: focused ? 'purple' : 'grey', fontWeight: 'bold' }}>
                    Lumpsum Calculator
                  </Text>
                </View>
              ),
            }} />

          <Drawer.Screen
            name="About app"
            component={AboutApp}
            options={{
              title: 'Info',  // Customize the top header label
              headerTitleStyle: {
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
              },
              headerBackground: ()=> (
                <Image
                source={require('./assets/gradient.png')} // Replace with your image path
                  style={styles.headerImage}
                />
              ),
              headerTitleAlign: 'center',
              drawerLabel: ({ focused }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View>
                    <Image
                      source={require('./assets/aboutapp_icon.png')}  // Path to your PNG image
                      style={[styles.iconImageSIP, { tintColor: focused ? '#56399C' : 'grey' }]}  // Optional tint color
                    />
                  </View>
                  <View>
                    <Text style={{ fontSize: 20, marginLeft: 18, color: focused ? 'purple' : 'grey', fontWeight: 'bold' }}>
                      Info
                    </Text>
                  </View>
                </View>
              ),
            }} />

          <Drawer.Screen
          name="FAQs"
          component={FAQs}
          options={{
            // title: 'FAQs',  // Customize the top header label
            headerTitleStyle: {
              fontSize: 20,
              color: 'black',
              fontWeight: 'bold',
            },
            headerBackground: ()=> (
              <Image
              source={require('./assets/gradient.png')} // Replace with your image path
                style={styles.headerImage}
              />
            ),
            headerTitleAlign: 'center',
            drawerLabel: () => null // this is made null, to hide it from the hamburger list
          }} />

        </Drawer.Navigator>
        {/* <MainStackNavigator/> */}
      </NavigationContainer>




    </>
  );

}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#FFE0FA',
  // },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: 'purple',
    padding: 17,
    marginLeft: 40,
    marginRight: 40,
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  home: {
    fontSize: 17,
    // alignContent: 'center',
    // alignSelf: 'center',
    // padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
    textAlign: 'justify',          // Justifies text to align both left and right edges
    paddingHorizontal: 30,
  },
  question: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 30,
    color: 'purple',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  drawerContainer: {
    paddingTop: 10,
  },
  drawerClose: {
    paddingLeft: 15,
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 20,
    color: '#A8001A',
  },
  drawer_Container: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    // alignContent: 'center',
    // textAlign: 'auto'
  },
  homeIcon: {
    // fontSize: 25,
    width: 23,           // Adjust the width of the image
    height: 23,
    // alignItems: 'center',
    // alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  iconImage: {
    width: 21,           // Adjust the width of the image
    height: 21,          // Adjust the height of the image
    // resizeMode: 'contain',  // Ensures the image fits within the container
    marginRight: 10,     // Add space between the icon and text
    fontWeight: 'bold',
  },
  iconImageSIP: {
    fontWeight: 'bold',
    width: 23,           // Adjust the width of the image
    height: 23,
  },
  iconImageLumpsum: {
    width: 21,           // Adjust the width of the image
    height: 21,
  },
  iconImageSWP: {
    fontWeight: 'bold',
    width: 24,           // Adjust the width of the image
    height: 24,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',

  },
  drawerIcon: {
    fontSize: 25,
    marginLeft: 12,
    fontWeight: 'bold'
  },






  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFE0FA',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'purple',
    marginTop: 15,
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F0E99D',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    alignItems: 'center',
    elevation: 5, // Adds a shadow effect for Android
    shadowColor: '#000', // Adds a shadow effect for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    // marginTop: 20,
  },
  SIPCard: {
    flexDirection: 'row',
    backgroundColor: '#F0E99D',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    alignItems: 'center',
    elevation: 5, // Adds a shadow effect for Android
    shadowColor: '#000', // Adds a shadow effect for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginTop: 20,

  },
  cardIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // color: 'purple', // using color attribute does not change colour of image icon, tintcolor should be used.
    tintColor: '#56399C',
  },
  cardTextContainer: {
    flex: 1,
    marginBottom: 0,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'purple',
  },
  cardDescription: {
    fontSize: 14,
    color: 'grey',
    marginTop: 10,
  },
  footerIconGithub: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
    tintColor: 'maroon', // Use tintColor to color the icons
  },
  footerIconLinkedin: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
    tintColor: 'blue', // Use tintColor to color the icons
  },
  footerIconInstagram: {
    width: 33,
    height: 33,
    marginHorizontal: 10,
    // tintColor: '#56399C', // Use tintColor to color the icons
  },
  footer: {
    marginTop: 20,
    marginBottom: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  }
});
