import css from './Text.module.css';

const Text = ({ text }) => {
  return <p className={css.endCollection}>{text}</p>;
};

export default Text;
