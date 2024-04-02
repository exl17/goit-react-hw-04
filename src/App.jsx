import React, { useState, useEffect, useCallback } from 'react';
import { Toaster } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      const ACCESS_KEY = 'c3uuQ34TsHAzSvIPc6LLkx3obkt0-cKHEQMfZ1pNQtE';
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=12&page=${page}&client_id=${ACCESS_KEY}`
      );
      const data = await response.json();
      if (data.errors) {
        throw new Error('Error fetching images. Please try again later.');
      }
      setImages((prevImages) => [...prevImages, ...data.results]);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (searchQuery !== '') {
      setPage(1);
      fetchImages();
    }
  }, [searchQuery, fetchImages]);

  useEffect(() => {
    if (page > 1) {
      fetchImages();
    }
  }, [page, fetchImages]);

  return (
    <div>
      <SearchBar onSubmit={setSearchQuery} />
      <Toaster />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && <ImageGallery images={images} />}
      {!loading && !error && images.length > 0 && <LoadMoreBtn onClick={handleLoadMore} />}
    </div>
  );
};

export default App;
