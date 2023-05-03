import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Svg, { Image as SvgImage } from 'react-native-svg'; // Allows us to use .svg images
import { ReactSVG } from 'react-svg'


const InitialScreen = () => {
    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>
                Aggie Marketplace
            </Text>

            {/* <Svg width='200' height='200' style={styles.image}>
                <SvgImage
                    width="100%"
                    height="100%"
                    href={require('./sign_in.svg')}
                />
            </Svg> */}
            
            {/* Stock image */}
            <Image
                source={require('/Users/siddharthmani/Documents/GitHub/marketplace/images/sign_in.png')}
                style={styles.image}
            />
            {/* Login Button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
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
        fontFamily: 'Manrope',
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
        fontFamily: 'Manrope',
        fontSize: 22,
        fontWeight: '600'
    }
})
