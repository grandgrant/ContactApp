import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Splash: undefined,
    Main: undefined,
    DetailContact: undefined,
    AddContact: undefined
}

export type NavProps = NativeStackScreenProps<RootStackParamList>;