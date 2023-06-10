import { IAnswer, IAnswerResponse } from '../../models/answer.interface';
import { lessonsApi } from '../configs/axiosConfig';
import { AxiosResponse } from 'axios';

const ASSESSMENTS_BASE_ENDPOINT = '/assessments';

async function validate(
  assessmentId: number,
  answerBody: IAnswer
): Promise<AxiosResponse<IAnswerResponse>> {
  return lessonsApi().post(
    `${ASSESSMENTS_BASE_ENDPOINT}/${assessmentId}/answers/validation`,
    answerBody
  );
}

const AnswersAPI = {
  validate,
};
export default AnswersAPI;
