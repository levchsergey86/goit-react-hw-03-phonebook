import React from 'react';
import PropTypes from 'prop-types';
import styled from '../ContactListItem/ContactListItem.module.css';

const ContactListItem = ({ contact, deleteContact }) => {
  return (
    <li className={styled.listItem} key={contact.id}>
      {contact.name} - {contact.number}{' '}
      <button
        className={styled.deleteButton}
        onClick={() => deleteContact(contact.id)}
      >
        Delete Contact
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactListItem;
