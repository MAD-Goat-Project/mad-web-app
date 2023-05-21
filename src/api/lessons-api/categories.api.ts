import { lessonsApi } from '../configs/axiosConfig';

async function get() {
  return lessonsApi().get('/categories');
}
async function getCategoryId(name: string) {
  return lessonsApi()
    .get(`/categories?name=${name}`)
    .then((res) => res.data[0].id);
}

const CategoriesAPI = {
  get,
  getCategoryId,
};

export default CategoriesAPI;
