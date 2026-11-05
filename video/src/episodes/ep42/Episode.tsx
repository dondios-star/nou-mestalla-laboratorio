import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {brand} from '../../shared/brand/tokens';
import '../../shared/brand/fonts';
import {CommentStack, type Comment} from '../../shared/ui/CommentStack';
import {Phone} from '../../shared/ui/Phone';
import {lerp, progress} from '../../shared/motion/time';
import {LiveStadiumView, LiveWorkBays, StadiumView, WorkBays} from './Stadium';
import {branchState, messages, openingSource, options, type Branch} from './state';


const W=brand.wine,S=brand.sand,I=brand.ink;
const label:React.CSSProperties={fontSize:28,fontWeight:700,letterSpacing:2};
const title:React.CSSProperties={fontFamily:brand.heading,fontWeight:400,lineHeight:1.05};
const Badge=({children,dark=false}:{children:React.ReactNode;dark?:boolean})=><div style={{...label,display:'inline-block',padding:'14px 20px',background:dark?W:S,color:dark?S:W}}>{children}</div>;
const Header=({light=false}:{light?:boolean})=><div style={{position:'absolute',left:112,top:270,right:210,color:light?S:W,display:'flex',alignItems:'center',justifyContent:'space-between',...label,fontSize:24}}>
  <span>NOU MESTALLA · SIMULACIÓN</span><span style={{fontFamily:brand.heading,fontSize:38}}>42</span>
</div>;
const Footer=({light=false}:{light?:boolean})=><div style={{position:'absolute',left:78,bottom:110,...label,fontSize:24,color:light?S:W}}>ALBERTO VILLA <span style={{fontWeight:400,marginLeft:24}}>GESTIÓN DE PROYECTOS</span></div>;
export const Plan=({systems=false,zones=false}:{systems?:boolean;zones?:boolean})=><svg viewBox="0 0 800 440" style={{width:'100%',height:'100%'}}>
  <defs><pattern id="ep42-grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#bdb3a3" strokeWidth=".6"/></pattern></defs>
  <rect width="800" height="440" fill="url(#ep42-grid)"/>
  {[0,1,2,3,4,5,6,7].map(i=><rect key={i} x={70+i*15} y={34+i*13} width={660-i*30} height={372-i*26} rx={160-i*13} fill="none" stroke={W} strokeWidth={i%3===0?3:1.2}/>)}
  <rect x="270" y="148" width="260" height="146" rx="6" fill="none" stroke={W} strokeWidth="2"/>
  {Array.from({length:24},(_,i)=>{const a=i*Math.PI*2/24;return <line key={i} x1={400+190*Math.cos(a)} y1={220+95*Math.sin(a)} x2={400+328*Math.cos(a)} y2={220+184*Math.sin(a)} stroke={W} strokeWidth="1"/>;})}
  {systems&&<><path d="M180 200H620V315H260V268" fill="none" stroke="#967553" strokeWidth="7" strokeDasharray="12 9"/><path d="M200 175H640V338H240V250" fill="none" stroke="#596b77" strokeWidth="5" strokeDasharray="9 7"/></>}
  {zones&&[1,2,3].map((n,i)=><g key={n}><circle cx={240+i*160} cy="340" r="28" fill={S} stroke={W} strokeWidth="2"/><text x={240+i*160} y="350" textAnchor="middle" fontFamily="Inter" fontSize="30" fontWeight="700" fill={W}>{n}</text></g>)}
