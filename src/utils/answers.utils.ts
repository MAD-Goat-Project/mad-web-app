import answersApi from '../api/lessons-api/answers.api';
import { IAnswer } from '../models/answer.interface';

export async function validateAnswer(
  assessmentId: number,
  answers: string[]
): Promise<boolean> {
  const answerBody: IAnswer = {
    answers,
  };
  return answersApi
    .validate(assessmentId, answerBody)
    .then((res) => {
      return res.data.isCorrect;
    })
    .catch(() => {
      return false;
    });
}
