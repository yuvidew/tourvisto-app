import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { JSX } from 'react'
import { colors } from '../../../assets/colors'
import { icons } from '../../../constants/icons'

/**
 * Oauth component for rendering a Google sign-in button with a separator.
 *
 * @component
 * @returns {JSX.Element} The Oauth component.
 */
const Oauth = () : JSX.Element => {
    return (
        <View style={styles.container}>
            <View style={styles.orContinue}>
                <View style={styles.line} />
                <Text style={styles.textLine} >or continue with</Text>
                <View style={styles.line} />
            </View>
            <TouchableOpacity style={styles.button}>
                <Image source={icons.google} resizeMode="contain" style = {styles.buttonIcon} />
                <Text style = {styles.buttonText} >Signin with google</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Oauth

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 18
    },
    orContinue: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: colors.secondary[300]
    },
    textLine: {
        fontFamily : "Jakarta-Light",
        lineHeight: 28,
        fontSize: 15,
        color: colors.secondary[700]
    },

    button: {
        backgroundColor: "#ffF",
        gap: 18,
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        shadowColor: colors.secondary[300],
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4,
        elevation: 15,
    },

    buttonText : {
        fontFamily : "Jakarta-Medium",
        fontSize : 18,
        color : colors.secondary[700],
        letterSpacing : 1
    },

    buttonIcon : {
        width : 20,
        height : 20
    }
})