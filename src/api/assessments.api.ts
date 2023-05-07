import { api } from './configs/axiosConfig';

export enum IAssessmentType {
  INTRODUCTION = 1,
  QUESTION_ANSWER = 2,
  QUIZ,
  CONCLUSION = 10,
}
export interface IAssessment {
  id: number;
  type: IAssessmentType;
  description: string;
  goal: string;
}
async function get(lessonId: number): Promise<IAssessment[]> {
  return api()
    .get(`/assessments/`, { params: { lessonId } })
    .then((res) => res.data);
}

const Assessments = {
  get,
};
export default Assessments;
