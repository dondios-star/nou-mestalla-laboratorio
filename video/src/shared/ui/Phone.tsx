import React from 'react';
import {brand} from '../brand/tokens';
import type {Rect} from '../motion/time';

// Adapted from Messaging.tsx. One frame, one contact; no real messaging service.
export const Phone = ({rect, contact, message, attachment, opacity = 1}: {
  rect: Rect; contact: string; message: string; attachment?: React.ReactNode; opacity?: number;
}) => <div data-object="phone" style={{position: 'absolute', left: rect.x, top: rect.y,
  width: rect.w, height: rect.h, border: `10px solid ${brand.ink}`, borderRadius: 55,
  overflow: 'hidden', boxSizing: 'border-box', background: '#E8E8E2', opacity, fontFamily: brand.body}}>
  <div style={{height: 145, background: '#F8FAF5', padding: '50px 30px 20px', boxSizing: 'border-box', color: '#254A40', fontSize: 35, fontWeight: 700}}>‹　{contact}</div>
  <div style={{margin: '28px 26px', padding: '28px 30px', background: 'white', color: brand.ink, fontSize: 48, lineHeight: 1.3, borderRadius: 20}}>
    {message}{attachment && <div style={{marginTop: 20}}>{attachment}</div>}
    <div style={{fontSize: 24, textAlign: 'right', marginTop: 12, color: '#687771'}}>10:42</div>
  </div>
  <div style={{position: 'absolute', left: 25, right: 25, bottom: 24, height: 65, background: 'white', borderRadius: 35, padding: '14px 24px', boxSizing: 'border-box', color: '#687771', fontSize: 28}}>Mensaje</div>
</div>;
