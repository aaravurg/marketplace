import { updateProfile } from '@firebase/auth'
import React, {useEffect, useState} from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'


const SignUpScreen = () => {
    // const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const navigation = useNavigation()

    useEffect(() => { // This is a listener, which essentially handles what to do when we actually login / register
        const unsubscribe = auth.onAuthStateChanged(user => {
            // If we have a user (i.e. the user exists), navigate to the home screen
            if (user) {
                navigation.replace("Home")
            }
            return unsubscribe // Returns unsubscribe so that the listener doesn't keep pinging the program after we change state
        })
    }, [])

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password) // This is a Promise, which is essentially represents the completion / failure of an asynchronus operation
            .then(userCredentials => { // .then() excecutes after the Promise
                const user = userCredentials.user;
                console.log(user.email);
            })
            .catch(error => alert("Registered with", error.message))
    }

    return (
        <View style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>
                Please fill out the following to get started
            </Text>
           
            <View style={styles.inputContainer}>
                {/* Ask for user's full name */}
                {/* <TextInput
                    placeholder = "Please enter your full name"
                    value = {fullName}
                    onChangeText = {text => setFullName(text)}
                    style = {styles.input}
                /> */}

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
                />
            </View>

            {/* Login button */}
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
        fontFamily: 'Manrope',
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
        marginTop: 15, // Ensures that the input field and buttonContainer are separated
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
        fontFamily: 'Manrope',
        fontSize: 22,
        fontWeight: '600'
    },
})
