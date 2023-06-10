// TODO: Status should not be optional
export interface ILesson {
  id: number;
  name: string;
  description: string;
  status?: number;
}
