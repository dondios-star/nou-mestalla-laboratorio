import React from 'react';
import {AbsoluteFill, Freeze, Img, OffthreadVideo, staticFile, useCurrentFrame} from 'remotion';
import '../../shared/brand/fonts';
import {brand} from '../../shared/brand/tokens';
import {lerp, progress} from '../../shared/motion/time';
import {Phone} from '../../shared/ui/Phone';
import {CommentStack, type Comment} from '../../shared/ui/CommentStack';
import {StadiumBackdrop} from './Stadium';
import {Hero} from './Hero';
import {Sector} from './Sector';
import {COPY, MESSAGES, OPTIONS, type Variant} from './content';
import {PHONE} from './layouts';
import {sourceTime,hookTime} from './timing';

export type EpisodeProps = {renderPass?: 'episode' | 'stadium' | 'hero' | 'sector'; variant?: Variant; useCache?: boolean};
const asset=(name:string)=>staticFile(`assets/ep45/${name}`);
const header: React.CSSProperties={position:'absolute',left:90,top:169,fontSize:34,fontWeight:700,letterSpacing:2};
const title: React.CSSProperties={position:'absolute',left:90,top:300,width:830,fontFamily:brand.heading,fontSize:88,lineHeight:1.12,whiteSpace:'pre-line',fontWeight:400,margin:0};
const Frame = ({children,dark=false}:{children:React.ReactNode;dark?:boolean})=><AbsoluteFill style={{background:dark?brand.wine:brand.sand,color:dark?brand.sand:brand.ink,fontFamily:brand.body,overflow:'hidden'}}>{children}</AbsoluteFill>;
const Kicker=({dark=false}:{dark?:boolean})=><div style={{...header,color:dark?brand.sand:brand.wine}}>{COPY.series}</div>;
const SimTag=({top=1560,dark=false}:{top?:number;dark?:boolean})=><div style={{position:'absolute',left:90,top,fontSize:33,fontWeight:700,letterSpacing:1,color:dark?brand.sand:brand.wine}}>{COPY.simulation}</div>;

const HookImage=({frame,cache}:{frame:number;cache:boolean})=><AbsoluteFill>
  {cache?<Freeze frame={Math.round(hookTime(frame))}><OffthreadVideo src={asset('hero.mp4')} muted style={{width:1080,height:1920}}/></Freeze>:<>
    <Img src={asset('stadium.jpg')} style={{width:1080,height:1920,objectFit:'cover'}}/>
    <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(27,35,40,.15) 0%,transparent 45%,#565853 100%)'}}/>
    <div style={{position:'absolute',left:0,top:680,width:1080,height:1120}}><Hero sourceFrame={frame}/></div>
  </>}
</AbsoluteFill>;
const Hook=({frame,cache}:{frame:number;cache:boolean})=><AbsoluteFill>
  <HookImage frame={frame} cache={cache}/>
  <div style={{position:'absolute',left:0,top:0,right:0,height:600,background:'linear-gradient(#253139CC,#25313970,transparent)'}}/>
  <Kicker dark/>
  <div style={{position:'absolute',left:90,top:228,background:brand.sand,color:brand.wine,padding:'10px 16px',fontSize:33,fontWeight:700,letterSpacing:1}}>{COPY.simulation}</div>
  <h1 style={{...title,top:342,color:brand.sand,textShadow:'0 3px 14px #14202666'}}>{COPY.hook}</h1>
  <div style={{position:'absolute',left:90,top:1500,color:brand.wine,fontSize:38,fontWeight:700,opacity:progress(frame,192,210)}}>Mismo tramo. Una plaza menos.</div>
  <div style={{position:'absolute',left:90,top:1560,color:brand.wine,fontSize:30}}>Ejemplo local · No es un cálculo de aforo</div>
</AbsoluteFill>;

const comments:Comment[]=[
  {id:'butaca',author:'ButacaEnParo',text:'Mi asiento está en el banquillo.',start:268,end:430,x:100,y:1120,width:830},
  {id:'cad',author:'CunadoDelCAD',text:'El hormigón no tiene Ctrl+Z.',start:406,end:640,x:100,y:1120,width:830},
  ...[
    ['PepeSinFila','El quinto se queda de entrenador.'],['ExcelDeGrada','La celda estaba ocupada.'],['RenderConBufanda','En el render cabíamos todos.'],['GradaDeGuardia','Falta una silla y sobra confianza.'],['VARDelPlano','Revisando posible fuera de asiento.'],['Asiento404','Localidad no encontrada.'],
  ].map(([author,text],i)=>({id:`crowd-${i}`,author,text,start:546+i*2,end:1000,x:85+(i%2)*35,y:440+i*145,width:820,direction:(i%2?1:-1) as -1|1})),
];

