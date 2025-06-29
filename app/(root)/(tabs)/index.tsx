import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '../../../constants/icons';
import { colors } from '../../../assets/colors';
import Filter from '../_components/Filter';
import FeaturedCards from '../_components/Card';
import { useGetTrips } from '../hooks/useGetTrips';
import { images } from '../../../constants/images';
// import { useGetTrips } from '../hooks/useGetTrips';

const Home = () => {
    // const {loading , } = useGetTrips()
    const {loading, trips , responseMsg , showModal ,} = useGetTrips()
    return (
        <SafeAreaView style={styles.container}>

            <FlatList
                data={[1, 2, 3, 4]}
                renderItem={(item) => <Text>{item.index}</Text>}
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                contentContainerStyle={{
                    paddingBottom: 32,
                    gap: 20,
                    paddingHorizontal: 20
                }}

                ListEmptyComponent={
                    loading ? (
                        <ActivityIndicator
                            size={"large"}
                            style = {styles.LoaderStyle}
                        />
                    ) : null
                }
                ListHeaderComponent={
                    <View style={{ gap: 20 }}>
                        {/* start to header  */}
                        <View style={styles.header}>
                            <View style={styles.headerTextCont}>
                                <Image source={icons.logo} style={styles.headerIcon} resizeMode="contain" />
                                <Text style={styles.headerText}>Tourvisto</Text>
                            </View>
                        </View>
                        {/* end to header  */}

                        {/* start to filter trips card  */}
                        <Filter />
                        {/* end to filter trips card  */}

                        {/* start filter trips by interests */}
                        <FlatList
                            data={trips}
                            renderItem={({item}) => 
                                <FeaturedCards
                                    id = {item.id}
                                    imageUrl={item?.images?.split(',').map((img: string) => img.trim()) || []}
                                    result={item.result}
                                    onPress={() => {}}
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

    LoaderStyle : {
        color : colors.primary[700],
        marginTop : 28
    },

    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    headerTextCont: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        gap: 8
    },

    headerText: {
        fontFamily: "Jakarta-Bold",
        fontSize: 22,
        color: colors.primary[600],
        marginBottom: 8,
    },

    headerIcon: {
        width: 38,
        height: 38
    }
})

export default Home