const useGetFromBackend = (...args: Parameters<typeof useMakeRequestToBackend>) => {
  if (args[1]) {
    args[1].method = 'GET';
  }
  return useMakeRequestToBackend(...args);
};

export default useGetFromBackend;