</svg>;
const secondary:Comment[]=[
  ['DondeEstaMiButaca','Mi plano ya pide gafas.'],['RenderConBufanda','El render sigue en forma.'],
  ['PaquitoElDelBIM','¿Quién tiene la última versión?'],['CascoDeDomingo','He traído el plano. Creo.'],
  ['GradaEnBeta','Actualización pendiente.'],['ElPrimoDelEncofrado','Ese PDF es de la familia.'],
].map(([author,text],i)=>({id:`small-${i}`,author,text,start:246+i*27,end:560,x:108+(i%2)*90,y:570+(i%3)*260,width:760,direction:i%2?-1:1}));
const Opening=({frame}:{frame:number})=>{
  const f=openingSource(frame);
  const feed=progress(f,210,239), plan=progress(f,60,110)*(1-feed*.5);
  const hook=progress(f,24,55)*(1-progress(f,210,239));
  const main=f<360?0:1;
  const mainEntry=progress(f,main?360:240,main?375:255);
  const paper=progress(frame,558,599);
  return <AbsoluteFill style={{background:S}}>
    <div style={{position:'absolute',inset:0,transform:`scale(${lerp(1,.9,feed)})`,borderRadius:lerp(0,30,feed),overflow:'hidden'}}>
      <StadiumView inside frame={f} width={1080} height={1920} blueprint={plan*.75}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg, #26383d77 0%,transparent 32%, transparent 55%,#17201e9c 100%)'}}/>
    </div>
    <Header light/>
    <div style={{position:'absolute',left:112,top:370,width:758,color:S,opacity:hook,transform:`translateY(${(1-progress(f,24,55))*25}px)`}}>
      <div style={{...title,fontSize:82,textShadow:'0 3px 22px #0007'}}>Este estadio envejeció<br/>antes de estrenarse</div>
    </div>
    <div style={{position:'absolute',left:112,top:900,width:758,height:350,border:`2px solid #f4ead8b8`,background:'#f4ead824',opacity:plan,transform:`translateY(${(1-plan)*35}px)`}}>
      <div style={{position:'absolute',right:24,top:15,width:330,height:180,opacity:.65}}><Plan systems/></div>
      <div style={{position:'absolute',left:26,top:26}}><Badge>{f<180?'PROYECTO ARCHIVADO':'PROPUESTA A REVISAR'}</Badge></div>
      <div style={{position:'absolute',left:30,bottom:44,color:S,fontSize:48,fontWeight:700,textShadow:'0 2px 9px #0008'}}>{f<180?'Instalaciones · actualizar':'¿Qué sigue sirviendo?'}</div>
    </div>
    {f<240&&<div style={{position:'absolute',left:112,top:1305,color:S,fontSize:27}}>Recreación del periodo anterior a 2025</div>}
    {f>=240 && <>
      <div style={{position:'absolute',inset:0,background:'#261e2765'}}/>
      <div style={{position:'absolute',inset:0,opacity:.12,transform:'scale(.84)',filter:'blur(.5px)'}}><CommentStack sourceFrame={f} comments={secondary}/></div>
      {main===1&&<div style={{position:'absolute',left:112,top:800,width:758,padding:'38px 38px 42px',boxSizing:'border-box',background:S,color:W,borderRadius:25,opacity:lerp(1,.55,progress(f,360,378)),transform:`translateY(${-150*progress(f,360,378)}px) scale(${lerp(1,.88,progress(f,360,378))})`}}><div style={{fontSize:31,fontWeight:700}}>@PlanoFinal_v27</div><div style={{fontSize:54,lineHeight:1.17,fontWeight:700,marginTop:25}}>El definitivo<br/>tiene nietos.</div></div>}
      <div style={{position:'absolute',left:112,top:main?1010:800,width:758,padding:'38px 38px 42px',boxSizing:'border-box',background:S,color:W,borderRadius:25,boxShadow:'0 28px 70px #0004',opacity:mainEntry,transform:`translateY(${(1-mainEntry)*50}px) scale(${lerp(.97,1,mainEntry)})`}}>
        <div style={{fontSize:31,fontWeight:700}}>{main?'@HormigonConCanas':'@PlanoFinal_v27'}</div>
        <div style={{fontSize:54,lineHeight:1.17,fontWeight:700,marginTop:25}}>{main?<>Antes del estreno,<br/>actualización.</>:<>El definitivo<br/>tiene nietos.</>}</div>
      </div>
      <div style={{position:'absolute',top:1305,left:112,...label,color:S,fontSize:26}}>PUBLICACIÓN SIMULADA · Comentarios ficticios</div>
    </>}
    {frame>=480&&frame<558&&<div style={{position:'absolute',top:640,left:112}}><Badge>REBOBINANDO</Badge></div>}
    {paper>0&&<div style={{position:'absolute',inset:0,background:'#80715e',opacity:paper}}>
      <div style={{position:'absolute',left:100,top:600,width:850,height:520,background:S,transform:`rotate(${lerp(-5,-8,paper)}deg)`,padding:25}}><Plan/></div>
    </div>}
  </AbsoluteFill>;
};
const Desk=({frame}:{frame:number})=>{
  const q=progress(frame,720,779);
  return <AbsoluteFill style={{background:'#80715e'}}>
    <div style={{position:'absolute',inset:0,background:'repeating-linear-gradient(92deg,transparent 0px, transparent 170px,#352b2210 172px,#352b2210 175px)'}}/>
    <div style={{position:'absolute',left:100,top:600,width:850,height:520,background:S,transform:'rotate(-8deg)',padding:25,boxShadow:'0 20px 30px #0003'}}><Plan/></div>
    <div style={{position:'absolute',left:85,top:300,width:510,height:290,background:'#34383a',border:'15px solid #242628',borderRadius:12,transform:'rotate(-8deg)',overflow:'hidden'}}><div style={{position:'absolute',width:1080,height:900,transform:'scale(.48)',transformOrigin:'top left'}}><StadiumView/></div></div>
    <div style={{position:'absolute',left:98,top:584,width:510,height:40,background:'#a1a4a5',transform:'rotate(-8deg)',borderRadius:'0 0 20px 20px'}}/>
    <svg style={{position:'absolute',left:670,top:350,width:280,height:230,transform:'rotate(15deg)'}} viewBox="0 0 280 230"><ellipse cx="140" cy="170" rx="130" ry="27" fill="#0002"/><path d="M35 163V135C35 0 245 0 245 135V163Z" fill="#dec88e"/><path d="M130 25H151V155H130Z" fill="#efe0b9"/><ellipse cx="140" cy="163" rx="133" ry="22" fill="#d1b779"/></svg>
    <div style={{position:'absolute',left:100,top:250,width:790,height:80,background:W}}/>
    <Header light/>
    <div style={{position:'absolute',left:112,top:1000,width:758,color:S,background:W,padding:24,boxSizing:'border-box',opacity:1-q}}><Badge>Antes del reinicio de 2025</Badge><div style={{...title,fontSize:70,marginTop:20}}>Ahora diriges tú<br/>el reinicio</div></div>
    <div style={{position:'absolute',inset:0,background:S,opacity:q}}/>
    <div style={{transform:`translate(${lerp(400,0,q)}px,${lerp(230,0,q)}px) scale(${lerp(.3,1,q)}) rotate(${lerp(7,0,q)}deg)`,transformOrigin:'78px 425px'}}><MessagePhone frame={780} index={0} chrome={false}/></div>
    {q>0&&<div style={{opacity:q}}><Header/><div style={{position:'absolute',left:112,top:340}}><Badge dark>Antes del reinicio de 2025</Badge></div></div>}
  </AbsoluteFill>;
};
const Attachment=({index,hidePlan=false}:{index:number;hidePlan?:boolean})=>index===2?<div style={{fontSize:30,color:W,padding:'10px 0'}}>
  <div style={{fontWeight:700,fontSize:27,marginBottom:20}}>DOS ACTIVIDADES A LA VEZ</div>
  <div style={{borderLeft:`2px solid ${W}`,paddingLeft:15}}><div style={{background:'#e1d7c5',padding:16,width:'65%'}}>Revisar</div><div style={{background:'#d1c1b9',padding:16,marginLeft:'12%',marginTop:12}}>Ejecutar zona liberada</div></div>
  <div style={{height:180,marginTop:12,visibility:hidePlan?'hidden':'visible'}}><Plan zones/></div>
