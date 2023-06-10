import { goat4shellApi } from '../configs/axiosConfig';
import { AxiosResponse } from 'axios';

interface IGoat4shell {
  name: string;
  description: string;
}
async function get(): Promise<AxiosResponse<IGoat4shell>> {
  return goat4shellApi().get('/goatShell', {
    headers: {
      'X-API-Version': '1.0',
    },
  });
}

const goat4shellAPI = {
  get,
};

export default goat4shellAPI;
