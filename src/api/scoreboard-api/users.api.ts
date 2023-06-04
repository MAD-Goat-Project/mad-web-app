import { scoreboardApi } from '../configs/axiosConfig';
import { AxiosError, AxiosResponse } from 'axios';
import { IScoreboardClient } from '../../models/scoreboard.interface';

interface IRandomName {
  name: string;
}

//TODO: The API files should contain only the API calls, not the logic
async function getClient(clientId: string): Promise<boolean> {
  return scoreboardApi()
    .get(`/users/client/${clientId}`)
    .then((res: AxiosResponse<IScoreboardClient>) => !!res.data._id)
    .catch((err: AxiosError) => {
      if (err.response?.status === 404) {
        return false;
      } else {
        throw err;
      }
    });
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

async function createNewUser(
  clientId: string,
  name: string
): Promise<AxiosResponse<IScoreboardClient>> {
  return (
    scoreboardApi()
      // TODO: Possible to change the number of points here??
      .post<IScoreboardClient>(`/users`, { clientId, name, points: 0 })
      .then((res) => {
        return res;
      })
  );
}

const UsersAPI = {
  getClient,
  getRandomName,
  createNewUser,
};

export default UsersAPI;
