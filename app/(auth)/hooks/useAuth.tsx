
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthFormType, UseAuthReturnType } from '../types/type';

/**
 * Custom React hook for handling authentication logic including sign-up and sign-in.
 *
 * @returns {UseAuthReturnType} An object containing authentication handlers and state.
 *
 * @example
 * const { onSignUp, onSignIn, loading, showModal, responseMsg } = useAuth();
 *
 * @function
 *
 * @param {string} baseurl - The base URL for the authentication API endpoint.
 * @param {AuthFormType} form - The form data containing authentication credentials.
 */

export const useAuth = (): UseAuthReturnType => {
    const [loading, setLoading] = useState(false);
    const [responseMsg, setResponseMsg] = useState<{ success: boolean; message: string }>({
        success: false,
        message: '',
    });
    const [showModal, setShowModal] = useState(false);

    /**
     * Sends a POST request to the specified URL with the provided authentication form data.
    *
    * @param url - The endpoint URL to which the request is sent.
    * @param form - The authentication form data to be sent in the request body.
    * @returns A promise that resolves to an object containing the response status and data.
    */
    const request = async (
        url: string,
        form: AuthFormType
    ): Promise<{ status: number; data: any }> => {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        const data = await res.json();
        return { status: res.status, data };
    };

    /**
     * Custom hook for handling authentication logic, including sign-up.
     *
     * @returns An object containing authentication handlers (`onSignUp`), loading state, modal visibility, and response message.
     *
     * @function onSignUp
     * Handles user sign-up by sending a POST request to the provided URL with the authentication form data.
     * @param baseurl - The endpoint URL to which the sign-up request is sent.
     * @param form - The authentication form data to be sent in the request body.
     */


    const onSignUp = async (baseurl: string, form: AuthFormType) => {
        setShowModal(false);
        setLoading(true);
        try {
            const { status, data } = await request(baseurl, form);

            if (status === 409 || status === 500) {
                setResponseMsg({ success: false, message: data.message });
            } else {
                setResponseMsg({ success: true, message: data.message });
            }
        } catch (err: any) {
            setResponseMsg({ success: false, message: 'An error occurred during sign-up' });
        } finally {
            setShowModal(true);
            setLoading(false);
        }
    };

    /**
     * * Custom hook for handling authentication logic, including sign-in.
     *
     * @returns An object containing authentication handlers (`onSignIn`), loading state, modal visibility, and response message.
     * @function onSignIn
     * Handles user sign-in by sending a POST request to the provided URL with the authentication form data.
     * @param baseurl - The endpoint URL to which the sign-in request is sent.
     * @param form - The authentication form data to be sent in the request body.
     */

    const onSignIn = async (baseurl: string, form: AuthFormType) => {
        setShowModal(false);
        setLoading(true);
        try {
            const { status, data } = await request(baseurl, form);

            if (status === 401 || status === 500) {
                setResponseMsg({ success: false, message: data.message });
            } else if (status === 200) {
                await AsyncStorage.setItem('tourvisto-token', data.token);
                setResponseMsg({ success: true, message: data.message });
            } else {
                setResponseMsg({ success: false, message: 'Unexpected status ' + status });
            }

            console.log("response data" , data);

        } catch (err: any) {
            
            setResponseMsg({ success: false, message: 'An error occurred during sign-in' });
        } finally {
            setShowModal(true);
            setLoading(false);
        }
    };

    return { onSignUp, onSignIn, loading, showModal, responseMsg };
};
