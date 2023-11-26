const usePostOnBackend = (...args: Parameters<typeof useMakeRequestToBackend>) => {
  return useMakeRequestToBackend(args[0], {
    ...args[1],
    method: 'POST',
  });
};

export default usePostOnBackend;
