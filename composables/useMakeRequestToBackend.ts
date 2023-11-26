type UseFetchSecondParam = Parameters<typeof useFetch>[1];

const backendURL = 'http://petcation-405617.lm.r.appspot.com';

function useMakeRequestToBackend(endpointName: string, options?: UseFetchSecondParam) {
  return useFetch(`${backendURL}/${endpointName}`, options);
}

export default useMakeRequestToBackend;
