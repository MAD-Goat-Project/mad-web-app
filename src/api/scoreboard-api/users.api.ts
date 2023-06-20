import { scoreboardApi } from '../configs/axiosConfig';
import { AxiosResponse } from 'axios';
import { IScoreboardClient } from '../../models/scoreboard.interface';

async function get(): Promise<AxiosResponse<IScoreboardClient[]>> {
  return scoreboardApi().get(`/users`);
}
async function getClient(
  clientId: string
): Promise<AxiosResponse<IScoreboardClient>> {
  return scoreboardApi().get(`/users/client/${clientId}`);
}
async function getRandomName(): Promise<AxiosResponse<{ name: string }>> {
  return (
    scoreboardApi()
      // This endpoint is vulnerable to a remote code execution attack
      .get<{ name: string }>(`/users/generate/2`)
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
  );
}

const UsersAPI = {
  get,
  getClient,
  getRandomName,
  createNewUser,
};

export default UsersAPI;
