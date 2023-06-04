import { lessonsApi } from '../configs/axiosConfig';
import { IAssessment } from '../../models/assessment.interface';

//TODO: The API files should contain only the API calls, not the logic

async function get(lessonId: number): Promise<IAssessment[]> {
  return lessonsApi()
    .get(`/lessons/${lessonId}/assessments/`)
    .then((res) => res.data);
}

const AssessmentsAPI = {
  get,
};
export default AssessmentsAPI;
