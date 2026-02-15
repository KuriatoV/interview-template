import { useState, useEffect } from 'react';

export default function Parent() {
  const [count, setCount] = useState(1);

  log('1 Parent component');

  useEffect(() => {
    log('2 Parent useEffect');

    return () => {
      log('3 Parent useEffect cleanup');
    };
  }, [count]);

  useEffect(() => {
    log('4 Parent useEffect');
    setCount((count) => count + 1);
  }, []);

  return <Child count={count} />;
}

function Child({ count }: { count: number }) {
  log('5 Child component');
  useEffect(() => {
    log('6 Child useEffect');

    return () => {
      log('7 Child useEffect cleanup');
    };
  }, [count]);

  return <div>Count: {count}</div>;
}

// const log = console.log;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function log(..._args: unknown[]) {}
