import { PortalHost } from '@gorhom/portal';
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BottomTabNavigator from './BottomTabNavigation';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator()
const DrawerNavigation = () => {
    return (
        <View style={{flex:1, width:'100%'}} >
            <Drawer.Navigator
                initialRouteName='Main'
                screenOptions={{
                    drawerStyle:{
                        width: 300,
                        zIndex: 2000
                    },
                }}
                drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
                <Drawer.Screen 
                    name="Main"
                    component={BottomTabNavigator}
                    options={{
                        headerShown:false
                    }}
                />
            </Drawer.Navigator>
            <PortalHost name="bottomSheetPortal" />
        </View>
    )
}

export default DrawerNavigation

const styles = StyleSheet.create({})
