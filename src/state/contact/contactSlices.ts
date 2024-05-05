import { createSlice } from "@reduxjs/toolkit"

export type Contact = {
    firstName:string,
    lastName:string,
    age:number,
    photo:string,
    id:string
}

const initialState: Contact[] = [];

export const contactSlices = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        addAllContact: (state,action) => {
            return action.payload;
        },
        addContact: (state,action) => {
            state.push(action.payload);
            return state;
        },
        deleteContact: (state,action) => {

            let dataFilter = state.filter(function (contact) {
                return contact.id != action.payload.id;
            })

            state = dataFilter;
            return state;
        },
        updateContact: (state,action) => {
            let updatedData = action.payload;
            let index = state.map(contact => contact.id).indexOf(updatedData.id);
            state[index] = updatedData; 
            return state;
        }
    }

})

export const { addContact, deleteContact, updateContact, addAllContact } = contactSlices.actions;
export default contactSlices.reducer;
