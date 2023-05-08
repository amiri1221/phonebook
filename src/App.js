import {useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import './App.css';
import { ContactContext } from './context/contactContext';
import _ from 'lodash'
import Navbar from './components/Navbar';
import { Contacts, EditContact, ViewContact, AddContact } from './components';
import { getAllContacts, getAllGroups, createContact, deleteContact } from './services/contactService'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CURRENTLINE, PURPLE, YELLOW, FOREGROUND, COMMENT } from './helpers/Colors';
import { useImmer } from 'use-immer'
import { ToastContainer,toast } from 'react-toastify';
const App = () => {
  const [loading, setLoading] = useImmer(false)
  const [contacts, setContacts] = useImmer([]);
  const [filteredContacts, setFilteredContacts] = useImmer([]);
  const [groups, setGroups] = useImmer([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();
        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);

      }
    };
    fetchData();
  }, []);
  const createContactForm = async values => {
    try {
      setLoading((draf) => !draf)
      // await contactSchema.validate(contact, { abortEarly: false });
      const { status, data } = await createContact(values);
      if (status === 201) {
        toast.success("مخاطب ایجاد شد");
        setContacts((draf) => {
          draf.push(data)
        })
        setFilteredContacts((draf) => {
          draf.push(data)
        })
        setLoading((prevloadinng) => !prevloadinng)
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message)
      // console.log(err.inner)
      setLoading((prevloadinng) => !prevloadinng)
    }
  }
  const confirmDelete = (contactId, contactfullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div dir="rtl" style={{ backgroundColor: CURRENTLINE, border: `1px solid ${PURPLE}` }} className="p-4">
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>مطئنی که میخوای {contactfullname} پاک کنی</p>

            <button onClick={() => {
              removecontact(contactId);
              onClose();
              
            }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >مطمئن هستم</button>
            <button onClick={onClose} className="btn" style={{ backgroundColor: COMMENT }}>نه نیستم</button>
          </div>
        )
      }
    })
  }
  const removecontact = async (contactId) => {
    const allcontacts = [...contacts]
    try {
      setContacts((draf) => draf.filter((c) => c.id !== contactId))
      setFilteredContacts((draf) => draf.filter((c) => c.id !== contactId))
      const { status } = await deleteContact(contactId)
       toast.error("مخاطب با موفقیت حذف شد")

      if (status !== 200) {
        setContacts(allcontacts);
        setFilteredContacts(allcontacts)
      }
    } catch (err) {
      console.log(err.message)
      setContacts(allcontacts);
      setFilteredContacts(allcontacts)
    }
  }
 
  const contactSearch = _.debounce((query) => {
    if (!query) return setFilteredContacts([...contacts])

    setFilteredContacts((draf)=> draf.filter((c)=>
     c.fullname.toLowerCase().includes(query.toLowerCase())
    ))

  }, 1000)
  return (
    <ContactContext.Provider value={{
      loading,
      setLoading,
      setContacts,
      contacts,
      filteredContacts,
      groups,
      setFilteredContacts,
      deleteContact: confirmDelete,
      createContact: createContactForm,
      contactSearch,
    }}>
      <div className="App">
        <ToastContainer rtl={true} theme="colored" />
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to="/contacts" />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/contacts/add' element={<AddContact />} />
          <Route path='/contacts/:contactId' element={<ViewContact />} />
          <Route path='/contacts/edit/:contactId' element={<EditContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>

  );
}
export default App;
