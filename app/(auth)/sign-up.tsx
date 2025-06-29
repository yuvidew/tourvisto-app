import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../assets/colors';
import InputField from './_components/InputField';
import CustomButton from '../../components/CustomButton';
import Oauth from './_components/Oauth';
import { Link, router, useNavigation } from 'expo-router';
import { useAuth } from './hooks/useAuth';
import { baseURL } from '../../utils/baseurl';
import ModalComp from './_components/Modal';
import { AuthFormType } from './types/type';
/**
 * SignUp screen for user registration.
 * 
 * @component
 * @returns {JSX.Element}
 * 
 * @param {void} none - This component does not accept props.
 * 
 * @description
 * Renders a sign-up form with username, email, and password fields.
 * Handles user registration, shows loading state, and displays a modal on success/error.
 */
const SignUp = () => {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState<AuthFormType>({
    username: "",
    email: "",
    password: "",
    role: "user"
  });

  const { onSignUp, loading, showModal, responseMsg } = useAuth();

  useEffect(() => {
    let timer: number;

    if (showModal) {
      setVisible(true);

      timer = setTimeout(() => {
        setVisible(false);
        router.replace("/(auth)/sign-in")
      }, 4000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showModal]);




  const handleSignUp = () => {
    onSignUp(baseURL.sign_up, form);
  };


  return (
    <SafeAreaView style={styles.container}>
      {/* Start Top Heading */}
      <View style={styles.topBox}>
        <Text style={styles.headline}>Create an account 🔐</Text>
        <Text style={styles.text}>
          Enter your username, email and password to create an account.
        </Text>
      </View>
      {/* End Top Heading */}

      {/* start  Signup Form */}
      <View style={styles.formBox}>
        <InputField
          label="Username"
          placeholder="Enter your username.."
          value={form.username as string}
          textContentType="name"
          onChangeText={(value) => setForm({ ...form, username: value })}
        />

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
          title={"Sign up"}
          loading={loading}
          disable={loading}
          onPress={handleSignUp}
        />

        {/* start Google Oauth */}
        <Oauth />
        {/* end Google Oauth */}

        {/* start  Redirect to Sign In */}
        <View style={styles.redirectBox}>
          <Text style={styles.redirectBoxText}>Already have an account?</Text>
          <Link href="/(auth)/sign-in" style={styles.redirectBoxLink}>
            Sign in
          </Link>
        </View>
        {/* end  Redirect to Sign In */}
      </View>
      {/* end sign up form */}

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
    gap: 85,
  },
  topBox: {
    flexDirection: "column",
    gap: 6,
  },
  headline: {
    fontFamily: "Jakarta-Bold",
    fontSize: 20,
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

export default SignUp;
