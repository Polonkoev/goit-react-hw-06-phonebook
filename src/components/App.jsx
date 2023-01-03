import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ContactList } from './ContactList/ContactList';
import { FilterPage } from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import css from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts, deleteContacts } from 'redux/contacts/contactsSlise';
import { filterContacts } from 'redux/filter/filterSlice';

const App = () => {
  // let [filterContact, setFilterContact] = useState('');
 

  const contacts = useSelector(state => state.contacts.contacts);
  const filterItem = useSelector(state=>state.filter.filter)
  console.log(filterItem);

  const dispatch = useDispatch();

  const addNewContact = newContact => {
    const findContact = contacts.find(
      contact =>
        contact.name.toLocaleLowerCase() === newContact.name.toLocaleLowerCase()
    );
    if (findContact) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      dispatch(addContacts(newContact));
      
    }
  };

  const handleFilter = ({ target: { value } }) => {
    // setFilterContact((filterContact = value));
    dispatch(filterContacts(value));
  };

  const renderContacts = () => {
    const renderedContacts = contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(filterItem.trim().toLowerCase());
    });
    return renderedContacts;
  };

  const deleteContact = id => {
    dispatch(deleteContacts(id));
    
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm contacts={contacts} addContact={addNewContact} />

      <h2 className={css.contacts}>Contacts</h2>

      <FilterPage
        contacts={contacts}
        filter={filterItem}
        onChange={handleFilter}
      />

      <ContactList
        contactList={renderContacts()}
        deleteContact={deleteContact}
      />
    </div>
  );
};

App.propTypes = {
  addContact: PropTypes.func,
  handleFilter: PropTypes.func,
  renderContacts: PropTypes.func,
  deleteContact: PropTypes.func,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ),
};

export default App;
