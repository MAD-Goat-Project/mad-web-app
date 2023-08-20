import { useQuery } from 'react-query';
import UsersApi from '../api/scoreboard-api/users.api';
import keycloak from '../configurations/keycloak';
import { AxiosError } from 'axios';

export function useScoreboardUser() {
  const {
    data: userExists,
    isLoading,
    error,
    refetch,
  } = useQuery<boolean>('user', async () =>
    UsersApi.getClient(keycloak.idTokenParsed?.sub ?? '')
      .then((res) => {
        return res.status === 200 && res.data.name?.length > 0;
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 404) {
          return false;
        } else {
          throw err;
        }
      })
  );

  return {
    userExists,
    isLoadingUser: isLoading,
    errorUser: error,
    refetchUser: refetch,
  };
}
