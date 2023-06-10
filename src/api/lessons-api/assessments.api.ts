import { lessonsApi } from '../configs/axiosConfig';
import { IAssessment } from '../../models/assessment.interface';
import { AxiosResponse } from 'axios';

const LESSONS_BASE_ENDPOINT = '/lessons';

async function get(lessonId: number): Promise<AxiosResponse<IAssessment[]>> {
  return lessonsApi().get(`${LESSONS_BASE_ENDPOINT}/${lessonId}/assessments/`);
}

const AssessmentsAPI = {
  get,
};
export default AssessmentsAPI;
