const useGetFromBackend = (...args: Parameters<typeof useMakeRequestToBackend>) => {
  return useMakeRequestToBackend(args[0], {
    ...args[1],
    method: 'GET',
  });
};

export default useGetFromBackend;
