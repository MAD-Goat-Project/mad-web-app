import { api } from './configs/axiosConfig';

export interface ILesson {
  id: number;
  name: string;
  description: string;
}
async function get(category: number): Promise<ILesson[]> {
  return api()
    .get(`/categories/${category}/lessons`)
    .then((res) => res.data);
}

const Lessons = {
  get,
};
export default Lessons;
