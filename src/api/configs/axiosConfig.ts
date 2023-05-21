import { APIClient } from './APIClient';

const lessonsApi = () => {
  const baseURL = import.meta.env.VITE_LESSON_BASE_URL as string;
  return new APIClient(baseURL).getAxiosInstance();
};

const scoreboardApi = () => {
  const baseURL = import.meta.env.VITE_SCOREBOARD_BASE_URL as string;
  return new APIClient(baseURL).getAxiosInstance();
};

export { lessonsApi, scoreboardApi };
