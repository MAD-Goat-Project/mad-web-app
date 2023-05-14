import { api } from './configs/axiosConfig';

async function get() {
  return api().get('/categories');
}
async function getCategoryId(name: string) {
  return api()
    .get(`/categories?name=${name}`)
    .then((res) => res.data[0].id);
}

const CategoriesAPI = {
  get,
  getCategoryId,
};

export default CategoriesAPI;
