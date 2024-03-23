import { lessonsApi } from '../configs/axiosConfig';
import { AxiosResponse } from 'axios';
import { ICategory } from '../../models/category.interface';

const CATEGORIES_BASE_ENDPOINT = '/categories';

async function get() {
  return lessonsApi().get(CATEGORIES_BASE_ENDPOINT);
}

async function getCategoryId(
  name: string
): Promise<AxiosResponse<ICategory[]>> {
  return lessonsApi().get(`${CATEGORIES_BASE_ENDPOINT}?name=${name}`);
}

const CategoriesAPI = {
  get,
  getCategoryId,
};

export default CategoriesAPI;
