import { useCallback, useSyncExternalStore } from "react";

const KEY = "user";

export function useStoredUser() {
  const user = useSyncExternalStore(
    () => () => {},
    () => sessionStorage.getItem(KEY),
    () => null,
  );

  const setUser = useCallback((value: string | null) => {
    if (value === null) sessionStorage.removeItem(KEY);
    else sessionStorage.setItem(KEY, value);
  }, []);

  return [user, setUser] as const;
}
