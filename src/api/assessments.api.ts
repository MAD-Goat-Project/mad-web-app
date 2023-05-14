import { api } from './configs/axiosConfig';
import { IAssessment } from '../models/assessment.interface';

async function get(lessonId: number): Promise<IAssessment[]> {
  return api()
    .get(`/lessons/${lessonId}/assessments/`)
    .then((res) => res.data);
}

const AssessmentsAPI = {
  get,
};
export default AssessmentsAPI;
