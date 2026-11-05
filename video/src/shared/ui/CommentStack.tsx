import React from 'react';
import {brand} from '../brand/tokens';
import {progress, lerp} from '../motion/time';
import {Icon} from './Icons';

export type Comment = {
  id: string; author: string; text: string;
  start: number; end: number; x: number; y: number; width?: number;
  direction?: -1 | 1;
};

// Adapted from Comments.tsx: explicit data replaces the original narrative.
export const commentPose = (frame: number, item: Comment) => {
  const entry = progress(frame, item.start, item.start + 20);
  const exit = progress(frame, item.end - 16, item.end);
  return {opacity: entry * (1 - exit), x: (1 - entry) * 130 * (item.direction ?? 1),
    y: (1 - entry) * 60 - exit * 140, scale: lerp(0.94, 1, entry),
    rotation: (1 - entry) * 2 * (item.direction ?? 1)};
};
export const CommentStack = ({sourceFrame, comments}: {sourceFrame: number; comments: readonly Comment[]}) =>
  <div style={{position: 'absolute', inset: 0, fontFamily: brand.body}}>
    {comments.map((item) => {
      const pose = commentPose(sourceFrame, item);
      return <div key={item.id} data-object={`comment-${item.id}`} style={{
        position: 'absolute', left: item.x, top: item.y, width: item.width ?? 800,
        padding: '28px 32px', boxSizing: 'border-box', borderRadius: 24,
        background: brand.sand, color: brand.ink, border: `2px solid ${brand.line}`,
        boxShadow: '0 14px 36px #0002', opacity: pose.opacity,
        translate: `${pose.x}px ${pose.y}px`, scale: pose.scale, rotate: `${pose.rotation}deg`,
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: 20, fontSize: 30, fontWeight: 700}}>
          <div style={{width: 50, height: 50, display: 'grid', placeItems: 'center', borderRadius: '50%', background: brand.wine, color: brand.sand}}>{item.author[0]}</div>
          @{item.author}<span style={{marginLeft: 'auto'}}><Icon name="more" size={26}/></span>
        </div>
        <div style={{fontSize: 48, lineHeight: 1.25, marginTop: 20}}>{item.text}</div>
      </div>;
    })}
  </div>;
