import answersApi from '../api/answers.api';
import { IAnswer } from '../models/answer.interface';

export async function validateAnswer(
  assessmentId: number,
  answer: string
): Promise<boolean> {
  const answerBody: IAnswer = {
    answer,
  };
  if (answer === '') return false;
  const isAnswerCorrect = answersApi
    .validate(assessmentId, answerBody)
    .then((res) => {
      return res.isCorrect;
    });
  return isAnswerCorrect;
}
