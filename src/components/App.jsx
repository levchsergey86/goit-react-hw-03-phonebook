import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import FilterContacts from './FilterContacts/FilterContacts';
import ContactList from './ContactList/ContactList';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import styled from './App.module.css';

class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactsFromLocalStorage = localStorage.getItem('contacts');
    if (contactsFromLocalStorage) {
      this.setState({ contacts: JSON.parse(contactsFromLocalStorage) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  deleteContact = id => {
    this.setState(
      prevState => ({
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      }),
      () => {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
    );
  };

  // addContact = (name, number) => {
  //   const { contacts } = this.state;
  //   const isContactExists = contacts.some(
  //     contact => contact.name === name || contact.number === number
  //   );

  //   if (isContactExists) {
  //     alert('Contact with the same name or number already exists.');
  //     return;
  //   }

  //   const newContact = {
  //     id: nanoid(),
  //     name: name,
  //     number: number,
  //   };

  //   this.setState(prevState => ({
  //     contacts: [...prevState.contacts, newContact],
  //   }));
  // };

  addContact = (name, number) => {
    const { contacts } = this.state;
    const isContactExists = contacts.some(
      contact => contact.name === name || contact.number === number
    );

    if (isContactExists) {
      alert('Contact with the same name or number already exists.');
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    this.setState(
      prevState => ({
        contacts: [...prevState.contacts, newContact],
      }),
      () => {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
    );
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className={styled.container}>
        <h1>PHONE BOOK</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts:</h2>
        <FilterContacts handleFilterChange={this.handleFilterChange} />
        <ContactList
          filteredContacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string.isRequired,
};

export default App;
