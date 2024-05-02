import { createSlice } from "@reduxjs/toolkit"

interface Contact {
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
        addContact: (state,action) => {
            state.push(action.payload);
        },
        deleteContact: (state,action) => {

            let dataFilter = state.filter(function (contact) {
                return contact.id != action.payload.id;
            })

            state = dataFilter;
        },
        updateContact: (state,action) => {
            let updatedData = action.payload;
            let index = state.map(contact => contact.id).indexOf(updatedData.id);
            state[index] = updatedData; 
        }
    }

})

export const { addContact, deleteContact, updateContact } = contactSlices.actions;
export default contactSlices.reducer;
