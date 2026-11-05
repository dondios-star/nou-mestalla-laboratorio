import React from 'react';
// Generic primitives only; exclude logos and platform navigation.
type Name='like'|'comment'|'more'|'close'|'play'|'back';
export const Icon=({name,size=44,color='currentColor',filled=false}:{name:Name;size?:number;color?:string;filled?:boolean})=>{
 const paths:Partial<Record<Name,React.ReactNode>>={
  like:<path d="M7 10H3v11h4m0-11 4-8c3 0 3 2 2 7h6a2 2 0 0 1 2 3l-2 7a2 2 0 0 1-2 2H7Z"/>,
  comment:<path d="M3 3h18v14H9l-6 4Z M7 7h10M7 11h8"/>,
  more:<>{[4,12,20].map(y=><circle key={y} cx="12" cy={y} r="1.2" fill={color} stroke="none"/>)}</>,
  close:<path d="m4 4 16 16M20 4 4 20"/>,
  play:<path d="m7 3 15 9-15 9Z"/>,
  back:<path d="m18 2-15 10 15 10Z"/>,
 };
 return <svg width={size} height={size} viewBox="0 0 24 24" fill={filled?color:'none'} stroke={color} strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,display:'block'}}>{paths[name]}</svg>;
};
