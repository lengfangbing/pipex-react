import { Atom } from './type';

// define atom key source
let number_key = 0;

// create one atom
export function atom<Value>(initialValue: Value): Atom<Value> {
  return {
    key: ++number_key,
    value: initialValue,
    out_date: false,
    fresh: {},
  };
}
