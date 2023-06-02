import React, {useEffect, useState} from 'react'
import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const navigation = useNavigation()

    // useEffect(() => { // This is a listener, which essentially handles what to do when we actually login / register
    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //         // If we have a user (i.e. the user exists), navigate to the home screen
    //         if (user) {
    //             navigation.replace("Home")
    //         }
    //         return unsubscribe // Returns unsubscribe so that the listener doesn't keep pinging the program after we change state
    //     })
    // }, [])

    const handleLogin = () => {
        auth 
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("Logged in with", user.email);
                navigation.replace("Home") // For development only! Change back to 'Home' when complete
            })
            .catch(error => alert(error.message))
    }

    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>
                Welcome Back!
            </Text>
            <Image
                source={require('/Users/aarav/Documents/marketplace/assets/log_in.png')}
                style={styles.image}
            />
            <View style={styles.inputContainer}>
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
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default LoginScreen

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
    image: {
        alignItems: 'center',
        width: 300,
        height: 300,
        position: 'absolute',
        top: '25%'
    },
    inputContainer: {
        width: '80%',
        position: 'absolute',
        top: '64%'
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
        top: '80%'
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
    }
})
