export function callAll<Args extends readonly unknown[]>(...fns: readonly (((...args: Args) => void) | undefined)[]) {
  return (...args: Args): void =>
    fns.forEach(fn => fn?.(...args))
}

export function skipFirst<Arg1, Arg2>(fn: (arg: Arg2) => void) {
  return (_arg1: Arg1, arg2: Arg2) =>
    fn(arg2)
}

export function skipAll(fn: () => void) {
  return (..._: unknown[]) => {
    fn()
    void _
  }
}
