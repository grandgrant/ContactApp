import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react"
import {View, Text, StyleSheet} from "react-native"
import { NavProps } from "../types/navigationTypes";
import { CColor } from "../theme/CColor";
function SplashScreen({navigation}:NavProps) {

    useEffect(() => {
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
            });
           },1000)
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>{"Contact Apps"}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: CColor.main
    },
    mainText : {
        fontSize: 30,
        fontWeight: 'bold',
        color: CColor.black
    }
})

export default SplashScreen;