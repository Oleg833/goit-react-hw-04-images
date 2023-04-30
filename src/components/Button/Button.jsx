import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ loadMore }) => {
  return (
    <div className={css.btnBox} onClick={loadMore}>
      <button type="button" className={css.btn}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func,
};

export default Button;
