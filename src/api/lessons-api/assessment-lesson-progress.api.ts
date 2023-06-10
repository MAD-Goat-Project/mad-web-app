import { lessonsApi } from '../configs/axiosConfig';
import { AxiosResponse } from 'axios';

// TODO: remove hard coding of URL assessment-progress
enum AssessmentStatus {
  NOT_STARTED = 0,
  IN_PROGRESS = 1,
  COMPLETED = 2,
}
export interface IUserAssessmentProgress {
  id: number;
  user_id: string;
  status: AssessmentStatus;
}
async function get(
  userId: string,
  assessmentId: number
): Promise<AxiosResponse<IUserAssessmentProgress>> {
  return lessonsApi().get(
    `/assessment-progress/user/${userId}/assessment/${assessmentId}`
  );
}

async function patch(
  userId: string,
  lessonId: number,
  status: AssessmentStatus
): Promise<AxiosResponse<IUserAssessmentProgress>> {
  return lessonsApi().patch('/assessment-progress', {
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
  return lessonsApi().post('/assessment-progress', {
    user_id: userId,
    assessment_id: assessmentId,
    status,
  });
}
const UserAssessmentAPI = {
  get,
  post,
};
export default UserAssessmentAPI;
