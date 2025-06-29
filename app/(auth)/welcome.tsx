import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants/images";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../../assets/colors";
import CustomButton from "../../components/CustomButton";
import { router } from 'expo-router';
import { icons } from "../../constants/icons";

const Welcome = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Welcome headline and description */}
      <View style={styles.topWelcomeWrapper}>
        <Image source={icons.logo} style = {styles.logo} />
        <Text style={styles.headline}>Welcome to Tourvisto</Text>
        <Text style={styles.description}>
          Discover and explore the world&apos;s most beautiful destinations with ease.
        </Text>
      </View>

      {/* Image */}
      <View style={styles.imageContainer}>
        <Image 
          source={images.welcome1} 
          style={styles.image} 
          resizeMode="contain"
        />
      </View>

      {/* Bottom section */}
      <View style={styles.bottomWrapper}>
        <CustomButton
          title={"Let's get started"}
          iconRight
          onPress={() => router.replace("/(auth)/sign-in")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingVertical: 32,
    // justifyContent: "",
  },
  logo : {
    width : 30,
    height : 30,
    objectFit : "contain"
  },
  topWelcomeWrapper: {
    marginBottom: 24,
  },
  headline: {
    fontFamily: "Jakarta-Bold",
    fontSize: 28,
    color: colors.primary[600],
    marginBottom: 8,
  },
  description: {
    fontFamily: "Jakarta-Medium",
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 600,
  },
  bottomWrapper: {
    marginTop: 24,
    alignItems: "center",
  },
  text: {
    color: "#21618c",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Welcome;
