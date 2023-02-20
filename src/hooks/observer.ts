import { RefObject, useEffect } from 'react';

interface IUseObserver {
  readonly target: RefObject<HTMLInputElement>;
  readonly onIntersect: IntersectionObserverCallback;
  readonly root?: any;
  readonly rootMargin?: any;
  readonly threshold?: any;
}

export const useObserver = (iUseObserver: IUseObserver) => {
  const {
    target,
    onIntersect,
    root = null,
    rootMargin = '0px',
    threshold = 1.0,
  } = iUseObserver;

  useEffect(() => {
    let observer: IntersectionObserver;

    if (target.current) {
      observer = new IntersectionObserver(onIntersect, {
        root,
        rootMargin,
        threshold,
      });
      observer.observe(target.current);
    }

    return () => observer && observer.disconnect();
  }, [target, rootMargin, threshold, onIntersect, root]);
};
