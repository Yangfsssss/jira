import { clear, log } from 'console';
import React, { useState, useEffect } from 'react';
import { useMount, useArray } from '../utils';

const ChapterTest = () => {
  const persons: { name: string; age: number }[] = [
    { name: 'jack', age: 28 },
    { name: 'ma', age: 22 },
  ];

  const { array, clear, removeIndex, add } = useArray(persons);

  useMount(() => {
    //报错
    // console.log(array.nonExist);
    //报错
    // add({ name: 'david' });
    //报错
    // removeIndex('123');
  });

  return (
    <div>
      {/* 点击后增加john */}
      <button onClick={() => add({ name: 'john', age: 22 })}>add john</button>
      {/* 点击后移除第一项 */}
      <button onClick={() => removeIndex(0)}>remove 0</button>
      {/* 点击后清空列表 */}
      <button style={{ marginBottom: '50px' }} onClick={() => clear()}>
        clear
      </button>
      {array.map((person, index) => (
        <div style={{ marginBottom: '30px' }}>
          <span style={{ color: 'red' }}>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  );
};

export default ChapterTest;
