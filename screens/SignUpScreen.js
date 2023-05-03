import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SignUpScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Sign Up Screen</Text>
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
    }
})
