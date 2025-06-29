import { useEffect, useMemo, useState } from 'react';
import { baseURL } from '../../../utils/baseurl';
import { TravelPlan } from '../types/type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useGetTrips = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [trips, setTrips] = useState<TravelPlan[]>([]);
    const [responseMsg, setResponseMsg] = useState<{ success: boolean; message: string }>({
        success: false,
        message: '',
    });


    const request = async (
        url: string
    ): Promise<{ status: number; data: any }> => {
        const token = await AsyncStorage.getItem("tourvisto-token");
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return { status: res.status, data };
    }

    const getTrips = async () => {
        setLoading(true);
        setShowModal(false);
        try {
            const { status, data } = await request(baseURL.get_trips);

            if (status === 409 || status === 500) {
                setResponseMsg({ success: false, message: data.message });
                return;
            }

            // const tripDetail = (() => {
            //     if (!data.trips[0].result) return null;

            //     try {
            //         const cleaned = data.trips[0].result.replace(/```json|```/g, "").trim();
                    
            //         return JSON.parse(cleaned);
            //     } catch (error) {
            //         console.error("❌ JSON Parse Error:", error);
            //         return null;
            //     }
            // })();

            // if (tripDetail) {
            //     console.log("trips details" , tripDetail);
            // }

            setTrips(data.trips);
        } catch (error) {
            setResponseMsg({ success: false, message: 'An error occurred during sign-up' });
        } finally {
            setShowModal(true);
            setLoading(false);
        }
    }

    useEffect(() => {
        getTrips()
    }, [])

    return { loading, trips, responseMsg, showModal, }
}
