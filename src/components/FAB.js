import React, {useEffect, useState, useRef} from 'react'
import { StyleSheet, Pressable } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withSequence, Easing} from 'react-native-reanimated'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useDrawerStatus } from '@react-navigation/drawer';

const FAB = ({isTweet=true, text}) => {
    // const [isTweet, setIsTweet] = useState(true)
    const animatedScale = useSharedValue(1)
    const animatedRotation = useSharedValue(0)
    const isInitialRender = useRef(true)
    const {colors} = useTheme()
    
    useEffect(() => {
        if(!isInitialRender.current){
            animatedScale.value = withSequence(withTiming(1.3, {duration:60}), withTiming(1, {duration:60}))
            animatedRotation.value = isTweet ? 0 : 180
        }else{
            isInitialRender.current = false
        }
    }, [isTweet])



    const style = useAnimatedStyle(()=>({
        transform: [{scale: animatedScale.value}, {rotate: withTiming(animatedRotation.value + 'deg', {duration:120, easing: Easing.bezier(0.465, 0.183, 0.153, 0.946)})}]
    }))


    return (
        <Animated.View style={[style, {position: 'absolute', right:20, bottom: 70,}]} >
            <Pressable style={[styles.container, {backgroundColor : colors.primary}]} >
                {
                    isTweet ?
                    <MaterialCommunityIcons name="feather" size={30} color="white" />
                    :
                    <MaterialIcons name="messenger" size={24} color="white" style={{transform:[{rotate: '-180deg'}]}} />

                }
            </Pressable>
        </Animated.View>
    )
}

export default FAB

const styles = StyleSheet.create({
    container:{
        width: 60,
        height: 60,
        borderRadius: 70,
        elevation:3 ,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:1
    }
})
