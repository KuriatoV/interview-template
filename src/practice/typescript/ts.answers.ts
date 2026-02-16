// 1.type MYType = keyof typeof obj
// 2. type MyPick<T extends object,K extends keyof T>={ [P in K]:T[P]}
// 3.type GetComponentProps<T> = T extends (props: infer P) => unknown ? P : never;
