import { lessonsApi } from '../configs/axiosConfig';
import { AxiosResponse } from 'axios';
import {
  IUserLessonProgress,
  LessonStatus,
} from '../../models/user-lesson-progress.interface';

const LESSON_PROGRESS_BASE_ENDPOINT = '/lesson-progress';

async function get(
  userId: string,
  lessonId: number
): Promise<AxiosResponse<IUserLessonProgress>> {
  return lessonsApi().get(
    `${LESSON_PROGRESS_BASE_ENDPOINT}/user/${userId}/lesson/${lessonId}`
  );
}

async function patch(
  id: number,
  userId: string,
  lessonId: number,
  status: LessonStatus
): Promise<AxiosResponse<IUserLessonProgress>> {
  return lessonsApi().patch(`${LESSON_PROGRESS_BASE_ENDPOINT}/${id}`, {
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
  return lessonsApi().post(LESSON_PROGRESS_BASE_ENDPOINT, {
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
