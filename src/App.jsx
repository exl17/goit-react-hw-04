import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const galleryRef = useRef(null);

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

      if (page === 1) {
        setImages(data.results);
      } else {
        setImages(prevImages => [...prevImages, ...data.results]);
      }
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, page]);

  const handleLoadMore = (e) => {
    e.preventDefault();
    setPage(prevPage => prevPage + 1);
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  };

  const handleOpenModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setModalIsOpen(false);
  };

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleSubmit = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <Toaster />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && 
        <ImageGallery 
          images={images} 
          ref={galleryRef} 
          onImageClick={handleOpenModal}
        />
      }
      {!loading && !error && images.length > 0 && <LoadMoreBtn onClick={handleLoadMore} />}
      <ImageModal
        isOpen={modalIsOpen} 
        onRequestClose={handleCloseModal} 
        image={selectedImage} 
      />
    </div>
  );
};

export default App;
