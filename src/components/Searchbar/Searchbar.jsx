import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { Component } from 'react';
import { FiSearch } from 'react-icons/fi';

class Searchbar extends Component {
  state = {
    query: '',
  };
  handleInput = event => {
    this.setState({ query: event.target.value.toLowerCase() });
  };
  handleOnSubmit = event => {
    event.preventDefault();
    if (!this.state.query) {
      alert('Please enter a query');
      return;
    }
    // console.log(this);
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.handleOnSubmit} className={css.form}>
          <button type="submit" className={css.formBtn}>
            <FiSearch size={30} stroke="#0f1a5d" />
          </button>

          <input
            className={css.formInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
            value={this.state.query}
            onChange={this.handleInput}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
