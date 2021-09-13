import useMeasure from 'react-use/lib/useMeasure';
import { useEffect } from 'react';
import { resizeSidebarApp } from '../../lib/Zendesk';

/**
 * Hook to dynamically the app height based on the size of a component.
 *
 * Use the return value as a ref on the component you want to base the app
 * height on.
 *
 * @returns {function}
 */
const useDynamicAppHeight = () => {
  const [appRef, { height }] = useMeasure();

  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    resizeSidebarApp(`${height}px`);
  }, [height]);

  return appRef;
};

export default useDynamicAppHeight;