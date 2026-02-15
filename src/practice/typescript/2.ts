/* eslint-disable @typescript-eslint/no-unused-vars */

// Define custom type MyPick so it returns part of the keys of the Obj object.

type Obj = { key1: string; key2: string; key3: string };

type MyPick<_, __> = unknown; // TODO: complete this type

type Example = MyPick<Obj, 'key1' | 'key2'>;

const value: Example = { key1: 'a', key2: 'b' };
const shouldError1: Example = { key1: 'a', key3: 'b' };
