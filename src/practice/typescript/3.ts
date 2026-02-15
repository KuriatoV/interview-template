/* eslint-disable @typescript-eslint/no-unused-vars */

// Define GetComponentProps so it returns the props of the ButtonComponent function.

type ButtonComponentProps = {
  label: string;
  onClick: () => void;
  theme?: 'light' | 'dark';
};

function ButtonComponent(props: ButtonComponentProps) {
  return props.label;
}

type GetComponentProps<_> = unknown; //TODO: complete this type to get the props of the ButtonComponent

type ButtonProps = GetComponentProps<number>;

const props1: ButtonProps = { label: 'Click me', onClick: () => {}, theme: 'light' };
const props2: ButtonProps = { label: 'Click me' };
const props3: ButtonProps = { wrongProp: true };
