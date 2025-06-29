import { useEffect, useState } from 'react'
import axios from "axios"
import { Platform } from 'react-native';

export const useGetTrips = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [trips, setTrips] = useState([]);

    const DEV_PORT = "2000";
    const HOST =
        Platform.OS === "android"
            ? `http://10.0.2.2:${DEV_PORT}`  // Android emulator loopback
            : `http://localhost:${DEV_PORT}`;

    const getTrips = async () => {
        try {
            console.log("object");
            const response = await axios.get(
                `http://localhost:${DEV_PORT}/v1/trip/get-all-trips`
            );

            console.log("trips response : ", response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTrips()
    }, [])

    return { loading, trips }
}
