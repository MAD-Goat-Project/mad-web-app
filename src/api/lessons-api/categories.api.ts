import { lessonsApi } from '../configs/axiosConfig';

//TODO: The API files should contain only the API calls, not the logic

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
