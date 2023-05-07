import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import { Ionicons, MaterialIcons} from '@expo/vector-icons'
export default function App() {
    return (
        < SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>
                    <Ionicons name="ios-arrow-back" size={24} color="52575D"></Ionicons>
                    <Ionicons name="md-more" size={24} color="52575D"></Ionicons>
                </View>
                <View style={{alignSelf: "center"}}>
                    <View style={style.profileImage}>
                        <Image source={require("./assets/profile-pic.jpg")} style={styles.image} resizeMode="center"></Image>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#525750"
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
    }
})

class Home extends Component {
    render () {
        return (
            <View>
                 
            </View>
        )
    }
}