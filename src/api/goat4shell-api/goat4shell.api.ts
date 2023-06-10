import { goat4shellApi } from '../configs/axiosConfig';
import { AxiosResponse } from 'axios';

const GOAT4SHELL_BASE_ENDPOINT = '/goatShell';

interface IGoat4shell {
  name: string;
  description: string;
}

async function get(): Promise<AxiosResponse<IGoat4shell>> {
  return goat4shellApi().get(GOAT4SHELL_BASE_ENDPOINT, {
    headers: {
      'X-API-Version': '1.0',
    },
  });
}

const goat4shellAPI = {
  get,
};

export default goat4shellAPI;
