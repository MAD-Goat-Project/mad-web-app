import { lessonsApi } from '../configs/axiosConfig';

// TODO: Status should not be optional
export interface ILesson {
  id: number;
  name: string;
  description: string;
  status?: number;
}
//TODO: The API files should contain only the API calls, not the logic

async function get(category: number): Promise<ILesson[]> {
  return lessonsApi()
    .get(`/categories/${category}/lessons`)
    .then((res) => res.data);
}

const LessonsAPI = {
  get,
};
export default LessonsAPI;
