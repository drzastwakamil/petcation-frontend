type UseFetchSecondParam = Parameters<typeof useFetch>[1];

const backendURL = 'http://petcation-405617.lm.r.appspot.com';

function useMakeRequestToBackend(
  endpointName: string,
  options?: UseFetchSecondParam,
  mode?: 'PUBLIC' | 'WITH_AUTHORIZATION',
) {
  const userSession = useUserSessionStore();
  if (mode === 'WITH_AUTHORIZATION') {
    return useFetch(`${backendURL}/${endpointName}`, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${userSession.token}`,
      },
    });
  }

  return useFetch(`${backendURL}/${endpointName}`, options);
}

export default useMakeRequestToBackend;
