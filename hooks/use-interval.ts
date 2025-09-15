import { useEffect, useRef } from "react";

import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);
  const normalizedDelay = delay ? delay * 1000 : null;

  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (normalizedDelay === null) {
      return;
    }

    const id = setInterval(() => {
      savedCallback.current();
    }, normalizedDelay);

    return () => {
      clearInterval(id);
    };
  }, [normalizedDelay]);
}
