export enum LessonStatus {
  NOT_STARTED = 0,
  IN_PROGRESS = 1,
  COMPLETED = 2,
}
export interface IUserLessonProgress {
  id: number;
  user_id: string;
  status: LessonStatus;
}
