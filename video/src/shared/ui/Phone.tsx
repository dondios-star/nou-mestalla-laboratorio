import React from 'react';
import {brand} from '../brand/tokens';
import type {Rect} from '../motion/time';

// Adapted from Messaging.tsx. One frame, one contact; no real messaging service.
export const Phone = ({rect, contact, message, attachment, opacity = 1, detailed = false, messageStyle}: {
  rect: Rect; contact: string; message: string; attachment?: React.ReactNode; opacity?: number; detailed?: boolean; messageStyle?: React.CSSProperties;
}) => <div data-object="phone" style={{position: 'absolute', left: rect.x, top: rect.y,
  width: rect.w, height: rect.h, border: `10px solid ${brand.ink}`, borderRadius: 55,
  overflow: 'hidden', boxSizing: 'border-box', background: '#E8E8E2', opacity, fontFamily: brand.body}}>
  {detailed&&<div style={{height:55,background:'#F8FAF5',display:'flex',justifyContent:'space-between',padding:'12px 32px',boxSizing:'border-box',color:'#254A40',fontSize:23,fontWeight:700}}><span>10:42</span><span style={{width:125,height:22,borderRadius:20,background:brand.ink}}/><span>▥ ▰</span></div>}
  <div style={{height: detailed?105:145, background: '#F8FAF5', padding: detailed?'15px 28px':'50px 30px 20px', boxSizing: 'border-box', color: '#254A40', fontSize: detailed?39:35, fontWeight: 700,display:detailed?'flex':undefined,alignItems:detailed?'center':undefined,gap:detailed?17:undefined}}>{detailed?'‹':'‹　'}{detailed&&<span style={{width:58,height:58,borderRadius:40,display:'grid',placeItems:'center',background:contact.startsWith('Javi')?'#CFD480':contact.startsWith('Lucía')?'#D6C1B6':'#BDC9CB',fontSize:30}}>{contact[0]}</span>}{contact}</div>
  <div style={{margin: '28px 26px', padding: '28px 30px', background: 'white', color: brand.ink, fontSize: 48, lineHeight: 1.3, borderRadius: 20,...messageStyle}}>
    {message}{attachment && <div style={{marginTop: 20}}>{attachment}</div>}
    <div style={{fontSize: 24, textAlign: 'right', marginTop: 12, color: '#687771'}}>10:42</div>
  </div>
  <div style={{position: 'absolute', left: 25, right: 25, bottom: 24, height: 65, background: 'white', borderRadius: 35, padding: '14px 24px', boxSizing: 'border-box', color: '#687771', fontSize: 28}}>Mensaje</div>
</div>;
