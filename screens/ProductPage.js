import { React, useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ProductPage = () => {
    const [prodServName, setprodServName] = useState('')
    const [description, setDescription] = useState('')
    const [selectedOption, setSelectedOption] = useState('')

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    }

    return (
        <View style={styles.container}>
            {/* Prompt */}
            <Text style={styles.prompt}>
                Create a new product / service
            </Text>

            {/* Product / service name */}
            <Text style={styles.text1}>
                Name of product / service
            </Text>

            <View style={styles.inputContainer}>
                {/* Text container for product / name */}
                <TextInput
                    placeholder = 'Enter product / service name'
                    placeholderTextColor = '#999999'
                    value = {prodServName}
                    onChangeText = {(text) => setprodServName(text)}
                    style = {styles.input}
                />
            </View>

            {/* Area to select product or service */}
            <Text style={[styles.text1, styles.text2]}>
                Product or Service
            </Text>

            {/* Picker to set what the user is selling as either a product or service */}
            <Picker
                selectedValue = {selectedOption}
                onValueChange = {handleOptionChange}
                mode = 'dialog'
                style = {styles.picker}
                itemStyle = {{color: 'white'}} 
            >
                <Picker.Item style={styles.pickerText} label = "Product" value = "Product"/>
                <Picker.Item style={styles.pickerText} label = "Service" value = "Service"/>
            </Picker>

            {/* Area to add description */}
            <Text style={[styles.text1, styles.text3]}>
                Description
            </Text>

            <View style={styles.inputContainer2}>
                {/* Text container for description */}
                <TextInput
                    placeholder = 'Enter description'
                    placeholderTextColor = '#999999'
                    value = {description}
                    onChangeText = {(text) => setDescription(text)}
                    style = {styles.input}
                />
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
        fontSize: 18,
        fontWeight: '700',
        width: '80%',
        alignItems: 'center',
        textAlign: 'left',
        position: 'absolute',
        top: '15%',
    },
    text1: {
        color: '#FFFFFF',
        opacity: 0.5,
        fontSize: 13,
        fontWeight: '600',
        width: '80%',
        alignItems: 'center',
        textAlign: 'left',
        position: 'absolute',
        top: '22%',
    },
    text2: {
        top: '35%' // Did this manually because I didn't know how to define position relative to the 
    },
    text3: {
        top: '55%'
    },
    inputContainer: {
        width: '80%',
        position: 'absolute',
        top: '25%',
    },
    inputContainer2: {
        width: '80%',
        position: 'absolute',
        top: '58%',
    },
    input: {
        backgroundColor: '#717171', // Bg color of input fields
        paddingHorizontal: 15, // Horizontal padding
        paddingVertical: 10, // Vertical padding
        borderRadius: 10, // Rounds edges of text fields
        marginTop: 20, // Ensures that the input field and buttonContainer are separated
        opacity: 0.5,
        color: 'white'
    },
    picker: {
        width: 300,
        height: 100,
        justifyContent: 'center',
        top: '-6%'
    },
    pickerText: {
        color: '#FFFFFF',
    }
})
