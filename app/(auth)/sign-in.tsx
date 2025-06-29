import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../assets/colors";
import InputField from "./_components/InputField";
import CustomButton from "../../components/CustomButton";
import Oauth from "./_components/Oauth";
import { Link, router } from "expo-router";
import { AuthFormType } from "./types/type";
import { useAuth } from "./hooks/useAuth";
import { baseURL } from "../../utils/baseurl";
import ModalComp from "./_components/Modal";

/**
 * SignIn component provides a user interface for signing in to the application.
 * It includes input fields for email and password, a sign-in button, Google OAuth option,
 * and a modal for displaying success or error messages. Upon successful sign-in,
 * the user is redirected to the main app screen.
 *
 * @returns {JSX.Element} The rendered SignIn screen component.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.visible - Controls the visibility of the modal.
 * @param {object} props.form - The form state containing email, password, and role.
 * @param {function} props.setForm - Function to update the form state.
 * @param {function} props.onSignIn - Function to handle the sign-in process.
 * @param {boolean} props.loading - Indicates if the sign-in process is loading.
 * @param {boolean} props.showModal - Indicates if the modal should be shown.
 * @param {string} props.responseMsg - The message to display in the modal.
 */
const SignIn = () => {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState<AuthFormType>({
    email: "",
    password: "",
    role: "user",
  });

  const { onSignIn, loading, showModal, responseMsg } = useAuth();

  useEffect(() => {
    let timer: number;

    if (showModal) {
      
      setVisible(true);

      timer = setTimeout(() => {
        setVisible(false);
        router.replace("/(root)/(tabs)")
      }, 4000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showModal]);


  const handleSignIn = () => {
    onSignIn(baseURL.sign_in , form)
  }

  console.log("sign up statatus" , showModal , visible);

  return (
    <SafeAreaView style={styles.container}>
      {/* start to top heading */}
      <View style={styles.topBox}>
        <Text style={styles.headline}>Hello there 👋</Text>
        <Text style={styles.text}>
          Please enter your email and password to sign in.
        </Text>
      </View>
      {/* end to top heading */}

      {/* start to sign in form  */}
      <View style={styles.formBox}>
        <InputField
          label="Email id"
          placeholder="Enter your email.."
          value={form.email}
          textContentType="emailAddress"
          onChangeText={(value) => setForm({ ...form, email: value })}
        />

        <InputField
          label="Password"
          placeholder="Enter your password.."
          value={form.password}
          textContentType="password"
          onChangeText={(value) => setForm({ ...form, password: value })}
          isPassword
        />

        <CustomButton 
          title="Sign in" 
          loading={loading}
          disable={loading}
          onPress={handleSignIn}
        />
        {/* end to sign in form  */}

        {/* start to Google Oauth */}
        <Oauth />
        {/* end to Google Oauth */}

        {/* start  Redirect to Sign In */}
        <View style={styles.redirectBox}>
          <Text style={styles.redirectBoxText}>Don&apos;t have a account?</Text>
          <Link href={"/(auth)/sign-up"} style={styles.redirectBoxLink}>
            Sign up
          </Link>
        </View>
        {/* end  Redirect to Sign In */}
      </View>

      {/*start  Success / Error Modal */}
      <ModalComp 
        visible = {visible} 
        onBackDropPress={() => setVisible(false)} 
        responseMsg={responseMsg} 
      />
      {/*end  Success / Error Modal */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingVertical: 32,
    height: "100%",
    flexDirection: "column",
    gap: 85,
  },

  topBox: {
    flexDirection: "column",
    gap: 6,
  },

  headline: {
    fontFamily: "Jakarta-Bold",
    fontSize: 28,
    color: colors.primary[600],
    marginBottom: 8,
  },

  text: {
    fontFamily: "Jakarta-Medium",
    color: colors.secondary[800],
    fontSize: 18,
  },

  formBox: {
    flexDirection: "column",
    gap: 25,
  },

  redirectBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },

  redirectBoxText: {
    fontFamily: "Jakarta-Medium",
  },
  redirectBoxLink: {
    fontFamily: "Jakarta-Medium",
    color: colors.primary[700],
  },
});

export default SignIn;
