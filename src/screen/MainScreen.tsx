import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, {useEffect, useState} from "react";
import { View, FlatList, StyleSheet, Animated, Text, ScrollView, TouchableOpacity, ToastAndroid, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { NavProps } from "../types/navigationTypes";
import { GetResponseData, contactAPI } from "../services/api/contact/contactAPIslice";
import { AxiosError, AxiosResponse } from "axios";
import { Contact, addAllContact, deleteContact } from "../state/contact/contactSlices";
import CardContact from "../component/CardContact";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import CustomLoading from "../component/CustomLoading";
import { CColor } from "../theme/CColor";
import Modal from 'react-native-modal';

function MainScreen({navigation}:NavProps):React.JSX.Element {

    const dataContact = useSelector((state:RootState) => state.contact)
    const dispatch = useDispatch<AppDispatch>();

    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteShow, setIsDeleteShow] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const initialData = {
        firstName: "",
        lastName: "",
        age: 0,
        photo: "",
        id: ""
    };

    const [dataDelete, setDataDelete] = useState(initialData)

    useEffect(() => {
        setIsLoading(true);
        getData();
    },[])

    const onRefresh = React.useCallback(() => {
        setIsRefreshing(true);
        getData();
      }, []);

    const getData = () => {
        
        contactAPI.getContact().then((response:AxiosResponse<GetResponseData>) => {
            setIsLoading(false);
            setIsRefreshing(false);

            if (response.status == 200) {
                let respData = response.data;

                if (respData.message == "Get contacts") {
                   let data = respData.data;
                   
                   dispatch(addAllContact(data));
                } else {
                    console.log("Failed get new data");
                }

            } else {
                console.log("Failed get new data");
            }
            
        });
    }

    const deleteData = () => {
        setIsDeleteShow(false)
        setIsLoading(true);

        // This is command because when i try in sample swagger return error 400

        contactAPI.deleteContact(dataDelete.id).then((value) => {
            setIsLoading(false)
            setDataDelete(initialData)
            dispatch(deleteContact(dataDelete));
        }).catch((error:AxiosError) => {
            setDataDelete(initialData)
            setIsLoading(false);
            ToastAndroid.show("Failed to delete contact from server", ToastAndroid.LONG);
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex:1, backgroundColor: CColor.main}}>
                <CustomLoading isShow={isLoading} />
                <ScrollView contentContainerStyle={dataContact.length == 0 ? styles.noDataContainer : styles.haveDataContainer} 
                    refreshControl={
                        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
                    }
                >
                    {isLoading ? <View/> : dataContact.length == 0 ? 
                    <View style={{alignItems: 'center'}}>
                        <FAIcon name="close" size={50} color={"#ff0000"}/>
                        <Text style={styles.textNoData}>{"Data Contact Tidak Ada"}</Text>
                    </View> : 
                    dataContact.map((contact,index) => (
                        <CardContact key={index} data={contact} 
                        onPress={() => {
                            navigation.navigate("DetailContact", contact);
                        }} 
                        onIconDeletePressed={() => {
                            setDataDelete(contact)
                            setIsDeleteShow(true)

                        }}
                        onIconUpdatePressed={() => {
                            navigation.navigate("UpdateContact", contact);
                        }}/>
                    ))}
                </ScrollView>

                {/* FAB */}
                <TouchableOpacity style={styles.containerFAB} 
                    activeOpacity={.8} 
                    onPress={() => {
                        navigation.navigate("AddContact")
                }}>
                    <MaterialIcon size={30} color={CColor.secondary} name={"add"}/>
                </TouchableOpacity>

                {/* Modal Delete */}
                <Modal isVisible={isDeleteShow}
                    onBackdropPress={() => {
                        setDataDelete(initialData);
                        setIsDeleteShow(false);
                    }}
                    onBackButtonPress={() => {
                        setDataDelete(initialData);
                        setIsDeleteShow(false);
                    }}>
                <View>
                    <View style={{
                         borderRadius: 10,
                         backgroundColor: CColor.secondary, 
                         padding: 20, 
                         justifyContent: 'center',
                         alignItems: 'center'
                    }}>

                        <Text style={{fontSize: 20, color: CColor.text}}>{`Apakah Anda ingin menghapus data kontak ${dataDelete.firstName}`}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => {setIsDeleteShow(false)}} style={styles.buttonDialogDelete}>
                                <Text>Tidak</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteData() } style={[styles.buttonDialogDelete, {backgroundColor: CColor.red}]}>
                                <Text style={{color: CColor.text}}>Ya</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    haveDataContainer: {
        flexGrow: 1
    },
    textNoData: {
        fontSize: 18,
        color: CColor.text,
        fontWeight: 'bold'
    },
    containerFAB : {
        position: 'absolute',
        bottom: 30,
        right: 30,
        borderRadius: 100,
        padding: 15,
        backgroundColor: "#FFFFFF"
    },
    buttonDialogDelete: {
        paddingVertical: 15,
        backgroundColor: CColor.text,
        marginRight: 15,
        borderRadius: 10,
        width: 80,
        alignItems: 'center',
        marginTop: 15
    },
})

export default MainScreen;