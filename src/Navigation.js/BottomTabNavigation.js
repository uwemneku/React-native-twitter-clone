import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { StyleSheet, Text, Pressable, View, Dimensions } from 'react-native'
import Home from './../screens/Home';
import Search from './../screens/Search';
import Notifications from './../screens/Notifications';
import Messages from './../screens/Messages';
import FAB from '../components/FAB';
import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';
import { PortalHost, PortalProvider, Portal } from '@gorhom/portal';
import Typography from '../components/Typography';
import AppHeader from '../components/AppHeader';


const BottomTab = createBottomTabNavigator()

const screens = [
    {
        name:'Home',
        icon:(color, isFocused)=> <Ionicons name={isFocused ?"home" : "home-outline"} size={isFocused ? 30 : 24} color="black" />,
        component: Home
    },
    {
        name:'Search',
        icon:(color, isFocused)=> <Ionicons name={isFocused ?"search-sharp" : "search-outline"} size={isFocused ? 30 : 24} color="black" />,
        component: Search
    },
    {
        name:'Notifications',
        icon:(color, isFocused)=> <Ionicons name={isFocused ? "notifications-sharp" : "notifications-outline"} size={isFocused ? 30 : 24} color="black" />,
        component: Notifications
    },
    {
        name:'Messages',
        icon:(color, isFocused)=> <Feather name="message-square" size={isFocused ? 30 : 24} color="black" />,
        component: Messages
    },
]

const BottomTabNavigator = () => {
    return (
        <PortalProvider>
            <View style={styles.container} >
                <BottomTab.Navigator  
                    initialRouteName='Home'
                    screenOptions={{
                        header:({navigation, options, route}) => {
                            return <AppHeader route={route} />
                        }
                    }}
                    tabBar={({navigation, state})=>{
                        return (
                            <View style={styles.tabBarContainer }  >
                                
                                {
                                    screens.map((item, index) => {
                                        const isFocused = state.index === index
                                        const color = isFocused ? 'green' : 'gray'
                                        return (
                                            <View key={item.name}  >
                                                { index === 1 && <Portal name='FAB' ><FAB isTweet={state.index !== 3} /></Portal>}
                                                <Pressable onPress={()=>navigation.navigate(item.name)} style={{justifyContent: 'center', alignItems: 'center', padding: 10,}}>
                                                    {item.icon(color, isFocused)}
                                                </Pressable>
                                            </View>
                                        )
                                    })
                                }

                            </View>
                        )
                    }}
                >
                    {
                        screens.map(item => (
                            <BottomTab.Screen 
                                name= {item.name} 
                                component={item.component} 
                                key = {item.name}
                                options = {{
                                    tabBarIcon:()=>item.icon,
                                }}
                                
                            />
                        ))
                    }
                </BottomTab.Navigator>
                <PortalHost name="FAB" />
            </View>
        </PortalProvider>
    )
}

export default BottomTabNavigator

const styles = StyleSheet.create({
    container:{
        width : Dimensions.get('screen').width,
        flex: 1,
        backgroundColor:'red'
        
    },
    tabBarContainer:{
        backgroundColor:'white',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'relative',
        zIndex: 10,
        overflow: 'visible',
    }
})
