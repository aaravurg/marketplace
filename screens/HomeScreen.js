import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { auth } from '../firebase';
import { firebase } from '../firebase';
import { useEffect } from 'react';
import 'firebase/compat/firestore';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfilePage from './ProfilePage';
import InitialScreen from './InitialScreen';
import axios from 'axios';


const windowWidth = Dimensions.get('window').width;

const HomePage = () => {
  const [listings, setListings] = useState([]); 
  const [selectedOption, setSelectedOption] = useState("")
  const [button1Color, setButton1Color] = useState('#FFFFFF');
  const [button2Color, setButton2Color] = useState('#FFFFFF');
  const serviceListings = []; 
  const productListings = []; 
  const navigation = useNavigation()

  const advanceToProduct = () => {
    navigation.replace("Product"); 
  }
/*
  const sendTwilioMessage = async (sellerPhoneNumber, message) => {
    try {
      const accountSid = 'ACba8ce7552ad0de81210f8c6c4aa0bcf7'; // Replace with your Twilio Account SID
      const authToken = '1bfac7bde743268d0f29b4ea820bb65d'; // Replace with your Twilio Auth Token
      const twilioPhoneNumber = '+18555063074'; // Replace with your Twilio phone number
      const client = require('twilio')(accountSid, authToken);

      client.messages
        .create({
          body: message,
          from: twilioPhoneNumber,
          to: sellerPhoneNumber
        })
        .then(message => console.log(message.sid));
  
    } catch (error) {
      console.log('Error sending message:', error);
      
    }
    
  };
*/
  const usa = auth.currentUser; 
  const name = usa.displayName;
  const first_initial = name.charAt(0); 


  const handleSelection = (option) => { 
        
    if(option == "Product")
    {
        setButton1Color('#7871FF');
        setButton2Color('#FFFFFF');
    }
    else
    {
        setButton1Color('#FFFFFF');
        setButton2Color('#7871FF');
    }
    setSelectedOption(option);
    

    console.log(option);
  }

  const moveToProfile = async () => {
    navigation.replace("Profile"); 
  }

  const fetchListings = async () => {
    try {
      const user = auth.currentUser;
      const uid = user.uid; 
      const db = firebase.firestore(); 
      const userCollection = db.collection('listings');
      const querySnapshot = await userCollection.get();

      const fetchedListings = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const cost = data.cost; 
        const details = data.details; 
        const photo = data.photo;
        const title = data.title; 
        const number = data.number;
        const email = data.email;
        const type = data.type
        fetchedListings.push({ title: title, cost: cost, details: details, photo: photo, number: number, email: email, type: type});
      });

      setListings(fetchedListings);
    } catch (error) {
      console.log('Error fetching listings: ', error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const renderProductItem = ({ item }) => {
    return (
          
          <View style={styles.productItem} >
            <Image source={item.photo} style={styles.productImage} resizeMode="contain" />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productTitle}>${item.cost}</Text>
            <Text style={styles.productDescription}>{item.details}</Text>
            <Text style={styles.productTitle}>By: {item.email}</Text>
            <Text style={styles.productTitle}># {item.number}</Text>
          </View>
          
          
    );
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity 
        onPress={moveToProfile}
        style={ styles.profileButton }>
          <Text style={styles.addButtonText}>{first_initial}</Text>
        </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Aggie Marketplace</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, {backgroundColor: button1Color}]} onPress={() => handleSelection("Product")}>
          <Text style={styles.buttonText}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: button2Color}]}  onPress={() => handleSelection("Service")}>
          <Text style={styles.buttonText}>Services</Text>
        </TouchableOpacity>
      </View>
      <FlatList style={styles.flat}
        data={listings}
        renderItem={renderProductItem}
        contentContainerStyle={styles.productList}
      />
      <TouchableOpacity 
      onPress={advanceToProduct}
      style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    padding: 20
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    top: '3%'
  },
  header: {
    alignItems: 'center',
    marginBottom: 15,
    top: '5%'
  },
  headerTitle: {
    fontSize: 33,
    fontWeight: 'bold',
    color: 'white'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50,
    top: '7%'
  },
  flat: {
    marginTop: 40
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 100,
    marginHorizontal: 10,
    top: '20%'
  },
  buttonText: {
    color: '#000000',
    fontSize: 22,
    fontWeight: '600'
  },
  productList: {
    paddingBottom: 16,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  productColumn: {
    flex: 1,
    marginRight: 8,
  },
  productItem: {
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#c8cbcf',
    borderRadius: 8,
    height: 350,
    width: 300
  },
  productImage: {
    height: windowWidth / 2 - 16,
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  profileButton: {
    backgroundColor: '#7871FF',
    position: 'absolute',
    bottom: 80,
    right: 16,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    top: '3%'
  },
  addButton: {
    backgroundColor: '#7871FF',
    position: 'absolute',
    bottom: 80,
    right: 16,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 1,
    borderTopWidth: 1,
    borderTopColor: 'white',
  },
  bottomButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: 'black',
    borderRadius: 100,
  },
  bottomButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default HomePage;
