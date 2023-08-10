import { useQuery } from 'react-query';
import { IProfile } from '../models/profile.interface';
import ProfileAPI from '../api/profile-api/profile.api';

export function useProfileList() {
  const { data, isLoading, error } = useQuery<IProfile>('profiles', async () =>
    ProfileAPI.get().then((res) => res.data[0])
  );

  return { profileList: data, isLoading, error };
}
