import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import { Ionicons, MaterialIcons} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
export default function App() {
    return (
        < SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>
                    <Ionicons name="ios-arrow-back" size={24} color="#FFFFFF"></Ionicons>
                    <Ionicons name="md-menu" size={24} color="#FFFFFF"></Ionicons>
                </View>
                <View style={{alignSelf: "center"}}>
                    <View style={styles.profileImage}>
                        <Image source={require("/Users/adamwong/Desktop/profile-edit/profile-edit/assets/Default_pfp.jpg")} style={styles.image} resizeMode="center"></Image>
                    </View>
                <View style={styles.dm}>
                    <MaterialIcons name="chat" size={18} color ="#FFFFFF"></MaterialIcons>
                </View>
                <View style={styles.active}></View>
                    <View style={styles.add}>
                        <Ionicons name="ios-add" size={48} color="#FFFFFF" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { color: "#7871FF", fontWeight: "200", fontSize: 36 }]}>Anonymous</Text>
                    <Text style={[styles.text, { color: "#FFFFFF", fontSize: 14 }]}>Student at UC Davis</Text>
                </View>

                // ...

<View style={styles.statsContainer}>
  <View style={styles.statsBox}>
    <Text style={[styles.text, { color: "#FFFFFF", fontSize: 24, textAlign: "center" }]}>200</Text>
    <Text style={[styles.text, styles.subText, { color: "#FFFFFF", textAlign: "center" }]}>Products Sold</Text>
  </View>
  <View style={[styles.statsBox, { borderColor: "#FFFFFF", borderLeftWidth: 1, borderRightWidth: 1 }]}>
    <Text style={[styles.text, { color: "#FFFFFF", fontSize: 24, textAlign: "center" }]}>53</Text>
    <Text style={[styles.text, styles.subText, { color: "#FFFFFF", textAlign: "center" }]}>Products Bought</Text>
  </View>
  <View style={styles.statsBox}>
    <Text style={[styles.text, { color: "#FFFFFF", fontSize: 24, textAlign: "center" }]}>3</Text>
    <Text style={[styles.text, styles.subText, { color: "#FFFFFF", textAlign: "center" }]}>Pending</Text>
  </View>
</View>


<Text style={styles.searchHistoryCaption}>Search History</Text>

<View style={[styles.searchHistoryLine, { borderBottomWidth: 10, borderBottomColor: '#7871FF' }]} />


                <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("/Users/adamwong/Desktop/profile-edit/profile-edit/assets/purple tank.jpeg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("/Users/adamwong/Desktop/profile-edit/profile-edit/assets/red puffer.jpeg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("/Users/adamwong/Desktop/profile-edit/profile-edit/assets/davishoodie.jpeg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#333333"
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
        overflow: "hidden"
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
        backgroundColor: "#00ff00",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 30,
        width: 30,
        borderRadius: 20
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
        marginTop: 30
    },
    statsBox: {
        alignSelf: "center",
        alignItems: "center",
        flex: 1
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
    searchHistoryCaption: {
        fontFamily: "HelveticaNeue",
        color: "#7871FF",
        fontSize: 30,
        textAlign: "center",
        marginTop: 50
    }
});
