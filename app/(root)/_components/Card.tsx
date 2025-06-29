import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../../assets/colors'
import { FeaturedCardsPropsType } from '../types/type'

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
    const [tripsContent , setTripsContent] = useState({
        name : "",
        location : "",
        price : 0
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
                name : tripDetail?.name,
                location : tripDetail?.itinerary?.slice(0, 2).map((day : any) => day.location).join(", ") || "No locations",
                price : tripDetail?.estimatedPrice
            })
        }

    } , [])
    return (
        <TouchableOpacity
            style={FeaturedCardsStyles.container}
            onPress={onPress}
        >
            <Image
                source={{ uri: imageUrl[0] }}
                style={FeaturedCardsStyles.containerImg}
            />

            <View style={FeaturedCardsStyles.absoluteOverlay}>
                <View
                    style={FeaturedCardsStyles.absoluteRatingBox}
                >
                    
                    <Text style={FeaturedCardsStyles.absoluteRatingText} >
                        {tripsContent.price}
                    </Text>
                </View>
                <View style={FeaturedCardsStyles.absoluteOverlayBox}>
                    {/* Your overlay content */}
                    <Text style={FeaturedCardsStyles.absoluteOverlayHeading}>{tripsContent.name}</Text>
                    <Text style={FeaturedCardsStyles.absoluteOverlayText} >{tripsContent.location}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default FeaturedCards

const FeaturedCardsStyles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        position: "relative"
    },
    containerImg: {
        width: 300,
        height: 380,
        borderRadius: 16
    },
    absoluteOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 20,
    },

    absoluteOverlayBox: {
        width: 260,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderTopRightRadius: 0
    },

    absoluteOverlayHeading: {
        fontFamily: "Jakarta-SemiBold",
        fontSize: 15,
        color: colors.primary[600]
    },

    absoluteOverlayText: {
        fontFamily: "Jakarta",
        fontSize: 15,
        color: colors.secondary[600]
    },

    absoluteRatingBox: {
        backgroundColor: "#fff",
        borderTopEndRadius: 8,
        borderTopStartRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },

    absoluteRatingStar: {
        width: 14,
        height: 14
    },

    absoluteRatingText: {
        fontSize: 12,
        lineHeight: 16,
        fontFamily: "Jakarta",
        color: colors.secondary[600]
    }
})
