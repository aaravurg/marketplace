import { React, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import * as ImagePicker  from 'expo-image-picker'
import Constants from 'expo-constants'
import { auth } from '../firebase';
import { firebase } from '../firebase';
import 'firebase/compat/firestore';
import { useNavigation } from '@react-navigation/core'

const ProductPage = () => {
    const [prodServName, setprodServName] = useState('')
    const [description, setDescription] = useState('')
    const [selectedOption, setSelectedOption] = useState("")
    const [button1Color, setButton1Color] = useState('#FFFFFF');
    const [button2Color, setButton2Color] = useState('#FFFFFF');
    const [price, setPrice] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [displayButton, setDisplayButton] = useState(true); 

    const navigation = useNavigation();

    const openImagePicker = async () => {
        if (Constants.platform.ios || Constants.platform.android) {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          
          if (status != 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
          }
        }
      
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      
        if (!result.canceled) {
          console.log(result.assets[0].uri)
          setSelectedImage(result.assets[0].uri);
          setDisplayButton(false); 
        }
      };

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

    const createListing = () => {
        const user = auth.currentUser;
        const uid = user.uid; 
        const db = firebase.firestore(); 

        const data = {
            title: prodServName,
            cost: price,
            details: description,
            type: selectedOption,
            photo: selectedImage
        };

        const userCollection = db.collection('users').doc(uid).collection('listings');


        userCollection.add(data)
            .then((docRef) => {
                console.log('Document writen with id: ', docRef.id);
                navigation.replace("Home");
            })
            .catch((error) => {
                console.log('Error adding document', error); 
            })

    }

    return (
        <View style={styles.container}>
            {/* Prompt */}
            <Text style={styles.prompt}>
                Create New Listing
            </Text>

            <View style={styles.inputContainer}>
                {/* Text container for product / name */}
                <TextInput
                    placeholder = 'Enter product / service name'
                    placeholderTextColor = '#FFFFFF'
                    value = {prodServName}
                    onChangeText = {(text) => setprodServName(text)}
                    style = {styles.input_standard}
                />
            </View>

            {/* Area to select product or service */}
            <Text style={[styles.text1, styles.text2]}>
                Title
            </Text>

            {/* Picker to set what the user is selling as either a product or service */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: button1Color}]}
                    onPress={() => handleSelection("Product")}
                >
                    <Text style={styles.buttonText}>Product</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: button2Color}]}
                    onPress={() => handleSelection("Service")}
                >
                    <Text style={styles.buttonText}>Service</Text>
                </TouchableOpacity>
            </View>    

            {/* Area to add description */}
            <Text style={[styles.text1, styles.text3]}>
                Details
            </Text>

            <View style={styles.inputContainer2}>
                {/* Text container for description */}
                
                <TextInput
                    placeholder = 'Enter Price'
                    placeholderTextColor = '#FFFFFF'
                    value = {price}
                    onChangeText = {(text) => setPrice(text)}
                    style = {styles.input_standard}
                />

                
                
                <TextInput
                    multiline
                    placeholder = 'Enter description (recommended)'
                    placeholderTextColor = '#FFFFFF'
                    value = {description}
                    onChangeText = {(text) => setDescription(text)}
                    style = {styles.input_long}
                />
            </View>

            <Text style={[styles.text1, styles.text4]}>
                Upload Image
            </Text>

            <View style={styles.imageView}>
                {displayButton && <Button title="Pick Image" onPress={openImagePicker} />}
                {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 100, height: 100 }} />}
            </View>

            <View style={styles.buttonContainer2}>
                <TouchableOpacity
                    onPress={createListing}
                    style={styles.button5}
                >
                    <Text style={styles.buttonText5}>Create</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default ProductPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    prompt: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: '700',
        width: '80%',
        alignItems: 'center',
        textAlign: 'left',
        position: 'absolute',
        top: '7%',
    },
    text1: {
        color: '#FFFFFF',
        opacity: 0.5,
        fontSize: 24,
        fontWeight: '600',
        width: '80%',
        alignItems: 'center',
        textAlign: 'left',
        position: 'absolute',
        top: '15%',
    },
    text2: {
        top: '26%' // Did this manually because I didn't know how to define position relative to the 
    },
    text3: {
        top: '40%'
    },
    text4: {
        top: '68%'
    },
    inputContainer: {
        width: '80%',
        position: 'absolute',
        top: '29%',
    },
    inputContainer2: {
        width: '80%',
        position: 'absolute',
        top: '43%',
    },
    input_standard : {
        backgroundColor: '#717171', // Bg color of input fields
        paddingHorizontal: 15, // Horizontal padding
        paddingVertical: 10, // Vertical padding
        borderRadius: 10, // Rounds edges of text fields
        marginTop: 20, // Ensures that the input field and buttonContainer are separated
        opacity: 0.5,
        color: 'white'
    },
    input_long : {
        backgroundColor: '#717171', // Bg color of input fields
        paddingHorizontal: 15, // Horizontal padding
        height: 100,
        paddingVertical: 10, // Vertical padding
        borderRadius: 10, // Rounds edges of text fields
        marginTop: 20, // Ensures that the input field and buttonContainer are separated
        opacity: 0.5,
        color: 'white'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        position: 'absolute',
        top: '14%'
    },
    button: {
        width: '60%',
        padding: 15,
        marginHorizontal: 20,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000000',
        fontSize: 22,
        fontWeight: '600'
    },
    imageView: {
        flex: 1,
        top: '75%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10
    },
    buttonContainer2: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        position: 'absolute',
        top: '85%'
    },
    button5: {
        backgroundColor: '#7871FF',
        width: '60%',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText5: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '600'
    }
})
