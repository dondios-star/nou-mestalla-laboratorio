import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {Exterior} from './NouMestalla3D';
import {ageAt,scarfWipe} from './timeline';
import {brand} from '../../shared/brand/tokens';
import {progress,lerp} from '../../shared/motion/time';
import {commentPose, type Comment} from '../../shared/ui/CommentStack';

const comments:Comment[]=[
 {id:'excel',author:'PaquitoElDelExcel',text:'Mi abono ya cotiza.',start:210,end:380,x:85,y:690,width:840},
 {id:'grada',author:'GradaEnConstruccion',text:'El plano tiene nietos.',start:279,end:380,x:95,y:925,width:830},
 {id:'hormigon',author:'HormigonConPatatas',text:'La grúa ya es familia.',start:310,end:380,x:-100,y:365,width:750,direction:-1},
 {id:'paleta',author:'ElUltimoPaleta',text:'Sigo en la primera temporada.',start:318,end:380,x:270,y:1300,width:790},
 {id:'canas',author:'CanasEnLaGrada',text:'He cambiado yo más que el estadio.',start:326,end:380,x:-130,y:1550,width:830,direction:-1},
 {id:'becario',author:'BecarioDelCemento',text:'¿Quince años de descanso?',start:334,end:380,x:455,y:115,width:750},
 {id:'abono',author:'AbonoEnBorrador',text:'Estrenamos cuando me jubile.',start:340,end:380,x:-160,y:1150,width:650,direction:-1},
 {id:'humo',author:'VendoHumoNoParcelas',text:'El plano ya tiene nietos.',start:346,end:380,x:370,y:560,width:790},
];
export function Fan({age,style}:{age:number;style?:React.CSSProperties}){
 // CSS viewport preserves the generated original; no photo pixels were retouched.
 return <div style={{position:'absolute',width:512,height:1024,overflow:'hidden',...style}}>
 <Img src={staticFile('assets/ep41/aficionado-tres-edades.png')} style={{position:'absolute',width:1536,height:1024,maxWidth:'none',left:-512*age,top:0}}/>
 </div>;
}
export function Scarf({amount=1,style}:{amount?:number;style?:React.CSSProperties}){
 return <div style={{position:'absolute',width:1500,height:270,background:'repeating-linear-gradient(90deg,#e7e2d6 0px,#e7e2d6 130px,#252827 130px,#252827 260px)',boxShadow:'0 20px 40px #0005',rotate:'-18deg',...style,opacity:amount}}><div style={{position:'absolute',left:620,width:150,height:'100%',background:'#d17532'}}/><div style={{position:'absolute',inset:0,background:'repeating-linear-gradient(0deg,#ffffff15 0px,#ffffff15 2px,transparent 2px,transparent 6px)'}}/></div>;
}
export function OpeningSceneAtFrame({sourceFrame:f}:{sourceFrame:number}){
 const age=ageAt(f),wipe=scarfWipe(f),history=progress(f,360,378),crowd=progress(f,210,359);
 return <AbsoluteFill style={{background:'#aebec7'}}>
 <Exterior sourceFrame={Math.min(f,209)}/>
 <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(20,31,37,.12) 0%, transparent 40%, rgba(23,24,25,.08) 68%,rgba(15,22,24,.8) 100%)'}}/>
 <Fan age={age} style={{left:12,top:815,scale:1.05,transformOrigin:'50% 100%',translate:`0 ${-2*Math.sin(Math.min(f,209)/60)}px`}}/>
 <div style={{position:'absolute',left:80,top:164,color:brand.wine,fontSize:34,fontWeight:700,letterSpacing:3}}>NOU MESTALLA</div>
 <div style={{position:'absolute',left:80,top:228,width:860,fontFamily:brand.heading,fontSize:f<84?106:93,lineHeight:1.13,color:brand.wine,opacity:1-history}}>{f<84?'CRECISTE TÚ':<>EL ESTADIO<br/>SEGUÍA ESPERANDO</>}</div>
 <div style={{position:'absolute',left:665,top:1370,color:brand.sand,fontFamily:brand.heading,fontSize:104,opacity:1-history}}>{[2009,2017,2024][age]}</div>
 <div style={{position:'absolute',left:80,top:1540,color:brand.sand,fontSize:32,opacity:1-crowd*.85}}>Recreación histórica</div>
 <AbsoluteFill style={{background:'#c2b5a6',opacity:crowd*.24*(1-history)}}/>
 <div style={{position:'absolute',inset:0,perspective:1400,opacity:1-history,translate:`${history*1200}px 0`}}>
 {comments.map((c,i)=>{const pose=commentPose(f,{...c,end:440}),front=progress(f,279,293);const back=i===0?front:0;return <div key={c.id} style={{position:'absolute',left:c.x,top:c.y,width:c.width,padding:i<2?'34px 38px':'28px 32px',boxSizing:'border-box',borderRadius:22,background:brand.sand,color:brand.ink,boxShadow:'0 18px 48px #1115',border:'1px solid #b8a69b',opacity:pose.opacity,transform:`translate3d(${pose.x}px,${pose.y-back*90}px,${lerp(-270,0,progress(f,c.start,c.start+14))-back*120}px) rotate(${(1-progress(f,c.start,c.start+14))*(i%2?3:-3)}deg)`,zIndex:i<2?20+i:10+i}}>
 <div style={{display:'flex',gap:16,alignItems:'center',fontSize:30,fontWeight:700}}><span style={{display:'grid',placeItems:'center',width:44,height:44,background:brand.wine,color:brand.sand,borderRadius:'50%'}}>{c.author[0]}</span>@{c.author}</div>
 <div style={{fontSize:i<2?56:42,lineHeight:1.2,marginTop:24,fontWeight:700}}>{c.text}</div>
 <div style={{display:'flex',gap:12,alignItems:'center',fontSize:30,marginTop:23,color:'#7c6570'}}><span>♡</span>{i===0?'8,4 mil':i===1?'6,1 mil':'1,2 mil'}</div>
 </div>;})}
 </div>
 {history>0&&<div style={{position:'absolute',left:80,top:280,width:850,opacity:history,translate:`0 ${(1-history)*22}px`,color:brand.wine}}>
 <div style={{fontFamily:brand.heading,fontSize:84,lineHeight:1.15}}>Obras paradas:<br/>2009 → 2025</div>
 <div style={{marginTop:35,padding:'26px 30px',background:brand.sand,borderLeft:`8px solid ${brand.wine}`,fontSize:44,lineHeight:1.3,fontWeight:700}}>Reanudadas el<br/>10 de enero de 2025</div>
 </div>}
 {wipe>0&&<Scarf style={{left:-180,top:lerp(-1600,2200,progress(f,f<100?48:114,f<100?65:131)),height:1900}}/>}
 </AbsoluteFill>;
}
