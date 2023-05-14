import { api } from './configs/axiosConfig';
import { IAnswer, IAnswerResponse } from '../models/answer.interface';

async function validate(
  assessmentId: number,
  answerBody: IAnswer
): Promise<IAnswerResponse> {
  return api()
    .post(`/assessments/${assessmentId}/answers/validate`, answerBody)
    .then((res) => res.data);
}

const AnswersAPI = {
  validate,
};
export default AnswersAPI;
