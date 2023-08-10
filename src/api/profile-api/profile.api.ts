import { profileApi } from '../configs/axiosConfig';
import { IProfile } from '../../models/profile.interface';
import { AxiosResponse } from 'axios';

async function get(): Promise<AxiosResponse<IProfile[]>> {
  return profileApi().get(`/profile`);
}

const ProfileAPI = {
  get,
};

export default ProfileAPI;
