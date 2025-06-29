import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router';
import { icons } from '../../../constants/icons';
// import { useGetTrips } from '../hooks/useGetTrips';

const Home = () => {
    // const {loading , } = useGetTrips()
    return (
        <SafeAreaView style = {styles.container}>
            {/* start to header  */}
            <View style = {styles.header}>
                <View style = {styles.headerTextCont}>
                    <Image source={icons.logo} style = {styles.headerIcon} resizeMode="contain"  />
                </View>
            </View>
            {/* end to header  */}
            <Text>Home</Text>
            <Link href = "/(auth)/sign-in" >Sign in</Link>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 24,
        paddingVertical: 0,
        height: "100%",
        flexDirection: "column",
    },

    header : {
        display : "flex",
        alignItems : "center",
        justifyContent : "center"
    },

    headerTextCont : {
        display : "flex",
        alignItems : "center",
        gap : 8
    },

    headerIcon : {
        width : 28,
        height : 28
    }
})

export default Home