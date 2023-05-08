import { api } from './configs/axiosConfig';
import { IAssessment } from '../models/assessment.interface';

async function get(lessonId: number): Promise<IAssessment[]> {
  return api()
    .get(`/assessments/`, { params: { lessonId } })
    .then((res) => res.data);
}

const Assessments = {
  get,
};
export default Assessments;
