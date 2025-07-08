import { useState } from 'react';
// import axios from "axios"
import { baseURL } from '../../../../utils/baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TravelPlan } from '../../types/type';


/**
 * Custom hook to fetch trip details by trip ID.
 *
 * Manages loading state, error messages, and trip data.
 *
 * @returns {{
 *   loading: boolean;
 *   getTripDetailsById: (id: string) => Promise<void>;
 *   responseMsg: { success: boolean; message: string };
 *   trips?: TravelPlan;
 * }} Hook state and actions.
 */

export const useGetTripDetailsById = () => {
    const [loading, setLoading] = useState(false);
    const [trips, setTrips] = useState<TravelPlan>();
    const [responseMsg, setResponseMsg] = useState<{ success: boolean; message: string }>({
        success: false,
        message: '',
    });

    /**
     * Makes an authenticated GET request to the given URL.
     *
     * @param {string} url - The API endpoint URL to fetch.
     * @returns {Promise<{ status: number; data: any }>} The response status and data.
     */
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

    /**
     * Fetches trip details by ID and updates state with the result.
     *
     * @param {string} id - The ID of the trip to fetch.
     * @returns {Promise<void>}
     */
    const getTripDetailsById = async (id: string) => {
        setLoading(true);
        try {
            const { status, data } = await request(`${baseURL.get_trips_by_id}/${id}`);

            if (status === 409 || status === 500) {
                setResponseMsg({ success: false, message: data.message });
                return;
            }

            setTrips(data.trip);

            console.log("the trips details from the hook" , data.trip);
        } catch (error) {
            console.log("error occurred when fetching trip details by id", error);
            setResponseMsg({ success: false, message: 'An error occurred during fetch' });
        } finally {
            setLoading(false);
        }
    }

    return { loading, getTripDetailsById, responseMsg, trips };
}
