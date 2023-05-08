import { createContext } from "react";

export const ContactContext = createContext({
    loading: false,
    setLoading: () => { },
    contact: {},
    setContacts: () => { },
    contacts: [],
    /* errors:[],*/
    filteredContacts: [],
    contactQuery: {},
    groups: [],
    setFilteredContacts: () => { },
    onContactChange: () => { },
    deleteContact: () => { },
    updateContact: () => { },
    createContact: () => { },
    contactSearch: () => { },
})