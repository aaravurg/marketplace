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

const windowWidth = Dimensions.get('window').width;

const HomePage = () => {
  const [listings, setListings] = useState([]); 
  const [selectedOption, setSelectedOption] = useState("")
  const [button1Color, setButton1Color] = useState('#FFFFFF');
  const [button2Color, setButton2Color] = useState('#FFFFFF');
  const navigation = useNavigation()

  const advanceToProduct = () => {
    navigation.replace("Product"); 
  }

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

  const fetchListings = async () => {
    try {
      const user = auth.currentUser;
      const uid = user.uid; 
      const db = firebase.firestore(); 
      const userCollection = db.collection('users').doc(uid).collection('listings');
      const querySnapshot = await userCollection.get();

      const fetchedListings = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const cost = data.cost; 
        const details = data.details; 
        const photo = data.photo
        const title = data.title; // Access the 'title' field
        fetchedListings.push({ title: title, cost: cost, details: details, photo: photo});
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
      <View style={styles.productItem}>
        <Image source={item.photo} style={styles.productImage} resizeMode="contain" />
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productTitle}>${item.cost}</Text>
        <Text style={styles.productDescription}>{item.details}</Text>
      </View>
    );
  };

  const renderProductRow = ({ item }) => {
    return (
      <View style={styles.productRow}>
        {item.map((product) => (
          <View key={product.id} style={styles.productColumn}>
            {renderProductItem({ item: product })}
          </View>
        ))}
      </View>
    );
  };

  const formatProductData = (data, numColumns) => {
    const numOfRows = Math.ceil(data.length / numColumns);
    const formattedData = Array.from({ length: numOfRows }, (_, rowIndex) => {
      const start = rowIndex * numColumns;
      const end = start + numColumns;
      return data.slice(start, end);
    });
    return formattedData;
  };

  const formattedProducts = formatProductData(listings, 2);

  return (
    <View style={styles.container}>
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
      <FlatList
        data={formattedProducts}
        renderItem={renderProductRow}
        keyExtractor={(item, index) => `row-${index}`}
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
  header: {
    alignItems: 'center',
    marginBottom: 15,
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
    marginBottom: 5,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    height: 300
  },
  productImage: {
    width: '100%',
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
