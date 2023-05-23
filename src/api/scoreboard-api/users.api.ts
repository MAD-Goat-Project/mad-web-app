import { scoreboardApi } from '../configs/axiosConfig';
import { AxiosResponse } from 'axios';

interface IRandomName {
  name: string;
}
async function getClient(clientId: string) {
  return scoreboardApi()
    .get(`/users/client/${clientId}`)
    .then((res) => res.data);
}
async function getRandomName(): Promise<AxiosResponse<IRandomName>> {
  return (
    scoreboardApi()
      // This endpoint is vulnerable to a remote code execution attack
      .get<IRandomName>(`/users/generate/2`)
      .then((res) => {
        return res;
      })
  );
}

const usersAPI = {
  getClient,
  getRandomName,
};

export default usersAPI;
