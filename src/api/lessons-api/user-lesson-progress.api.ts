import { lessonsApi } from '../configs/axiosConfig';
import { AxiosResponse } from 'axios';

export enum LessonStatus {
  NOT_STARTED = 0,
  IN_PROGRESS = 1,
  COMPLETED = 2,
}
export interface IUserLessonProgress {
  id: number;
  user_id: string;
  status: LessonStatus;
}
async function get(
  userId: string,
  lessonId: number
): Promise<AxiosResponse<IUserLessonProgress>> {
  return lessonsApi().get(`/lesson-progress/user/${userId}/lesson/${lessonId}`);
}

async function patch(
  id: number,
  userId: string,
  lessonId: number,
  status: LessonStatus
): Promise<AxiosResponse<IUserLessonProgress>> {
  return lessonsApi().patch(`/lesson-progress/${id}`, {
    user_id: userId,
    lesson_id: lessonId,
    status,
  });
}
async function post(
  userId: string,
  lessonId: number,
  status: LessonStatus
): Promise<AxiosResponse<IUserLessonProgress>> {
  return lessonsApi().post('/lesson-progress', {
    user_id: userId,
    lesson_id: lessonId,
    status,
  });
}

const UserProgressAPI = {
  get,
  post,
  patch,
};
export default UserProgressAPI;
