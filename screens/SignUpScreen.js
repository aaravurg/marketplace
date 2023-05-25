<<<<<<< HEAD
import { updateProfile } from '@firebase/auth'
import React, {useEffect, useState} from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'


const SignUpScreen = () => {
    const [fullName, setFullName] = useState('')
=======
import { updateProfile, getAuth } from '@firebase/auth'
import React, {useEffect, useState} from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native'
import { auth, db } from '../firebase'
import {set, ref} from 'firebase/database'
import { useNavigation } from '@react-navigation/core'
import { uid } from 'uid'

const SignUpScreen = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
>>>>>>> 7e044d8f0c95e200586979dc6a6071b942597669
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const navigation = useNavigation()

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password) // This is a Promise, which is essentially represents the completion / failure of an asynchronus operation
            .then(userCredentials => { // .then() excecutes after the Promise
                const user = userCredentials.user;
<<<<<<< HEAD
                user.updateProfile({
                    displayName: fullName,
                })
                console.log(user.email);
=======
                console.log(user.email);
                updateProfile(user, {
                    displayName: firstName + ' ' + lastName
                })
                .then(() => {
                    console.log("User name: " + user.displayName)
                })
                .catch(error => alert(error.message))
                navigation.replace("Home");
>>>>>>> 7e044d8f0c95e200586979dc6a6071b942597669
            })
            .catch(error => alert(error.message))
    }

    return (
        <View style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>
                Please fill out the following to get started
            </Text>
            <View style={styles.inputContainer}>
<<<<<<< HEAD
                {/* Ask for user's full name */}
                <TextInput
                    placeholder = "Please enter your full name"
                    value = {fullName}
                    onChangeText = {text => setFullName(text)}
=======
                {/* Ask for user's first name */}
                <TextInput
                    placeholder = "Please enter your first name"
                    value = {firstName}
                    onChangeText = {text => setFirstName(text)}
                    style = {styles.input}
                />
               
                {/* Ask for user's last name */}
                <TextInput
                    placeholder = "Please enter your last name"
                    value = {lastName}
                    onChangeText = {text => setLastName(text)}
>>>>>>> 7e044d8f0c95e200586979dc6a6071b942597669
                    style = {styles.input}
                />

                {/* Ask for user's email */}
                <TextInput
                    placeholder = 'Please enter your email'
                    value = {email}
                    onChangeText = {(text) => setEmail(text)}
                    style = {styles.input}
                />

                {/* Ask the user for a password */}
                <TextInput
                    placeholder = 'Please enter a password'
                    value = {password}
                    onChangeText = {(text) => setPassword(text)}
                    style = {styles.input}
                    secureTextEntry
                />
            </View>

            {/* Signup button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 36,
        fontWeight: '400',
        width: '80%',
        alignItems: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: '15%',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white', // Bg color of input fields
        paddingHorizontal: 15, // Horizontal padding
        paddingVertical: 10, // Vertical padding
        borderRadius: 10, // Rounds edges of text fields
        marginTop: 20, // Ensures that the input field and buttonContainer are separated
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        position: 'absolute',
        top: '72%'
    },
    button: {
        backgroundColor: '#7871FF',
        width: '60%',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '600'
    },
})
