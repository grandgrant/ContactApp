import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Contact } from "../state/contact/contactSlices";

export type RootStackParamList = {
    Splash: undefined,
    Main: undefined,
    DetailContact: Contact,
    AddContact: undefined,
    UpdateContact: Contact
}

export type NavProps = NativeStackScreenProps<RootStackParamList>;