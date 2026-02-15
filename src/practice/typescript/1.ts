/* eslint-disable @typescript-eslint/no-unused-vars */
// Define MYType so its values are keys of the obj object.

const obj = {
  name: 'Nik',
  age: 25,
};

type MYType = unknown; // TODO: complete this type to get the keys of the obj object.

const var1: MYType = 'name';
const var2: MYType = 'age';

const shouldError1: MYType = 'test';
const shouldError2: MYType = 25;
