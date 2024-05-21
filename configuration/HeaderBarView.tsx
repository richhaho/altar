import React, { FC, ReactNode } from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
// import { LinearGradient } from "expo-linear-gradient"

type Props = {
  title: string,
  backButton?: boolean,
  onBack?: () => void,
  rightView?: ReactNode,
}

const HeaderBarView: FC<Props> = ({
  title,
  backButton = true,
  onBack,
  rightView,
}) => {
    const navigation = useNavigation();

    const goThere = () => {
        navigation.goBack()
    }
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity
          disabled={!backButton}
          style={styles.backButton}
          onPress={goThere}
        >
          {backButton &&
            <Image
              source={require('../assets/images/icon_back2.jpeg')}
              style={styles.backIcon}
            />
          }
        </TouchableOpacity>
        <Text style={{flex: 1, fontSize: 24, color: 'black', fontWeight: 'bold', marginHorizontal: '35%', alignContent: 'center', textAlign: 'center', position: 'absolute'}}>
          {title}
        </Text>
        {rightView}
      </View>
      <View style={styles.shadowSeparator} />
      {/* <LinearGradient
        colors={["#0000003f", "#00000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 1]}
        style={styles.shadowSeparator}
      /> */}
    </View>
  )
}

export default HeaderBarView

const styles = StyleSheet.create({
  wrapper: {
    height: 56,
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 56,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 50,
    height: 50,
  },
  shadowSeparator: {
    width: '100%',
    height: 0,
    backgroundColor: '#0003'
  }
})
