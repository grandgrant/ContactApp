import React, { useEffect } from 'react';
import { View } from 'react-native';
import { NavProps } from './types/navigationTypes';
import { useAddContactMutation } from "./services/api/contact/contactAPIslice";

function AddContactScreen({navigation}:NavProps) {

    const [addContact, resultContact] = useAddContactMutation();

    useEffect(() => {

    },[])

    return (
        <View>

        </View>
    );
}

export default AddContactScreen;