const SocialRewind=({frame,cache}:{frame:number;cache:boolean})=>{
  const t=sourceTime(frame),q=progress(t,270,288),scale=lerp(1,.66,q),x=lerp(0,183,q),y=lerp(0,285,q);
  return <Frame dark>
    <div style={{position:'absolute',left:0,top:0,width:1080,height:1920,transformOrigin:'0 0',translate:`${x}px ${y}px`,scale,borderRadius:64*q,overflow:'hidden',outline:`${12*q}px solid #221C21`,boxShadow:q?'0 30px 60px #16051155':undefined}}><Hook frame={hookTime(t)} cache={cache}/></div>
    {q>0&&<><div style={{...header,opacity:q,color:brand.sand}}>EN LA GRADA DEL DEBATE</div><div style={{position:'absolute',left:90,top:1580,fontSize:32,opacity:q,color:brand.sand}}>Comentarios ficticios</div></>}
    <CommentStack sourceFrame={t} comments={comments}/>
    {frame>=570&&<div style={{position:'absolute',left:90,top:1410,width:840,color:brand.sand,background:brand.wine,padding:'20px 25px',boxSizing:'border-box',opacity:progress(frame,570,588)*(1-progress(frame,700,720))}}><div style={{fontSize:29,letterSpacing:3,marginBottom:12}}>◀◀　VOLVAMOS AL DISEÑO</div><div style={{fontFamily:brand.heading,fontSize:64,lineHeight:1.08,whiteSpace:'pre-line'}}>{COPY.rewind}</div></div>}
  </Frame>;
};

const SectorImage=({variant='base',frame=330,cache=true}:{variant?:Variant;frame?:number;cache?:boolean})=>cache?
  (frame<330&&variant!=='base'?<Freeze frame={Math.max(0,Math.round(frame))}><OffthreadVideo muted src={asset(`sector-${variant}.mp4`)} style={{width:1080,height:1000}}/></Freeze>:<Img src={asset(`sector-${variant}.png`)} style={{width:1080,height:1000}}/>):<Sector variant={variant} sourceFrame={frame}/>;

const Desk=({frame,cache}:{frame:number;cache:boolean})=><Frame>
  <Kicker/>
  <h1 style={{...title,color:brand.wine,top:305,opacity:progress(frame,720,744)}}>{COPY.role}</h1>
  <div style={{position:'absolute',left:0,top:580,width:1080,height:1000}}><SectorImage cache={cache}/></div>
  <div style={{position:'absolute',left:90,top:1455,width:850,fontSize:40,lineHeight:1.35,whiteSpace:'pre-line',opacity:progress(frame,732,750)}}>{COPY.signature}</div>
  <SimTag top={1630}/>
</Frame>;

const MessageScene=({frame,cache}:{frame:number;cache:boolean})=>{
  const index=frame<1200?0:frame<1470?1:2,m=MESSAGES[index],local=frame-m.from;
  const enter=progress(frame,930,951),expand=progress(frame,1710,1740);
  return <Frame>
    <Kicker/>
    <div style={{...title,top:274,fontSize:72,color:brand.wine}}>TRES DATOS PARA DECIDIR</div>
    <div style={{position:'absolute',inset:0,translate:`0px ${30*(1-enter)}px`,opacity:enter*(1-expand)}}>
      <Phone rect={PHONE} contact="Proyecto · diseño" message="" attachment={<div style={{marginTop:-16}}>
        <div style={{color:brand.wine,fontSize:34,fontWeight:700,marginBottom:21}}>{m.sender}</div>
        <div data-essential="message" style={{fontSize:50,lineHeight:1.29,fontWeight:400,opacity:progress(local,0,20),translate:`0px ${12*(1-progress(local,0,20))}px`}}>{m.text}</div>
        <div style={{height:480,marginTop:28,background:'#EEE8DD',borderRadius:14,overflow:'hidden',position:'relative'}}>
          <div style={{position:'absolute',left:34,top:-70,transformOrigin:'0 0',scale:.56,visibility:expand>0?'hidden':'visible'}}><SectorImage variant={index===1?'B':'base'} frame={330} cache={cache}/></div>
          <div style={{position:'absolute',left:17,right:17,bottom:15,padding:'12px 9px',background:brand.sand,color:brand.wine,fontSize:index===1?29:32,fontWeight:700,textAlign:'center'}}>{m.detail}</div>
        </div>
      </div>}/>
    </div>
    <div style={{position:'absolute',left:90,top:1620,fontSize:32,color:brand.wine,fontWeight:700,letterSpacing:1,opacity:1-expand}}>{m.note} · SUPUESTO FICTICIO</div>
    {expand>0&&<div style={{position:'absolute',left:lerp(208,0,expand),top:lerp(952,580,expand),width:1080,height:1000,scale:lerp(.56,1,expand),transformOrigin:'0 0'}}><SectorImage cache={cache}/></div>}
  </Frame>;
};

