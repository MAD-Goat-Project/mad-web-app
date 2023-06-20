import { useQuery } from 'react-query';
import { IScoreboardClient } from '../models/scoreboard.interface';
import UsersAPI from '../api/scoreboard-api/users.api';

export function useScoreboardUsersList() {
  const { data, isLoading, error } = useQuery<IScoreboardClient[]>(
    'users',
    async () => UsersAPI.get().then((res) => res.data)
  );

  return { userList: data, isLoading, error };
}
