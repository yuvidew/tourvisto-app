import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export type customButtonType = {
    iconLeft?: boolean;
    iconRight?: boolean;
    title: string;
    onPress?: () => void;
};

export type InputFieldProps = {
    label: string;
    isPassword?: boolean;
    secureTextEntry?: boolean;
    containerStyle?: ViewStyle | ViewStyle[];
    labelStyle?: TextStyle | TextStyle[];
    inputStyle?: TextStyle | TextStyle[];
    iconStyle?: ImageStyle | ImageStyle[];
    className?: string;
    icon?: any;
    placeholder: string;
    value: string;
    textContentType: "name" | "password" | "emailAddress";
    onChangeText: (value: string) => void
};
