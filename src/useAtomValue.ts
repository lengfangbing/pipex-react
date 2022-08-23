import { Reducer, useEffect, useReducer } from 'react';
import { Atom, Listener, ListenerAction, ListenerActionByFunc } from './type';

export default function useAtomValue<Value>(atom: Atom<Value>) {
  // create one reducer to bind atom listener
  const [state, dispatch] = useReducer<Reducer<Atom<Value>, Value>, Atom<Value>>(
    (prevState, freshValue) => {
      const freshState = prevState;
      freshState.value = freshValue;
      return freshState;
    },
    atom,
    (initialValue) => {
      if (initialValue.outdated) {
        // if outdated, update value by fresh value
        initialValue.value = initialValue.fresh.value as Value;
        initialValue.outdated = false;
      }
      return initialValue;
    }
  );

  const listenerAction: Listener<Value> = value => {
    if (typeof value === 'function') {
      dispatch((value as ListenerActionByFunc<Value>)(atom.value));
    } else {
      dispatch(value);
    }
  };

  // bind listener
  useEffect(() => {
    atom.bind.listener.add(listenerAction);

    return () => {
      // unbind listener
      atom.bind.listener.delete(listenerAction);
    }
  }, [atom]);

  return state.value;
}
