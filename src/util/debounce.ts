const debounce = <T extends unknown[]>(
  fn: (...args: T) => void,
  delay: number
) => {
  let id: number | undefined;

  return (...args: T): void => {
    if (id !== undefined) clearTimeout(id);
    id = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export default debounce;
