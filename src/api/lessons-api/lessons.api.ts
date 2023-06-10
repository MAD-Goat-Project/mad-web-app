import { lessonsApi } from '../configs/axiosConfig';
import { ILesson } from '../../models/lesson.interface';
import { AxiosResponse } from 'axios';

async function get(category: number): Promise<AxiosResponse<ILesson[]>> {
  return lessonsApi().get(`/categories/${category}/lessons`);
}

const LessonsAPI = {
  get,
};
export default LessonsAPI;
