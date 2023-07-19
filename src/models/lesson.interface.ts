// TODO: Status should not be optional
export interface ILesson {
  id: number;
  name: string;
  description: string;
  image_src: string;
  image_alt: string;
  status?: number;
}
