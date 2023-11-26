const useUpdateOnBackend = (...args: Parameters<typeof useMakeRequestToBackend>) => {
  if (args[1]) {
    args[1].method = 'PUT';
  }
  return useMakeRequestToBackend(...args);
};

export default useUpdateOnBackend;
