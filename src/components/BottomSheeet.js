import React, { useEffect } from 'react'
import { StyleSheet, Text, View, useWindowDimensions, Dimensions, Pressable } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import Avatar from './Avatar';

const BottomSheeet = ({ children, minDistanceToClose = 100, close }) => {
    const translateY = useSharedValue(500)
    const y = useWindowDimensions().height

    useEffect(() => {
        const timer = setTimeout(() => {
            translateY.value = 0
        }, 100);
        return () => clearTimeout(timer)
    }, [])

    const handleClose = () => {
        console.log(678);
        translateY.value = withTiming(500, { duration: 250 }, (isFinished) => { isFinished && runOnJS(close)(false) })
    }

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.start = translateY.value
        },
        onActive: (_, ctx) => {
            if (translateY.value > -30) {
                translateY.value = _.translationY + ctx.start
            }
        },
        onEnd: (_) => {
            if (_.velocityY > 1200 || translateY.value > minDistanceToClose) {
                translateY.value = 500
                runOnJS(close)(false)
            } else {
                translateY.value = 0
            }
        }
    })
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: withSpring(translateY.value) }]
    }))
    return (
        <View childern style={styles.container} >
            <Pressable style={{ flex: 1, width:'100%' }} onPress={handleClose} />
            <PanGestureHandler onGestureEvent={gestureHandler} >
                <Animated.View style={[styles.animatedView, animatedStyle]} >
                    <View style={styles.bar} />
                    {children}
                </Animated.View>
            </PanGestureHandler>
        </View>
    )
}

export default BottomSheeet

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        height: Dimensions.get('window').height,
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(2, 2, 2, 0.3)',
        flex:1
    },
    bar: {
        width: 50,
        height: 10,
        marginTop: 10,
        marginBottom: 40,
        borderRadius: 20,
        backgroundColor: 'black',
        alignSelf: 'center'
    },
    animatedView: {
        backgroundColor: 'white',
        borderTopEndRadius: 50,
        borderTopLeftRadius: 50,
        paddingBottom: 100,
        marginBottom: -100,
        width: Dimensions.get('screen').width,
        maxWidth: Dimensions.get('screen').width
    }
})
