import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Modal from "react-native-modal";
import { colors } from '../../..//assets/colors';
import { icons } from '../../../constants/icons';
import { ModalCompPropsType } from '../types/type';

/**
 * Displays a modal dialog with a success or failure message based on the response.
 *
 * @param visible - Determines whether the modal is visible.
 * @param onBackDropPress - Callback function invoked when the backdrop is pressed.
 * @param responseMsg - Object containing the success status and message to display.
 */
const ModalComp = ({
    visible,
    onBackDropPress,
    responseMsg
} : ModalCompPropsType) => {
    return (
        <Modal isVisible={visible} onBackdropPress={onBackDropPress}>
            <View style={styles.modelBox}>
                <Image
                    style={
                        styles.alertImage
                    }
                    source={
                        responseMsg.success ? icons.check : icons.alert
                    }
                />
                <Text style={styles.headline}>
                    {responseMsg.success ? "Successfully sign up" : "Failed to sign up"}
                </Text>
                <Text style={{ fontFamily: "Jakarta-Medium", marginTop: 8, color: colors.secondary[400] }}>
                    {responseMsg.message}
                </Text>
            </View>
        </Modal>
    )
}

export default ModalComp

const styles = StyleSheet.create({
    alertImage: {
        width: 60,
        height: 60,
        objectFit: "contain"
    },

    modelBox: {
        minHeight: 200,
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },

    headline: {
        fontFamily: "Jakarta-Bold",
        fontSize: 20,
        color: colors.primary[600],
        marginBottom: 8,
    },
})