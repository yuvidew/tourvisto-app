import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../../assets/colors'
import { FeaturedCardsPropsType } from '../types/type'
import { icons } from '../../../constants/icons'

/**
 * @component FeaturedCards
 * @description Displays a featured card with trip details including image, name, location, and price.
 *
 * @param {string} id - The unique identifier of the featured trip card.
 * @param {() => void} onPress - Function called when the card is pressed.
 * @param {string[]} imageUrl - Array of image URLs for the trip.
 * @param {string} result - A JSON string (possibly wrapped in Markdown) containing trip details.
 *
 * @returns {JSX.Element} A styled touchable card component.
 */


const FeaturedCards = ({
    id,
    onPress,
    imageUrl,
    result
}: FeaturedCardsPropsType) => {
    const [tripsContent, setTripsContent] = useState({
        name: "",
        location: "",
        price: 0
    })
    useEffect(() => {
        const tripDetail = (() => {
            if (!result) return null;

            try {
                const cleaned = result.replace(/```json|```/g, "").trim();

                return JSON.parse(cleaned);
            } catch (error) {
                console.error("❌ JSON Parse Error:", error);
                return null;
            }
        })();

        if (tripDetail) {
            setTripsContent({
                name: tripDetail?.name,
                location: tripDetail?.itinerary?.slice(0, 2).map((day: any) => day.location).join(", ") || "No locations",
                price: tripDetail?.estimatedPrice
            })
        }

    }, [])
    return (
        <TouchableOpacity
            style={FeaturedCardsStyles.container}
            onPress={onPress}
        >
            <Image
                source={{ uri: imageUrl[0] }}
                style={FeaturedCardsStyles.containerImg}
            />

            <Text 
                style = {{
                    paddingHorizontal : 14,
                    paddingVertical : 5,
                    borderRadius : 100,
                    backgroundColor : "#fff",
                    position : "absolute",
                    top : 10,
                    right : 5,
                    fontFamily : "Jakarta-Medium",
                    color : colors.primary[700]
                }}
            >
                {tripsContent.price}
            </Text>

            <View style={FeaturedCardsStyles.absoluteOverlay}>
                <View style={FeaturedCardsStyles.absoluteOverlayBox}>
                    {/* Your overlay content */}
                    <Text style={FeaturedCardsStyles.absoluteOverlayHeading}>{tripsContent.name}</Text>
                    <View style = {{display : "flex" , alignItems : "center" , flexDirection : "row" , gap : 3}}>
                    <Image source={icons.location} style = {{width : 15 , height : 15}} tintColor={colors.secondary[700]} />
                    <Text style={FeaturedCardsStyles.absoluteOverlayText} >{tripsContent.location.split(",")[0]}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default FeaturedCards

const FeaturedCardsStyles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "flex-start",
        position: "relative",
        borderWidth: 1,
        borderColor: "#D1D5DB", // light gray
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: "#fff",
        width: 250
    },

    containerImg: {
        width: "100%",
        height: 180,
    },

    absoluteOverlay: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        paddingHorizontal: 5,
        paddingVertical: 12,
    },

    absoluteOverlayBox: {
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderTopRightRadius: 0,
        width: "100%",
        gap : 6
    },

    absoluteOverlayHeading: {
        fontFamily: "Jakarta-SemiBold",
        fontSize: 15,
        color: colors.primary[600],
    },

    absoluteOverlayText: {
        fontFamily: "Jakarta",
        fontSize: 15,
        color: colors.secondary[600],
    },

    absoluteRatingBox: {
        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },

    absoluteRatingStar: {
        width: 14,
        height: 14,
    },

    absoluteRatingText: {
        fontSize: 12,
        lineHeight: 16,
        fontFamily: "Jakarta",
        color: colors.secondary[600],
    },
});

