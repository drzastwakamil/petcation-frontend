const usePostOnBackend = (...args: Parameters<typeof useMakeRequestToBackend>) => {
  if (args[1]) {
    args[1].method = 'POST';
  }
  return useMakeRequestToBackend(...args);
};

export default usePostOnBackend;
