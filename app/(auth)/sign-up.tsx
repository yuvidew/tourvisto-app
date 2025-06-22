import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../assets/colors';
import InputField from './_components/InputField';
import CustomButton from '../../components/CustomButton';
import Oauth from './_components/Oauth';
import { Link } from 'expo-router';
import { AuthFormType } from '../../types/type';
import Modal from "react-native-modal"; // ✅ Renamed for clarity
import { useAuth } from './hooks/useAuth';
import { baseURL } from '../../utils/baseurl';

const SignUp = () => {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState<AuthFormType>({
    username: "",
    email: "",
    password: "",
    role: "user"
  });

  const { onSignUp, loading, showModel, responseMsg } = useAuth();

  useEffect(() => {
    if (showModel) {
      setVisible(true);
    }
  }, [showModel]);

  const handleSignUp = () => {
    onSignUp(baseURL.sign_up, form);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Heading */}
      <View style={styles.topBox}>
        <Text style={styles.headline}>Create an account 🔐</Text>
        <Text style={styles.text}>
          Enter your username, email and password to create an account.
        </Text>
      </View>

      {/* Signup Form */}
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
          loading = {loading}
          disable={loading}
          onPress={handleSignUp}
        />

        {/* Google Oauth */}
        <Oauth />

        {/* Redirect to Sign In */}
        <View style={styles.redirectBox}>
          <Text style={styles.redirectBoxText}>Already have an account?</Text>
          <Link href="/(auth)/sign-in" style={styles.redirectBoxLink}>
            Sign in
          </Link>
        </View>
      </View>

      {/* Success / Error Modal */}
      <Modal isVisible={visible} onBackdropPress={() => setVisible(false)}>
        <View style={styles.modelBox}>
          <Text style={styles.headline}>
            {responseMsg.success ? "🎉 Success" : "❌ Error"}
          </Text>
          <Text style={{ fontFamily: "Jakarta-Medium", marginTop: 8 }}>
            {responseMsg.message}
          </Text>
          <TouchableOpacity onPress={() => setVisible(false)} style={{ marginTop: 20 }}>
            <Text style={{ color: colors.primary[600], fontWeight: "600" }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  modelBox: {
    minHeight: 200,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SignUp;
