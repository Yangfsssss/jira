import React, { useEffect, useState } from 'react';

const test = () => {
  let num = 0;

  const effect = () => {
    num += 1;
    const message = `current num: ${num}`;

    return function unMount() {
      console.log(message);
      // console.log(num);
    };
  };

  return effect;
};

const add = test();
const unMount = add();
const unMount1 = add();
const unMount2 = add();
unMount1();
unMount2();
unMount();

const Test = () => {
  const [num, setNum] = useState(0);

  const add = () => setNum(num + 1);

  useEffect(() => {
    const id = setInterval(() => {
      // clearInterval(id);

      console.log('num in setInterval: ', num);
    }, 1000);

    return () => clearInterval(id);
  }, [num]);

  useEffect(() => {
    return () => {
      console.log('卸载值：', num);
    };
  }, [num]);

  return (
    <div>
      <button onClick={add}>add</button>
      <p>number:{num}</p>
    </div>
  );
};

export default Test;
