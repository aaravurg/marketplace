import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

const InitialScreen = () => {
    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>
                Aggie Marketplace
            </Text>

            {/* Stock image */}
            <Image
                source={require("/Users/adamwong/Desktop/profile-edit/profile-edit/assets/adaptive-icon.png")}
                style={styles.image}
            />
            
            {/* Login button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>

            {/* Sign up option */}
            <View style={styles.linkContainer}>
                <Text style={styles.link}>Don't have an account? </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("SignUp")}
                    style={styles.link}
                >
                    <Text style={styles.linkText}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default InitialScreen

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
        // fontFamily: 'Manrope',
        fontSize: 36,
        fontWeight: '400',
        alignItems: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: '25%',
    },
    image: {
        alignItems: 'center',
        width: 300,
        height: 300,
        position: 'absolute',
        top: '35%'
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
        // fontFamily: 'Manrope',
        fontSize: 22,
        fontWeight: '600'
    },
    linkContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 55,
        position: 'absolute',
        top: '80%'
    },
    link: {
        color: '#FFFFFF',
        // fontFamily: 'Manrope',
        fontSize: 14,
        fontWeight: '400'
    },
    linkText: {
        color: '#7871FF',
        // fontFamily: 'Manrope',
        fontWeight: '600',
        marginTop: 10
    }
})
