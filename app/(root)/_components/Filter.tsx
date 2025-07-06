import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { interests } from '../../../constants/interests';
import { colors } from '../../../assets/colors'
import { router, useLocalSearchParams } from 'expo-router'

const Filter = () => {
    const params = useLocalSearchParams<{interests? : string}>()
    const [selectInterest, setSelectInterest] = useState(params.interests || "🍲 Food & Culinary")

    const onInterest = ( value : string) => {
        setSelectInterest(value)
        router.setParams({
            interests : value
        })
    }

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 12, marginBottom: 8 }}
        >
            {interests.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.button , selectInterest !== item ? styles.buttonBg : styles.selectButtonBg]}
                    onPress={() => onInterest(item)}
                >
                    <Text style={[styles.text, selectInterest !== item ? styles.textFamily : styles.textFamilySelected]}>
                        {item}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default Filter

const styles = StyleSheet.create({
    button: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginRight: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius : 60,
        gap: 2
    },

    buttonBg : {
        backgroundColor : "#fff"
    },
    selectButtonBg : {
        backgroundColor: colors.primary[600]
    },

    topline: {
        width: 30,
        height: 2,
    },

    topLineBg: {
        backgroundColor: colors.secondary[600],
    },

    topLineBgSelected: {
        backgroundColor: colors.primary[600],
    },

    text: {
        fontSize: 16,
        color: "#555",
    },

    textFamily: {
        fontFamily: "Jakarta-Medium",
        color: colors.secondary[600]
    },

    textFamilySelected: {
        fontFamily: "Jakarta-Bold",
        color: "#fff"

    }
})