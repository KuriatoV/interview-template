export const asyncTest1 = () => {
  setTimeout(() => {
    console.log('1');
  }, 0);

  const p = new Promise((resolve) => {
    console.log('2');
    resolve(1);
  });

  p.then(() => {
    console.log('5');
  }).then(() => {
    console.log('6');
  });

  p.then(() => {
    console.log('7');
  }).then(() => {
    console.log('8');
  });

  console.log('4');
};

// promiseTest1()
//--------------------------------

export const asyncTest2 = () => {
  function fn() {
    Promise.resolve().then(() => {
      console.log('1');
      fn();
    });
  }

  fn();

  setTimeout(() => console.log('2'), 0);
};
