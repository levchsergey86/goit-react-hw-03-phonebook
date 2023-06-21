import React from 'react';
import PropTypes from 'prop-types';
import styled from '../ContactForm/ContactForm.module.css';

class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    if (event.target.name === 'name') {
      this.setState({ name: event.target.value });
    } else if (event.target.name === 'number') {
      this.setState({ number: event.target.value });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    this.props.addContact(name, number);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <h3>Name:</h3>
            <input
              type="text"
              name="name"
              pattern="^[A-Za-z\u0080-\uFFFF ']+$"
              title="Name may contain only letters, apostrophe, dash and spaces.For example Adrian, Jacob Mercer"
              required
              value={name}
              onChange={this.handleChange}
              className={styled.input}
            />
          </div>
          <div>
            <h3>Number:</h3>
            <input
              type="number"
              name="number"
              pattern="^(\+?[0-9.\(\)\-\s]*)$"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={this.handleChange}
              className={styled.input}
            />
            <button className={styled.AddContactButton} type="submit">
              Add contact
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default ContactForm;
