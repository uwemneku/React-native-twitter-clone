import React, { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { DrawerContentScrollView, DrawerItemList, useDrawerStatus } from '@react-navigation/drawer';
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import Avatar from "../components/Avatar";
import Typography from "../components/Typography";
import { useTheme } from "@react-navigation/native";
import { FontAwesome5 } from '@expo/vector-icons';
import { Portal } from "@gorhom/portal";
import BottomSheeet from "../components/BottomSheeet";
import RadioButton from "../components/RadioButton";

const drawerContent = [
  {
    name: 'Profile',
    icon: <Ionicons name="person-outline" size={24} color="black" />
  },
  {
    name: 'List',
    icon: <Ionicons name="md-list-outline" size={24} color="black" />
  },
  {
    name: 'Topics',
    icon: <Ionicons name="chatbubble-outline" size={24} color="black" />
  },
  {
    name: 'Bookmarks',
    icon: <Ionicons name="bookmark-outline" size={24} color="black" />
  },
  {
    name: 'Moments',
    icon: <Ionicons name="flash-outline" size={24} color="black" />
  },
  {
    name: 'Monetization',
    icon: <Ionicons name="cash-outline" size={24} color="black" />
  },
]

function CustomDrawerContent(props) {
  const translateY = useSharedValue(0)
  const isDrawerOpen = useDrawerStatus() === 'open';
  const [openBottomSheet, setOpenBottomSheet] = useState(false)
  const { colors } = useTheme()
  const handleBottomSheet = () => {
      setOpenBottomSheet(true)
      props.navigation.toggleDrawer();
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withTiming(interpolate(translateY.value, [0, 1], [0, 100], Extrapolate.CLAMP), { duration: 250 }) }]
  }))

  const animatedHiddenStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withTiming(interpolate(translateY.value, [0, 1], [1000, 0], Extrapolate.CLAMP), { duration: 150 }) }]
  }))

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: interpolate(translateY.value, [0, 1], [0, 180], Extrapolate.CLAMP) + 'deg' }]
  }))

  const handleAccordionPress = () => {
    translateY.value = translateY.value === 0 ? 1 : 0
  }

  useEffect(() => {
    if (!isDrawerOpen) translateY.value = 0
  }, [isDrawerOpen])
  return (
    <View style={{ flex: 1, backgroundColor: 'white', zIndex:200 }} >
      <View style={{ padding: 10, paddingLeft: 20, borderBottomWidth: 1, borderColor: colors.border }} >
        <Avatar />

        <View style={[styles.containers, styles.accordion]} >
          <View>
            <Typography text="Izzy" bold />
            <Typography text="@Izzy" color={colors.text} />
          </View>
          <Pressable onPress={handleAccordionPress} style={{ flex: 1, alignItems: 'flex-end'}} >
            <Animated.View style={[animatedIconStyle, {justifyContent:'center'}]} >
              <Ionicons name="chevron-down" size={24} color="black" />
            </Animated.View>
          </Pressable>
        </View>

        <View style={[styles.containers, styles.following]} >
          <View style={{ flexDirection: 'row' }} >
            <Typography text='2444' bold />
            <View style={{ marginLeft: 5, marginRight: 20 }}>
              <Typography text='Following' textAlign='right' color={colors.text} />
            </View>
          </View>
          <View style={{ flexDirection: 'row' }} >
            <Typography text='2444' bold />
            <View style={{ marginLeft: 5, marginRight: 20 }}>
              <Typography text='Following' color={colors.text} />
            </View>
          </View>
        </View>
      </View>

      <View style={{ position: 'relative', flex: 1 }} >
        <DrawerContentScrollView {...props} >
          <View style={{ padding: 10, paddingLeft: 20 }} >
            {
              drawerContent.map((item, index) => {
                return (
                  <View key={index} style={[styles.containers, {marginVertical:6}]} >
                    {item.icon}
                    <View style={{marginLeft:20}} >
                      <Typography text={item.name} color='black' />
                    </View>
                  </View>
                )
              })
            }
          </View>
          <View style={{borderTopWidth:2, borderTopColor:colors.card}} />
          <View style={{padding:20}}>
            <View style={[styles.containers, {marginBottom:20}]} >
                  <Typography text='Settings & privacy' color='black' />
            </View>
            <View style={[styles.containers, {marginBottom:20}]} >
                  <Typography text='Help Center' color='black' />
            </View>
          </View>
        </DrawerContentScrollView>
        <Animated.View style={[styles.hidden, animatedHiddenStyle]} >
        <View style={{padding:20}}>
            <View style={[styles.containers, {marginBottom:20}]} >
                  <Typography text='Create a new account' color='black' />
            </View>
            <View style={[styles.containers, {marginBottom:20}]} >
                  <Typography text='Add an existing account' color='black' />
            </View>
          </View>
        </Animated.View>
      </View>

      <Animated.View style={[styles.containers, styles.footer, animatedStyle]} >
        <Pressable onPress={handleBottomSheet} >
          <Ionicons name="bulb-outline" size={30} color="black" style={{paddingVertical:10}} />
        </Pressable>
        <Pressable>
          <Ionicons name="qr-code-sharp" size={30} color="black" style={{paddingVertical:10}} />
        </Pressable>
        <Portal hostName="bottomSheetPortal"  >
          {
            openBottomSheet &&
              <BottomSheeet close={setOpenBottomSheet} minDistanceToClose={300} >
                <BottomSheetContent  />
              </BottomSheeet>
          }
        </Portal>
      </Animated.View>
    </View>
  );
}

const BottomSheetContent = () => {
  const { colors } = useTheme()
  return (
    <View>
      <View style={{padding:10}}>
        <Typography text="Dark Mode" fontSize={20} />
      </View>

      <View style={{ borderTopWidth: 2, borderTopColor: colors.card }} />

      <View style={{padding:10}} >
        <View style={[styles.containers, { justifyContent: 'space-between', marginBottom:10 }]}>
          <Typography text="off" fontSize={18} />
          <RadioButton />
        </View>
        <View style={[styles.containers, { justifyContent: 'space-between', marginBottom:10 }]}>
          <Typography text="On" fontSize={18} />
          <RadioButton />
        </View>
        <View style={[styles.containers, { justifyContent: 'space-between', marginBottom:10 }]}>
          <Typography text="Automatic at sunset" fontSize={18} />
          <RadioButton />
        </View>
      </View>
      
      <View style={{ borderTopWidth: 2, borderTopColor: colors.card }} />
      <View style={{padding:10}}>
        <Typography text="Dark theme" fontSize={20} />
        <View style={{padding:10}} >
          <View style={[styles.containers, { justifyContent: 'space-between', marginBottom:10 }]}>
            <Typography text="Dim" fontSize={18} />
            <RadioButton />
          </View>
          <View style={[styles.containers, { justifyContent: 'space-between', marginBottom:10 }]}>
            <Typography text="Lights out" fontSize={18} />
            <RadioButton />
          </View>
        </View>
      </View>
    </View>
  )
}

export default CustomDrawerContent

const styles = StyleSheet.create({
  containers: {
    flexDirection: 'row',
    alignItems:'center',
    paddingVertical: 8,
  },
  footer: {
    elevation: 2,
    zIndex: 40,
    bottom: 0,
    height: 50,
    padding: 10,
    paddingVertical: 20,
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hidden: {
    position: 'absolute',
    top: 0,
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    height: Dimensions.get('screen').height,
  },
  accordion: {
  },
  following: {
  }
})