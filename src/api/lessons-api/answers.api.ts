import { IAnswer, IAnswerResponse } from '../../models/answer.interface';
import { lessonsApi } from '../configs/axiosConfig';

//TODO: The API files should contain only the API calls, not the logic

async function validate(
  assessmentId: number,
  answerBody: IAnswer
): Promise<IAnswerResponse> {
  return lessonsApi()
    .post(`/assessments/${assessmentId}/answers/validate`, answerBody)
    .then((res) => res.data);
}

const AnswersAPI = {
  validate,
};
export default AnswersAPI;
