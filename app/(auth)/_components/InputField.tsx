import {
    View,
    Text,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Image,
    TextInput,
    Platform,
    Keyboard,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../../../constants/icons";
import { InputFieldProps } from '../../../types/type';
import { colors } from "../../../assets/colors";

/**
 * InputField is a customizable input component for React Native forms.
 * It supports password visibility toggling, custom icons, and styling.
 *
 * @param {string} label - The label text displayed above the input field.
 * @param {object} labelStyle - Optional custom style for the label text.
 * @param {string} placeholder - Placeholder text for the input field.
 * @param {boolean} [isPassword=false] - If true, enables password visibility toggle.
 * @param {string} value - The current value of the input field.
 * @param {object} inputStyle - Optional custom style for the TextInput.
 * @param {object} containerStyle - Optional custom style for the input container.
 * @param {object} iconStyle - Optional custom style for the password visibility icon.
 * @param {boolean} [secureTextEntry=false] - If true, masks the input text.
 * @param {string} textContentType - The content type for autofill hints.
 * @param {(text: string) => void} onChangeText - Callback when the input text changes.
 *
 * @returns {JSX.Element} The rendered input field component.
 */


const InputField = ({
    label,
    labelStyle,
    placeholder,
    isPassword = false,
    value,
    inputStyle,
    containerStyle,
    iconStyle,
    secureTextEntry = false,
    textContentType,
    onChangeText,
}: InputFieldProps) => {
    const [isShow, setIsShow] = useState(false);
    const isSecure = isPassword ? !isShow : false;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.wrapper}>
                    <Text style={[styles.label, labelStyle]}>{label}</Text>

                    <View style={[styles.inputContainer, containerStyle]}>
                        <TextInput
                            style={[styles.input, inputStyle]}
                            placeholder={placeholder}
                            secureTextEntry={isSecure}
                            textContentType={isPassword ? "password" : textContentType}
                            onChangeText={onChangeText}
                            value={value}
                        />

                        {isPassword && (
                            <TouchableOpacity onPress={() => setIsShow(!isShow)}>
                                <Image
                                    source={!isShow ? icons.closeEye : icons.openEye}
                                    style={[styles.icon, iconStyle]}
                                    tintColor={colors.primary[600]}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default InputField;

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
    },
    label: {
        fontSize: 16,
        fontFamily: "Jakarta-SemiBold",
        color: colors.secondary[700], 
        marginBottom: 6,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#fff",
        borderBottomWidth: 2,
        borderBottomColor: colors.primary[600],
        borderRadius: 4,
    },
    input: {
        flex: 1,
        paddingVertical: 16,
        fontSize: 15,
        fontFamily: "Jakarta-Medium",
        color: colors.secondary[700],
        textAlign: "left",
        
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },
});
