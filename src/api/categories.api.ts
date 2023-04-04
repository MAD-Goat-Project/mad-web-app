import { api } from './configs/axiosConfig';

const get = async () => {
  try {
    const { data } = await api().get('/categories');
    return data;
  } catch (error) {
    console.error(error);
  }
};

const Categories = {
  get,
};

export default Categories;
