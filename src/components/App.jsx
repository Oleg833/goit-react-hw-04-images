import { useState, useEffect } from 'react';
import { animateScroll } from 'react-scroll';
import getImages from './services/image-service';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Text from './Text/Text';
import Modal from './Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [alt, setAlt] = useState('');
  const per_page = 12;

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoading(true);
    getImages(query, page)
      .then(({ hits, totalHits }) => {
        if (!hits.length) {
          setIsEmpty(true);
          return;
        }
        setImages(prevImages => [...prevImages, ...hits]);

        setShowLoadMoreBtn(page < Math.ceil(totalHits / per_page));
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  const onSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setIsEmpty(false);
    setError('');
    setShowLoadMoreBtn(false);
  };

  const loadMore = e => {
    setPage(prevPage => prevPage + 1);
    scrollOnMoreButton();
  };
  const scrollOnMoreButton = () => {
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: 'linear',
    });
  };
  const openModal = (largeImageUrl, alt) => {
    setShowModal(true);
    setLargeImageUrl(largeImageUrl);
    setAlt(alt);
  };
  const closeModal = () => {
    setShowModal(false);
    setLargeImageUrl('');
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />

      <ImageGallery images={images} openModal={openModal} />

      {showLoadMoreBtn && <Button loadMore={loadMore} />}

      {isLoading && <Loader />}

      {isEmpty && <Text text="Sorry. There are no images ... 😭" />}

      {error && <Text text={error} />}

      {!showLoadMoreBtn && images.length > 0 && (
        <Text text="No more images to load... 😭" />
      )}

      {showModal && (
        <Modal largeImageUrl={largeImageUrl} alt={alt} onClose={closeModal} />
      )}
    </>
  );
};

export default App;
