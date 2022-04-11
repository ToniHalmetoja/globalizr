  /*This feature is extremely hacky, but due to react-leaft deficiencies it's required. 
  In short, geoJSON layers cannot access state. This stable callback allows for it. Modify at your own risk.
  Credit: https://gist.github.com/Shrugsy/5e898173c965e7642db8927636bedf7a */

  import { useCallback, useRef} from 'react'

  export function useStableCallback(callback) {
    const callbackRef = useRef(callback);
    callbackRef.current = callback;
  
    const stableCallback = useCallback((...args) => {
      return callbackRef.current(...args);
    }, []);
  
    return stableCallback;
  }