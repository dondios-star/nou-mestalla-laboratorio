import {BufferGeometry, Float32BufferAttribute, Shape, ExtrudeGeometry, Vector3, CatmullRomCurve3, TubeGeometry} from 'three';

// Smooth closed loft: original editable garment and anatomy meshes, not imported
// people or primitive placeholder rigs. Each section is [height, half-width, half-depth].
export const loft = (sections: readonly (readonly number[])[], segments = 24) => {
  const positions: number[] = [], indices: number[] = [];
  sections.forEach(([y, rx, rz, cx = 0, cz = 0]) => {
    for (let j = 0; j <= segments; j++) {
      const a = j / segments * Math.PI * 2;
      positions.push(cx + Math.cos(a) * rx, y, cz + Math.sin(a) * rz);
    }
  });
  for (let i = 0; i < sections.length - 1; i++) for (let j = 0; j < segments; j++) {
    const k = i * (segments + 1) + j;
    indices.push(k, k + segments + 1, k + 1, k + 1, k + segments + 1, k + segments + 2);
  }
  const g = new BufferGeometry();g.setAttribute('position', new Float32BufferAttribute(positions, 3));g.setIndex(indices);g.computeVertexNormals();return g;
};

export const shell = (w: number, h: number, thickness: number, radius = .075) => {
  const s = new Shape();const x = -w / 2, y = -h / 2, r = Math.min(radius, w / 3, h / 3);
  s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);
  s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);
  s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);
  const g = new ExtrudeGeometry(s,{depth: thickness, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: .014, bevelThickness: .012, curveSegments: 8});
  g.translate(0,0,-thickness/2);return g;
};
export const tube = (points: number[][], radius: number, segments = 16) => new TubeGeometry(new CatmullRomCurve3(points.map(p => new Vector3(...p as [number,number,number]))), segments, radius, 6, false);

export const ellipseBand = (innerX: number, innerZ: number, outerX: number, outerZ: number, innerY: number, outerY: number, count = 160) => {
  const p: number[] = [], ix: number[] = [];
  for (let i=0;i<=count;i++) {
    const a=i/count*Math.PI*2;
    p.push(innerX*Math.cos(a),innerY,innerZ*Math.sin(a),outerX*Math.cos(a),outerY,outerZ*Math.sin(a));
    if (i<count) {const k=2*i;ix.push(k,k+2,k+1,k+1,k+2,k+3);}
  }
  const g = new BufferGeometry();g.setAttribute('position',new Float32BufferAttribute(p,3));g.setIndex(ix);g.computeVertexNormals();return g;
};
