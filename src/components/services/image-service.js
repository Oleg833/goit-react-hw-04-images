import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '34212854-f6457ae4e5e1013dd0f507693',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

const getImages = async (query, page) => {
  const { data } = await axios.get(`?q=${query}&page=${page}`);
  return data;
};

export default getImages;
