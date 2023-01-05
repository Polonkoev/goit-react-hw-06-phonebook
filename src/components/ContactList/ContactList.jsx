import { ContactItem } from 'components/ContactItem/ContactItem';
import { useDispatch, useSelector } from 'react-redux';
import css from './ContactList.module.css';
import { deleteContacts } from 'redux/contacts/contactsSlise';

export const ContactList = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filterItem = useSelector(state => state.filter.filter);
  const dispatch = useDispatch();

  const renderContacts = () => {
    const renderedContacts = contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(filterItem.trim().toLowerCase());
    });
    return renderedContacts;
  };
  const render = renderContacts();

  const deleteContact = id => {
    dispatch(deleteContacts(id));
  };

  return (
    <ul className={css.list}>
      {render.map(a => {
        return (
          <li key={a.id}>
            <ContactItem
              name={a.name}
              number={a.number}
              itemKey={a.id}
              deleteContact={deleteContact}
            />
          </li>
        );
      })}
    </ul>
  );
};
