import React from 'react';

export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
  if (!keyword) {
    return <>{name}</>;
  }

  const arr = name.split(keyword);

  return (
    <>
      {arr.map((str, index) => (
        <span key={index}>
          {str}
          {/* 从name中取出keyword使name分离，再将染色的keyword填回缝隙 */}
          {index === arr.length - 1 ? null : <span style={{ color: '#257AFD' }}>{keyword}</span>}
        </span>
      ))}
    </>
  );
};
