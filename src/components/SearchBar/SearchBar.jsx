import React, { useState } from 'react';
import toast from 'react-hot-toast';
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      toast.error('Please enter a search query');
    } else {
      onSubmit(searchQuery);
    }
  };

  return (
    <header className={styles.searchBarContainer}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.searchInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
