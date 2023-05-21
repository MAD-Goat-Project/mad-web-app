import { lessonsApi } from '../configs/axiosConfig';
import { IAssessment } from '../../models/assessment.interface';

async function get(lessonId: number): Promise<IAssessment[]> {
  return lessonsApi()
    .get(`/lessons/${lessonId}/assessments/`)
    .then((res) => res.data);
}

const AssessmentsAPI = {
  get,
};
export default AssessmentsAPI;