const Alternative=({frame,cache}:{frame:number;cache:boolean})=>{
  const index=Math.min(2,Math.floor((frame-1740)/360)),o=OPTIONS[index],local=frame-1740-index*360;
  return <Frame>
    <Kicker/>
    <div style={{position:'absolute',left:90,top:275,display:'flex',gap:28,alignItems:'start',width:850}}>
      <div style={{fontFamily:brand.heading,fontSize:105,color:brand.wine,lineHeight:1}}>{o.id}</div>
      <h1 style={{fontFamily:brand.heading,fontWeight:400,fontSize:76,lineHeight:1.08,whiteSpace:'pre-line',margin:0,color:brand.wine}}>{o.title}</h1>
    </div>
    <div style={{position:'absolute',left:90,top:499,fontSize:42,color:brand.ink}}>{o.benefit}</div>
    <div style={{position:'absolute',left:0,top:580,width:1080,height:1000}}><SectorImage variant={o.id} frame={local} cache={cache}/></div>
    <div style={{position:'absolute',left:90,top:1320,width:840,padding:'24px 28px',background:brand.wine,color:brand.sand,boxSizing:'border-box',opacity:progress(local,64,84)}}>
      <div style={{fontSize:29,letterSpacing:2,marginBottom:12}}>EL COMPROMISO</div>
      <div style={{fontSize:49,fontWeight:700,lineHeight:1.2}}>{o.cost}</div>
    </div>
    <div style={{position:'absolute',left:90,top:1495,width:840,fontSize:38,lineHeight:1.1,whiteSpace:'pre-line',opacity:progress(local,68,84)}}>{o.note}</div>
    <SimTag top={1610}/>
    {local<30&&<div style={{position:'absolute',left:90,top:1240,fontSize:29,color:brand.wine,opacity:1-progress(local,15,30)}}>MISMA BASE · MISMA ESTRUCTURA</div>}
  </Frame>;
};

const Summary=({frame,cache}:{frame:number;cache:boolean})=>{
  const end=progress(frame,3360,3384);
  return <Frame>
    <Kicker/>
    <h1 style={{...title,top:280,fontSize:86,color:brand.wine,opacity:1-end}}>{COPY.question}</h1>
    <h1 style={{...title,top:280,fontSize:86,color:brand.wine,opacity:end}}>{COPY.closing}</h1>
    <div style={{position:'absolute',left:90,top:510,fontSize:35,fontWeight:700,color:brand.wine}}>Demanda incierta · Entradas asequibles</div>
    {OPTIONS.map((o,i)=>{
      const q=progress(frame,2820+i*10,2850+i*10);
      return <div key={o.id} style={{position:'absolute',left:90,top:615+i*266,width:840,height:240,background:'#FFFAF0',border:`2px solid ${brand.line}`,borderRadius:18,overflow:'hidden',boxShadow:'0 6px 18px #4B19310B',opacity:q,translate:`0px ${24*(1-q)}px`}}>
        <div style={{position:'absolute',left:-42,top:-20,scale:.25,transformOrigin:'0 0'}}><SectorImage variant={o.id} cache={cache}/></div>
        <div style={{position:'absolute',left:228,top:24,fontFamily:brand.heading,fontSize:58,color:brand.wine}}>{o.id}</div>
        <div style={{position:'absolute',left:300,top:28,width:510,fontSize:43,fontWeight:700,lineHeight:1.18}}>{o.summary}</div>
        <div style={{position:'absolute',left:300,top:154,width:510,fontSize:35,lineHeight:1.23,color:brand.wine}}>{o.summaryCost}</div>
      </div>;
    })}
    <div style={{position:'absolute',left:90,top:1450,fontFamily:brand.heading,fontSize:60,color:brand.wine}}>ALBERTO VILLA</div>
    <div style={{position:'absolute',left:90,top:1540,fontSize:33,color:brand.wine}}>Proyecto real · Simulación de diseño</div>
  </Frame>;
};

export const NouMestalla45AforoDecision=({renderPass='episode',variant='base',useCache=true}:EpisodeProps)=>{
  const frame=useCurrentFrame();
  if(renderPass==='stadium')return <StadiumBackdrop/>;
  if(renderPass==='hero')return <HookImage frame={frame} cache={false}/>;
  if(renderPass==='sector')return <AbsoluteFill style={{background:brand.sand}}><div style={{position:'absolute',left:0,top:0}}><Sector variant={variant} sourceFrame={frame}/></div></AbsoluteFill>;
  if(frame<720)return <SocialRewind frame={frame} cache={useCache}/>;
  if(frame<930)return <Desk frame={frame} cache={useCache}/>;
  if(frame<1740)return <><MessageScene frame={frame} cache={useCache}/>{frame<951&&<AbsoluteFill style={{opacity:1-progress(frame,930,951)}}><Desk frame={929} cache={useCache}/></AbsoluteFill>}</>;
  if(frame<2820)return <Alternative frame={frame} cache={useCache}/>;
  return <Summary frame={frame} cache={useCache}/>;
};
