import { api } from './configs/axiosConfig';

async function get() {
  return api().get('/categories');
}

const Categories = {
  get,
};

export default Categories;
