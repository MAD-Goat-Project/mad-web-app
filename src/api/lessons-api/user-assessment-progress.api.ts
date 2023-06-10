import { lessonsApi } from '../configs/axiosConfig';
import { AxiosResponse } from 'axios';
import {
  AssessmentStatus,
  IUserAssessmentProgress,
} from '../../models/user-assessment-progress.interface';

const USER_PROGRESS_BASE_ENDPOINT = '/assessment-progress';

async function get(
  userId: string,
  assessmentId: number
): Promise<AxiosResponse<IUserAssessmentProgress>> {
  return lessonsApi().get(
    `${USER_PROGRESS_BASE_ENDPOINT}/user/${userId}/assessment/${assessmentId}`
  );
}

async function patch(
  userId: string,
  lessonId: number,
  status: AssessmentStatus
): Promise<AxiosResponse<IUserAssessmentProgress>> {
  return lessonsApi().patch(USER_PROGRESS_BASE_ENDPOINT, {
    user_id: userId,
    lesson_id: lessonId,
    status,
  });
}

async function post(
  userId: string,
  assessmentId: number,
  status: AssessmentStatus
): Promise<AxiosResponse<IUserAssessmentProgress>> {
  return lessonsApi().post(USER_PROGRESS_BASE_ENDPOINT, {
    user_id: userId,
    assessment_id: assessmentId,
    status,
  });
}
const UserAssessmentAPI = {
  get,
  patch,
  post,
};
export default UserAssessmentAPI;
