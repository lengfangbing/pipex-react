import { useCallback } from 'react';
import { Atom, Listener, ListenerActionByFunc } from './type';

export function useSetAtom<Value>(atom: Atom<Value>): Listener<Value> {
  const update: Listener<Value> = useCallback(value => {
    // check whether atom have listener
    if (atom.bind.listener.size === 0) {
      // if no listener, just set fresh value and outdated
      atom.outdated = true;
      atom.fresh.value = typeof value === 'function' ? (value as ListenerActionByFunc<Value>)(atom.value) : value;
    } else {
      // have bind listener, just call listener action
      atom.bind.listener.forEach(listener => {
        listener(value);
      });
    }
  }, [atom]);

  return update;
}
