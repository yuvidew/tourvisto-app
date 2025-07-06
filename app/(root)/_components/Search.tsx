import React, { useState } from "react";
import { View, Image, TextInput, StyleSheet } from "react-native";
import { useDebouncedCallback } from "use-debounce";

import { useLocalSearchParams, router } from "expo-router";
import { icons } from "../../../constants/icons";

/**
 * @param {object} props - Component props (none used).
 * @returns {JSX.Element} Search input component for filtering blogs.
 */

const Search = () => {
    const params = useLocalSearchParams<{ query?: string }>();
    const [search, setSearch] = useState(params.query);

    const debouncedSearch = useDebouncedCallback((text: string) => {
        router.setParams({ query: text });
    }, 500);

    const onSearch = (text: string) => {
        setSearch(text);
        debouncedSearch(text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Image source={icons.search} style={styles.icon} />
                <TextInput
                    value={search}
                    onChangeText={onSearch}
                    placeholder="Search for blogs"
                    style={styles.input}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginTop: 20,
        borderRadius: 8,
        backgroundColor: "#F1F5F9", // secondary-100
        borderWidth: 1,
        borderColor: "rgba(191, 219, 254, 0.2)", // blue-100/20
    },
    innerContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        zIndex: 50,
    },
    icon: {
        width: 26,
        height: 26,
    },
    input: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        fontFamily: "Rubik-Regular",
        color: "#6B7280",
        paddingVertical: 4,
        paddingHorizontal: 6,
        borderRadius: 4,
    },
});

export default Search;
