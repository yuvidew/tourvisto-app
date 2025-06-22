import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../../assets/colors'
import InputField from './_components/InputField'
import CustomButton from '../../components/CustomButton'
import Oauth from './_components/Oauth'
import { Link } from 'expo-router'

const SignUp = () => {
  const [form, setForm] = useState({
    username : "",
    email: "",
    password: ""
  })
  return (
    <SafeAreaView style={styles.container}>
      {/* start to top heading */}
      <View style={styles.topBox}>
        <Text style={styles.headline}>
          Create an account 🔐
        </Text>
        <Text style={styles.text}>
          Enter your username, email and password to create an account.
        </Text>
      </View>
      {/* end to top heading */}

      {/* start to sign in form  */}
      <View style={styles.formBox}>
        <InputField
          label='Username'
          placeholder='Enter your username..'
          value={form.username}
          textContentType="name"
          onChangeText={(value) => setForm({ ...form, username: value })}
        />

        <InputField
          label='Email id'
          placeholder='Enter your email..'
          value={form.email}
          textContentType="emailAddress"
          onChangeText={(value) => setForm({ ...form, email: value })}
        />

        <InputField
          label='Password'
          placeholder='Enter your password..'
          value={form.password}
          textContentType="password"
          onChangeText={(value) => setForm({ ...form, password: value })}
          isPassword
        />

      </View>
      <CustomButton title='Sign Up' />
      {/* end to sign in form  */}

      {/* start to Google Oauth */}
      <Oauth />
      {/* end to Google Oauth */}

      <View style={styles.redirectBox}>
        <Text style={styles.redirectBoxText} >Already have an account?</Text>
        <Link href={"/(auth)/sign-in"} style={styles.redirectBoxLink} >Sign in</Link>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingVertical: 32,
    height: "100%",
    flexDirection: "column",
    gap: 45,

  },

  topBox: {
    flexDirection: "column",
    gap: 6
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
    fontSize: 18
  },

  formBox: {
    flexDirection: "column",
    gap: 25
  },

  redirectBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3
  },

  redirectBoxText: {
    fontFamily: "Jakarta-Medium",
  },
  redirectBoxLink: {
    fontFamily: "Jakarta-Medium",
    color: colors.primary[700]
  }
})

export default SignUp