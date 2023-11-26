const useDeleteFromBackend = (...args: Parameters<typeof useMakeRequestToBackend>) => {
  if (args[1]) {
    args[1].method = 'DELETE';
  }
  return useMakeRequestToBackend(...args);
};

export default useDeleteFromBackend;
