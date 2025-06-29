import AsyncStorage from '@react-native-async-storage/async-storage'
import { Redirect, Slot } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native';

export default function AppLayout() {
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [hasToken, setHasToken] = useState<boolean | null>(null);


    useEffect(() => {
        const checkIsToken = async () => {
            try {

                const isToken = await AsyncStorage.getItem("tourvisto-token")

                setHasToken(!!isToken)

            } catch (error) {
                setHasToken(false)
            } finally {
                setCheckingAuth(false)
            }

            // if (!isToken) return <Redirect href="/(auth)/welcome" />
        }

        checkIsToken()
    }, [])

    if (checkingAuth) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    if (!hasToken) {
        // no token → redirect into your auth flow
        return <Redirect href="/(auth)/welcome" />
    }

    return <Slot />
}
