import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react"
import {View, Text} from "react-native"
import { NavProps } from "./types/navigationTypes";
function SplashScreen({navigation}:NavProps) {

    useEffect(() => {
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
            });
           },3000)
    }, [])

    return (
        <View>
            <Text>SplashScreen</Text>
        </View>
    );
}

export default SplashScreen;