</div>:<div style={{background:'#f1ece1',border:`1px solid ${brand.line}`,padding:16}}>
  <div style={{height:235}}><Plan zones={index===0} systems={index===1}/></div>
  <div style={{fontSize:27,color:W,lineHeight:1.25,marginTop:10}}>{index===0?'Zonas didácticas · detalle por revisar':'Propuesta · líneas de diseño'}</div>
</div>;
const MessagePhone=({frame,index,chrome=true,hidePlan=false}:{frame:number;index:number;chrome?:boolean;hidePlan?:boolean})=>{
  const m=messages[index]; const local=frame-(780+index*300),entrance=progress(local,0,24);
  return <>
    {chrome&&<><Header/>
    <div style={{position:'absolute',left:112,top:340}}><Badge dark>Antes del reinicio de 2025</Badge></div>
    <div style={{position:'absolute',left:112,top:425,fontSize:27,color:W}}>EQUIPO DEL CASO <span style={{opacity:.7}}>· personajes ficticios</span></div></>}
    <div style={{opacity:index===0?1:entrance,transform:`translate(34px,${45+(index===0?0:(1-entrance)*16)}px) scale(.88)`,transformOrigin:'78px 425px'}}>
      <Phone rect={{x:78,y:425,w:842,h:1110}} contact={`　${m.contact}`} message={m.text} attachment={<Attachment index={index} hidePlan={hidePlan}/>}/>
      <div style={{position:'absolute',left:105,top:462,width:52,height:52,borderRadius:'50%',background:W,color:S,fontWeight:700,fontSize:29,display:'grid',placeItems:'center'}}>{m.initial}</div>
      <div style={{position:'absolute',left:408,top:438,width:160,height:13,borderRadius:12,background:I}}/>
    </div>
    {index>0&&local<24&&<div style={{position:'absolute',left:140,top:490,width:660,padding:25,background:W,color:S,borderRadius:20,fontSize:35}}>Nuevo mensaje · {m.contact}</div>}
    {chrome&&<Footer/>}
  </>;
};
const Question=({frame}:{frame:number})=>{
  const q=progress(frame,1680,1716);
  return <AbsoluteFill style={{background:S}}>
    {frame<1693&&<div style={{position:'absolute',inset:0,opacity:1-progress(frame,1680,1693)}}><MessagePhone frame={1679} index={2} hidePlan/></div>}
    <div style={{position:'absolute',left:0,top:490,opacity:progress(frame,1690,1716)}}><StadiumView height={1000}/></div>
    {q<1&&<div style={{position:'absolute',left:338.5,top:1096.3,width:288,height:158.4,transform:`translate(${-200*q}px,${-350*q}px) scale(${lerp(1,2.4,q)})`,transformOrigin:'top left',opacity:1-q,background:'white'}}><Plan zones/></div>}
    <Header/>
    <div style={{position:'absolute',left:112,top:370,width:758,color:W,opacity:progress(frame,1700,1716)}}><div style={{...title,fontSize:85}}>¿Cómo retomas<br/>la obra?</div><div style={{fontSize:42,marginTop:30}}>Aprovechar lo construido</div></div>
    <div style={{position:'absolute',left:112,top:1305,fontSize:26,color:W,opacity:progress(frame,1700,1716)}}>Tres prioridades para organizar el arranque</div><Footer/>
  </AbsoluteFill>;
};
const BranchScene=({branch,frame}:{branch:Branch;frame:number})=>{
  const local=frame-({A:1860,B:2220,C:2580}[branch]),s=branchState(branch,local),o=options[branch];
  return <AbsoluteFill style={{background:S,color:W}}>
    <Header/>
    <div style={{position:'absolute',left:112,top:365,width:758,display:'flex',gap:28}}>
      <div style={{...title,fontSize:120}}>{branch}</div><div style={{...title,fontSize:62,whiteSpace:'pre-line',paddingTop:8}}>{o.title}</div>
    </div>
    <div style={{position:'absolute',left:0,top:500,height:640,overflow:'hidden',transform:'scale(.62)',transformOrigin:'top center',width:1080}}><StadiumView height={640}/></div>
    <div style={{position:'absolute',left:112,top:815,...label,fontSize:22}}>{branch==='C'?'DETALLE DIDÁCTICO · SOLO FRENTES DEPENDIENTES':'DETALLE DIDÁCTICO · VESTÍBULOS Y CONEXIÓN COMÚN'}</div>
    <div style={{position:'absolute',left:112,top:850,borderTop:`2px solid ${brand.line}`,borderBottom:`2px solid ${brand.line}`,width:758,height:352,overflow:'hidden'}}>
      <div style={{transform:'translateY(-53px) scale(.82)',transformOrigin:'top left'}}><WorkBays branch={branch} frame={local}/></div>
    </div>
    <div style={{position:'absolute',left:125,top:1160,width:720,display:'flex',justifyContent:'space-between',gap:14}}>
      {s.zones.map((status,i)=><div key={i} style={{background:S,border:`1px solid ${W}`,fontSize:23,padding:'8px 10px'}}><b>{i+1}</b> · {status}</div>)}
    </div>
    <div style={{position:'absolute',left:112,top:1225,fontSize:40,lineHeight:1.24,whiteSpace:'pre-line',fontWeight:700,width:758}}>{o.text}</div>
    <div style={{position:'absolute',left:112,top:1330,fontSize:23,width:758}}>{branch==='A'?'Documentación conjunta → movilizar terminación':branch==='B'?'Liberar → acabados locales · interfaces y puntos de parada':'Propuesta: ventilación + electricidad · frentes dependientes'}</div>
    <Footer/>
  </AbsoluteFill>;
};
const Vote=({frame}:{frame:number})=><AbsoluteFill style={{background:S,color:W}}>
  <Header/>
  <div style={{position:'absolute',left:112,top:370,...title,fontSize:100}}>¿A, B o C?</div>
  <div style={{position:'absolute',left:112,top:520,fontSize:42}}>Comenta tu decisión</div>
  <div style={{position:'absolute',left:112,top:620,display:'flex',gap:16,opacity:progress(frame,2940,2964),transform:`translateY(${(1-progress(frame,2940,2964))*24}px)`}}>
    {(['A','B','C'] as const).map(branch=><div key={branch} style={{width:240,height:720,border:`2px solid ${W}`,boxSizing:'border-box',position:'relative'}}>
      <div style={{padding:'22px 20px',...title,fontSize:88}}>{branch}</div>
      <Img src={staticFile('assets/ep42/stadium-overview.png')} style={{position:'absolute',top:120,width:236,height:160,objectFit:'cover'}}/>
      <div style={{position:'absolute',left:16,right:10,top:310,...title,fontSize:42,whiteSpace:'pre-line'}}>{branch==='A'?'REVISAR\nTODO\nPRIMERO':branch==='B'?'AVANZAR\nPOR\nZONAS':'ACTUALIZAR\nSISTEMAS\nPRIMERO'}</div>
      <Img src={staticFile(`assets/ep42/package-${branch}.png`)} style={{position:'absolute',top:480,width:236,height:115,objectFit:'cover'}}/>
      <div style={{position:'absolute',left:16,right:10,top:600,fontSize:29,lineHeight:1.3}}>{branch==='A'?'Certeza / espera':branch==='B'?'Avance / coordinación':'Sistemas / frentes dependientes'}</div>
    </div>)}
  </div><Footer/>
