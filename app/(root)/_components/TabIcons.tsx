
import { colors } from '../../../assets/colors';
import { TabIconProps } from '../../../types/type';
import React, { JSX } from 'react';
import { View, Image, StyleSheet } from 'react-native';

/**
 * Renders a tab icon for the navigation bar.
 *
 * @param {TabIconProps} props - The props for the TabIcon component.
 * @param {boolean} props.focused - Determines if the tab is currently focused/active.
 * @param {ImageSourcePropType} props.icon - The source for the icon image to display.
 * @returns {JSX.Element} The rendered tab icon component.
 */

export const TabIcon = ({ focused, icon, }: TabIconProps) : JSX.Element => (
    <View style={styles.container}>
        <Image
            source={icon}
            tintColor={focused ? colors.primary[600] : '#666876'}
            resizeMode="contain"
            style={styles.image}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15, 
        alignItems: "center",
        flexDirection: 'column',
    },
    image: {
        width : 28,
        height : 28
    },
    text: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 4, 
        width: '100%',
    },
    textFocused: {
        color: colors.primary[600],
        fontWeight: '500', 
    },
    textUnfocused: {
        color: '#666876', 
    },
});

