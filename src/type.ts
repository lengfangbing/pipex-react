/** define atom type start */
export type Read<Value> = (atom: Atom<Value>) => void;
export type Write<Value> = (atom: Atom<Value>) => void;
export type UpdateByFreshValue<Value> = (atom: Atom<Value>) => void;
export type FreshValue<Value> = Partial<Pick<Atom<Value>, 'value'>>;
export interface Atom<Value> {
  key: Number;
  value: Value;
  out_date: boolean;
  fresh: FreshValue<Value>;
  read?: Read<Value>;
  write?: Write<Value>;
  update_atom?: UpdateByFreshValue<Value>;
  // @TODO add one attribute for pipe/core
}
/** ---------------- define atom type end ---------------- */
