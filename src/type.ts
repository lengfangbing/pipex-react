/** define atom type start */
export type ListenerActionByFunc<Value> = (prevValue: Value) => Value;
export type ListenerAction<Value> = Value | ListenerActionByFunc<Value>;
export type Listener<Value> = (value: ListenerAction<Value>) => void;
export type FreshValue<Value> = Partial<Pick<Atom<Value>, 'value'>>;
export type BindValue<Value> = {
  listener: Set<Listener<Value>>;
};
export interface Atom<Value> {
  key: Number;
  value: Value;
  outdated: boolean;
  fresh: FreshValue<Value>;
  bind: BindValue<Value>;
  // @TODO add one attribute for pipe/core
}
/** ---------------- define atom type end ---------------- */
