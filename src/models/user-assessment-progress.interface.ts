export enum AssessmentStatus {
  NOT_STARTED = 0,
  IN_PROGRESS = 1,
  COMPLETED = 2,
}
export interface IUserAssessmentProgress {
  id: number;
  user_id: string;
  status: AssessmentStatus;
}
