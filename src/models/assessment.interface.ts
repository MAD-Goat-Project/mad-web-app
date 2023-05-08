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
