import { useState } from 'react';
import axios from "axios"
import { AuthFormType, UseAuthReturnType } from '../../../types/type';

import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * Custom React hook for handling authentication logic including sign up and sign in.
 * Manages loading state, response messages, and modal visibility for authentication feedback.
 *
 * @returns {Object} An object containing:
 *   - onSignUp: Function to handle user registration.
 *   - onSignIn: Function to handle user login.
 *   - loading: Boolean indicating if an authentication request is in progress.
 *   - showModel: Boolean indicating if the feedback modal should be shown.
 *   - responseMsg: Object containing success status and message for feedback.
 */

/**
 * Handles user registration by sending a POST request to the provided base URL with form data.
 * Updates loading state, response message, and modal visibility based on the response.
 *
 * @param {string} baseurl - The endpoint URL for the sign up request.
 * @param {AuthFormType} form - The form data containing user registration details.
 * @returns {Promise<void>}
 */

/**
 * Handles user login by sending a POST request to the provided base URL with form data.
 * Stores the authentication token in AsyncStorage on successful login.
 * Updates loading state, response message, and modal visibility based on the response.
 *
 * @param {string} baseurl - The endpoint URL for the sign in request.
 * @param {AuthFormType} form - The form data containing user login details.
 * @returns {Promise<void>}
 */


export const useAuth = (): UseAuthReturnType => {
    const [loading , setLoading] = useState<boolean>(false);
    const [responseMsg , setResponseMsg] = useState({
        success : false,
        message : ""
    });
    const [showModel , setShowModel] = useState<boolean>(false)

    const onSignUp = async(baseurl : string , form : AuthFormType) => {
        setLoading(true)
        try {
            const response = await axios.post(baseurl , form);

            if (response.status === 409) {
                setResponseMsg({
                    success : false,
                    message : response.data.message
                })
                setShowModel(true)
                return;
            }

            if(response.status === 500){
                setResponseMsg({
                    success : false,
                    message : response.data.message
                })
                setShowModel(true)

                return;
            }


            setResponseMsg({
                success : true,
                message : response.data.message
            })

            setShowModel(true)

        } catch (error) {
            console.error("❌ Error during edited user :", error);

            setResponseMsg({
                success : false,
                message : "An error occurred during sign up"
            })
        } finally {
            setLoading(false)
        }
    }

    const onSignIn = async(baseurl : string , form : AuthFormType) => {
        setLoading(true);
        try {
            const response = await axios.post(baseurl , form);

            if (response.status === 401) {
                setResponseMsg({
                    success : false,
                    message : response.data.message
                })
                setShowModel(true)

                return;
            }

            if(response.status === 500){
                setResponseMsg({
                    success : false,
                    message : response.data.message
                })
                setShowModel(true)

                return;
            }


            if(response.status === 200){
                await AsyncStorage.setItem('token', response.data.token);
                setResponseMsg({
                    success : true,
                    message : response.data.message
                })

                setShowModel(true)

                return;
            }

        } catch (error) {
            console.error("❌ Error during edited user :", error);

            setResponseMsg({
                success : false,
                message : "An error occurred during sign in"
            })
        } finally {
            setLoading(false)
        }
    }

    return {onSignUp , onSignIn , loading , showModel , responseMsg}
}
