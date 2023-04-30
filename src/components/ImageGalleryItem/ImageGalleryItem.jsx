import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, src, alt, largeImageURL, openModal }) => {
  return (
    <li
      key={id}
      className={css.ImageGalleryItem}
      onClick={() => openModal(largeImageURL, alt)}
    >
      <img
        src={src}
        alt={alt}
        className={css.ImageGalleryItemImage}
        loading="lazy"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
