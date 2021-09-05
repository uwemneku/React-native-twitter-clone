import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import Avatar from './Avatar'
import { Fontisto, SimpleLineIcons } from '@expo/vector-icons';
import Typography from './Typography';
import { useTheme } from '@react-navigation/native';

const AppHeader = ({route}) => {
    const isHome = route.name === 'Home'
    const {colors} = useTheme()
    return (
        <View style={styles.container}>
            <Avatar size={40} />

            <View style={{flex: 1, alignItems:'center'}} >
                {isHome && <Fontisto name="twitter" size={24} color={colors.primary} />}
                {
                   (route.name === 'Messages'  || route.name === 'Search') &&
                    <View style={[styles.textInput, {backgroundColor:colors.card}]} >
                        <Typography 
                            text={route.name === 'Search' ? 'Search Twitter' : 'Search for people and groups'} 
                            fontSize={13}
                        />
                    </View>
                }
                {route.name === 'Notifications' && <Typography text='Notifications' bold fontSize={20} /> }
            </View>

            <View>
                {
                    isHome ?
                        <Avatar bgColor='white' size={40} text={<Fontisto name="star-half" size={24} color="black" />} />
                        :
                        <Avatar bgColor='white' size={40} text={<SimpleLineIcons name="settings" size={24} color="black" />} />
                        
                }
            </View>
        </View>
    )
}

export default AppHeader

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        width: Dimensions.get('screen').width,
        backgroundColor: 'white'
    },
    textInput:{
        backgroundColor:'gray',
        width:'80%',
        justifyContent:'center',
        flex: 1,
        padding: 10,
        borderRadius: 100
    }
})
