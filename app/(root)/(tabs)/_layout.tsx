import { Tabs } from "expo-router"
import { TabIcon } from "../_components/TabIcons";
import { icons } from "../../../constants/icons";

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "white",
                    position: "absolute",
                    borderTopColor: "#318CE7",
                    borderTopWidth: 1,
                    minHeight: 100,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            icon={focused ? icons.homeFocus : icons.home}
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            icon={focused ? icons.exploreFocus : icons.explore}
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="booking"
                options={{
                    title: "Booking",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            icon={focused ? icons.bookingFocus : icons.booking}
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            icon={focused ? icons.profileFocus : icons.profile}
                            focused={focused}
                        />
                    ),
                }}
            />
        </Tabs>
    )
}

export default TabLayout;