import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, {useEffect} from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./state/store";
import { useAddContactMutation } from "./services/api/contact/contactAPIslice";
import { NavProps } from "./types/navigationTypes";

function MainScreen({navigation}:NavProps):React.JSX.Element {

    const dataContact = useSelector((state:RootState) => state.contact)
    const dispatch = useDispatch<AppDispatch>();

    const [addContact, resultAddContact] = useAddContactMutation();

    useEffect(() => {
        console.log(dataContact);
    },[])


    return (
        <SafeAreaView>
            <View>
                <Text>MainScreen</Text>
            </View>
        </SafeAreaView>
    );
}

export default MainScreen;