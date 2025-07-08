import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '../../../constants/icons';
import { colors } from '../../../assets/colors';
import Filter from '../_components/Filter';
import FeaturedCards, { Cards } from '../_components/Card';
import { useGetTrips } from '../hooks/useGetTrips';
import Search from '../_components/Search';
import { Link, useRouter } from 'expo-router';
// import { useGetTrips } from '../hooks/useGetTrips';

const Home = () => {
    // const {loading , } = useGetTrips()
    const router = useRouter()
    const { loading, trips, responseMsg, showModal, } = useGetTrips();

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={trips}
                renderItem={({ item }) =>
                    <Cards
                        imageUrl={item?.images?.split(',').map((img: string) => img.trim()) || ""}
                        id={item.id}
                        result={item.result}
                        onPress={() => { }}
                    />
                }
                keyExtractor={(item) => item.id.toString()}
                // numColumns={2}
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                contentContainerStyle={{
                    paddingBottom: 72,
                    gap: 5,
                    paddingHorizontal: 20
                }}
                // columnWrapperStyle = {{
                //     display : "flex",
                //     gap : 5,
                //     paddingVertical : 20
                // }}
                ListEmptyComponent={
                    loading ? (
                        <ActivityIndicator
                            size={"large"}
                            style={styles.LoaderStyle}
                        />
                    ) : null
                }
                ListHeaderComponent={
                    <View style={{ gap: 20 }}>
                        {/* start to header  */}
                        <View style={styles.header}>
                            <View style={styles.headerTextCont}>
                                <Text style={styles.headerText}>Hii yuvi</Text>
                                <Text style={styles.headerText1}>Traveling today?</Text>
                            </View>
                            <View>
                                <Image style={{ width: 40, height: 40, objectFit: "cover" }} source={icons.man3} />
                            </View>
                        </View>
                        {/* end to header  */}

                        {/* start to search */}
                        <Search />
                        {/* end to search */}

                        {/* start to filter trips card  */}
                        <Filter />
                        {/* end to filter trips card  */}

                        {/* start to popular destination */}
                        <View style={styles.popularStandBox}>
                            <Text style={styles.popularStandHeadline}>
                                Popular Destination
                            </Text>

                            <Link href="/" style={styles.popularSeeMore}>
                                See all
                            </Link>
                        </View>
                        {/* end to popular destination */}

                        {/* start filter trips by interests */}
                        <FlatList
                            data={trips}
                            renderItem={({ item }) =>
                                <FeaturedCards
                                    imageUrl={item?.images?.split(',').map((img: string) => img.trim()) || []}
                                    id={item.id}
                                    result={item.result}
                                    onPress={() => router.push({
                                        pathname: "/(root)/trip-details/[id]",
                                        params: { id: item.id }
                                    })}
                                />
                            }
                            keyExtractor={(item) => String(item.id)}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            bounces={false}
                            contentContainerStyle={{
                                display: "flex",
                                gap: 20,
                                marginTop: 20
                            }}
                        />
                        {/* end filter trips by interests */}

                        {/* start to trips list  */}
                        <View style={styles.popularStandBox}>
                            <Text style={styles.popularStandHeadline}>
                                All Destination
                            </Text>

                            <Link href="/" style={styles.popularSeeMore}>
                                See all
                            </Link>
                        </View>
                        {/* end to trips list  */}
                    </View>
                }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        height: "100%",
        flexDirection: "column",
    },

    LoaderStyle: {
        color: colors.primary[700],
        marginTop: 28
    },

    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    headerTextCont: {
        display: "flex",
        gap: 2
    },

    headerText: {
        fontFamily: "Jakarta-Medium",
        fontSize: 18,
        color: colors.secondary[600],
    },
    headerText1: {
        fontFamily: "Jakarta-Medium",
        fontSize: 22,
        color: colors.secondary[900],
    },

    headerIcon: {
        width: 38,
        height: 38
    },

    popularStandBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },

    popularStandHeadline: {
        fontFamily: "Jakarta-Medium",
        fontSize: 22,
        color: colors.secondary[900],
    },

    popularSeeMore: {
        fontFamily: "Jakarta-Medium",
        fontSize: 14,
        color: colors.primary[800]
    }
})

export default Home