import { Image, StyleSheet, Text, TouchableOpacity, } from 'react-native'
import React from 'react'
import { colors } from '../assets/colors'
import { icons } from '../constants/icons'
import { customButtonType } from '../types/type'
/**
 * CustomButton component renders a button with optional left and right icons.
 *
 * @param {boolean} iconLeft - If true, displays the left icon.
 * @param {boolean} iconRight - If true, displays the right icon.
 * @param {string} title - The text to display on the button.
 * @param {() => void} onPress - Function to call when the button is pressed.
 */
const CustomButton = ({
  iconLeft = false,
  iconRight = false,
  title,
  onPress,
  disable = false,
  loading = false
}: customButtonType) => {
  return (
    <TouchableOpacity disabled={disable} onPress={onPress} style={styles.backGround}>
      {iconLeft && <Image source={icons.leftArrow} style={styles.icons} tintColor={"#fff"} />}
      {loading ?
        <Image
          source={icons.loader}
          width={28}
          height={28}
          tintColor={"#fff"}
        />
        :
        <Text style={styles.text}>
          {title}
        </Text>
      }
      {iconRight && <Image source={icons.rightArrow} style={styles.icons} tintColor={"#fff"} />}
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  backGround: {
    backgroundColor: colors.primary[600],
    gap: 10,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },

  icons: {
    width: 28,
    height: 28,
    marginTop: 7
  },

  text: {
    color: "white",
    fontFamily: "Jakarta-SemiBold",
    fontSize: 18
  }
})