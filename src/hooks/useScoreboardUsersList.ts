import { useQuery } from 'react-query';
import { IScoreboardClient } from '../models/scoreboard.interface';
import UsersAPI from '../api/scoreboard-api/users.api';

export function useScoreboardUsersList() {
  const { data, isLoading, error, refetch } = useQuery<IScoreboardClient[]>(
    'users',
    async () => UsersAPI.get().then((res) => res.data)
  );

  return {
    userList: data,
    loadingUsers: isLoading,
    errorUsers: error,
    refetchUsers: refetch,
  };
}
