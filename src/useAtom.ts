import { Atom, Listener } from './type';
import useAtomValue from './useAtomValue';
import useSetAtom from './useSetAtom';

export default function useAtom<Value> (atom: Atom<Value>): [Value, Listener<Value>] {
  return [
    useAtomValue(atom),
    useSetAtom(atom)
  ];
}
