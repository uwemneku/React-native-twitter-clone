import { useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const RadioButton = ({isSelected=true}) => {
    const {colors} = useTheme()
    return (
        <View style={[styles.circle, {borderWidth:1, borderColor: colors.primary}]} >
            <View style={[styles.circle, {transform:[{scale: 0.5}], backgroundColor: isSelected ? colors.primary : white}]} />
        </View>
    )
}

export default RadioButton

const styles = StyleSheet.create({
    circle:{
        width:25,
        height: 25,
        borderRadius: 300,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        
    }
})
