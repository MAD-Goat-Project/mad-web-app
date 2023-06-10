import answersApi from '../api/lessons-api/answers.api';
import { IAnswer } from '../models/answer.interface';

export async function validateAnswer(
  assessmentId: number,
  answers: string[]
): Promise<boolean> {
  const answerBody: IAnswer = {
    answers,
  };
  //if (answer === '') return false;
  const isAnswerCorrect = answersApi
    .validate(assessmentId, answerBody)
    .then((res) => {
      return res.isCorrect;
    });
  return isAnswerCorrect;
}
