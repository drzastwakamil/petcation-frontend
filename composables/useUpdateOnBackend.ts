const useUpdateOnBackend = (...args: Parameters<typeof useMakeRequestToBackend>) => {
  return useMakeRequestToBackend(args[0], {
    ...args[1],
    method: 'PUT',
  });
};

export default useUpdateOnBackend;