</AbsoluteFill>;
const EpisodeContent=()=>{
  const frame=useCurrentFrame();
  if(frame<600)return <Opening frame={frame}/>;
  if(frame<780)return <Desk frame={frame}/>;
  if(frame<1680)return <AbsoluteFill style={{background:S}}><MessagePhone frame={frame} index={Math.floor((frame-780)/300)}/></AbsoluteFill>;
  if(frame<1860)return <Question frame={frame}/>;
  if(frame<2940)return <BranchScene branch={frame<2220?'A':frame<2580?'B':'C'} frame={frame}/>;
  if(frame<3240)return <Vote frame={frame}/>;
  if(frame<3360)return <AbsoluteFill style={{background:W,color:S}}><div style={{opacity:.23,position:'absolute',top:500}}><StadiumView height={1000}/></div><Header light/><div style={{position:'absolute',left:112,top:600,width:758,...title,fontSize:85}}>Las consecuencias,<br/>en el siguiente<br/>vídeo</div><Footer light/></AbsoluteFill>;
  const q=progress(frame,3360,3384);
  return <AbsoluteFill style={{background:W,color:S}}><div style={{position:'absolute',left:112,top:350,width:758,opacity:q,transform:`translateY(${(1-q)*28}px)`}}>
    <div style={{width:120,height:8,background:S,marginBottom:65}}/>
    <div style={{...title,fontSize:82}}>Aprende gestión<br/>de proyectos</div>
    <div style={{fontSize:40,lineHeight:1.25,marginTop:35}}>con decisiones reales<br/>y simuladas.</div>
    <div style={{...title,fontSize:112,marginTop:100}}>ALBERTO<br/>VILLA</div>
    <div style={{fontSize:28,marginTop:60}}>Caso simulado · Nou Mestalla</div>
  </div></AbsoluteFill>;
};
export type EpisodeProps={assetMode:string};
export const Episode42=({assetMode='none'}:EpisodeProps)=> {
  if(assetMode.startsWith('workbay-'))return <LiveWorkBays branch={assetMode.split('-')[1] as Branch} frame={120}/>;
  if(assetMode.startsWith('inside'))return <LiveStadiumView inside frame={35} width={1080} height={1920} blueprint={assetMode==='inside-lines'?1:0}/>;
  if(assetMode.startsWith('overview-'))return <LiveStadiumView width={1080} height={Number(assetMode.split('-')[1])}/>;
  return <AbsoluteFill style={{fontFamily:brand.body}}><EpisodeContent/></AbsoluteFill>;
};
