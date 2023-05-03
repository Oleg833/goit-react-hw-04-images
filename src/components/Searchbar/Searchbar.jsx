import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInput = event => {
    setQuery(event.target.value.toLowerCase());
  };
  const handleOnSubmit = event => {
    event.preventDefault();

    if (!query.trim()) {
      alert('Please enter a query');
      return;
    }
    onSubmit(query.trim());
    setQuery('');
  };
  return (
    <header className={css.searchbar}>
      <form onSubmit={handleOnSubmit} className={css.form}>
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
          value={query}
          onChange={handleInput}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
