import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import { Ionicons, MaterialIcons} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import { auth } from '../firebase';
import { useState } from 'react';
import { useEffect } from 'react';
import { firebase } from '../firebase';
import 'firebase/compat/firestore';
import { FlatList } from 'react-native-web';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-web';
const windowWidth = Dimensions.get('window').width;


const ProfilePage = () => {
  
  const navigation = useNavigation(); 
  const user = auth.currentUser; 
  const name = user.displayName; 
  const first_init = name.charAt(0); 
  const email = user.email
  const number = user.phoneNumber
  const uid = user.uid; 

  const [plength, setplength] = useState(); 
  const [slength, setslength] = useState(); 
  const [exclusive, setExclusive] = useState([]); 

  var filteredProductList = [];
  var filteredServiceList = [];  

  const goHome = () => {
    navigation.replace("Home");
  }

  const fetchListings = async () => {
    try {
      const db = firebase.firestore(); 
      const userCollection = db.collection('listings');
      const querySnapshot = await userCollection.get();

      const fetchedListings = [];
      const exclusiveList = []; 

      querySnapshot.forEach((doc) => {
        const data = doc.data(); 
        const photo = data.photo;
        const title = data.title; 
        const type = data.type
        const email = data.email
        const number = data.number
        fetchedListings.push({ title: title, email: email, photo: photo,  type: type, number: number});
      });

      for(let i = 0; i < fetchedListings.length; i++)
      {
        if(fetchedListings[i].email == email && fetchedListings[i].type == "Product")
        {
          filteredProductList.push(fetchedListings[i]);
        }
        else if(fetchedListings[i].email == email && fetchedListings[i].type == "Service")
        {
          filteredServiceList.push(fetchedListings[i]); 

        }
      }

      for(let j = 0; j < fetchedListings.length; j++)
      {
        if(fetchedListings[j].email == email)
        {
          exclusiveList.push(fetchedListings[j]); 
        }
      }

      setplength(filteredProductList.length); 
      setslength(filteredServiceList.length); 
      setExclusive(exclusiveList);


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
            <Text style={styles.productTitle}>Type: {item.type}</Text>
          </View>  
    );
  };

  return (
    < SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <TouchableOpacity style={styles.container} onPress={goHome}>
                <Icon name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View style={{alignSelf: "center"}}>
                <View style={styles.profileImage}>
                    <Text style={styles.profileText}>{first_init}</Text>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{name}</Text>
                <Text style={[styles.text, { fontWeight: "100", fontSize: 24 }]}>{email}</Text>
                <Text style={[styles.text, { fontWeight: "100", fontSize: 24 }]}>{number}</Text>

            </View>

            <View style={styles.statsContainer}>
                <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                    <Text style={[styles.text, { fontSize: 24 }]}>{plength}</Text>
                    <Text style={[styles.text, styles.subText]}>Products</Text>
                </View>
                <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                    <Text style={[styles.text, { fontSize: 24 }]}>{slength}</Text>
                    <Text style={[styles.text, styles.subText]}>Services</Text>
                </View>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 32 }}>
              <FlatList style={styles.flat}
                data={exclusive}
                renderItem={renderProductItem}
                contentContainerStyle={styles.productList}
              />
            </View>
        </ScrollView>
    </SafeAreaView>

);
}

export default ProfilePage

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#333333"
  },
  text: {
      fontFamily: "HelveticaNeue",
      color: "white"
  },
  image: {
      flex: 1,
      width: undefined,
      height: undefined
  },
  titleBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 24,
      marginHorizontal: 16
  },
  subText: {
      fontSize: 12,
      color: "#AEB5BC",
      textTransform: "uppercase",
      fontWeight: "500"
  },
  profileImage: {
      width: 200,
      height: 200,
      borderRadius: 100,
      borderColor: 'white',
      backgroundColor: '#c8cbcf',
      justifyContent: 'center',
      alignItems: 'center'
  },
  profileText: {
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold'
  },
  dm: {
      backgroundColor: "#41444B",
      position: "absolute",
      top: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center"
  },
  active: {
      backgroundColor: "#34FFB9",
      position: "absolute",
      bottom: 28,
      left: 10,
      padding: 4,
      height: 20,
      width: 20,
      borderRadius: 10
  },
  add: {
      backgroundColor: "#41444B",
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center"
  },
  infoContainer: {
      alignSelf: "center",
      alignItems: "center",
      marginTop: 16
  },
  statsContainer: {
      flexDirection: "row",
      alignSelf: "center",
      marginTop: 32
  },
  statsBox: {
      alignItems: "center",
      flex: 1,
      padding: 50
  },
  mediaImageContainer: {
      width: 180,
      height: 200,
      borderRadius: 12,
      overflow: "hidden",
      marginHorizontal: 10
  },
  mediaCount: {
      backgroundColor: "#41444B",
      position: "absolute",
      top: "50%",
      marginTop: -50,
      marginLeft: 30,
      width: 100,
      height: 100,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
      shadowColor: "rgba(0, 0, 0, 0.38)",
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 20,
      shadowOpacity: 1
  },
  recent: {
      marginLeft: 78,
      marginTop: 32,
      marginBottom: 6,
      fontSize: 10
  },
  recentItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 16
  },
  activityIndicator: {
      backgroundColor: "#CABFAB",
      padding: 4,
      height: 12,
      width: 12,
      borderRadius: 6,
      marginTop: 3,
      marginRight: 20
  },
  productItem: {
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#c8cbcf',
    borderRadius: 8,
    height: 260,
    width: 300
  },
  productList: {
    paddingBottom: 16,
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
});