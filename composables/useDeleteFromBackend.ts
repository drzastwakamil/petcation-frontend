const useDeleteFromBackend = (...args: Parameters<typeof useMakeRequestToBackend>) => {
  return useMakeRequestToBackend(args[0], {
    ...args[1],
    method: 'DELETE',
  });
};

export default useDeleteFromBackend;
