import { useQuery } from 'react-query';
import CategoriesAPI from '../api/lessons-api/categories.api';
import { ICategory } from '../models/category.interface';

export function useCategoryList() {
  const { data, isLoading, error } = useQuery<ICategory[]>(
    'categories',
    async () => CategoriesAPI.get().then((res) => res.data)
  );

  return { categoryList: data, isLoading, error };
}
