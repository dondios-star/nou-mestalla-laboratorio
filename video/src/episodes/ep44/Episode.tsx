import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import '../../shared/brand/fonts';
import {brand} from '../../shared/brand/tokens';
import {progress, lerp} from '../../shared/motion/time';
import {Phone} from '../../shared/ui/Phone';
import {CommentStack, type Comment} from '../../shared/ui/CommentStack';
import {World, LiveWorld, projectPoint, projectPhone, zoneWorld} from './World';
import {options, sourceTime, type Choice} from './state';

const frameStyle:React.CSSProperties={fontFamily:brand.body,color:brand.ink};
const Label=({children,dark=false}:{children:React.ReactNode;dark?:boolean})=><div style={{fontSize:30,fontWeight:700,letterSpacing:1.5,color:dark?brand.sand:brand.wine}}>{children}</div>;
const Head=({children,size=78,style={}}:{children:React.ReactNode;size?:number;style?:React.CSSProperties})=><div style={{fontFamily:brand.heading,fontSize:size,lineHeight:1.09,...style}}>{children}</div>;
const Brand=({dark=false}:{dark?:boolean})=><div style={{position:'absolute',right:150,bottom:300,color:dark?brand.sand:brand.wine,fontFamily:brand.heading,fontSize:34,lineHeight:.98}}>ALBERTO<br/>VILLA</div>;
const Simulation=({dark=false}:{dark?:boolean})=><div style={{position:'absolute',left:76,top:145,fontSize:28,color:dark?brand.sand:brand.wine,letterSpacing:.3}}>NOU MESTALLA <span style={{opacity:.7}}> / Escenario simulado</span></div>;
const Data=({top=1320,dark=false}:{top?:number;dark?:boolean})=><div style={{position:'absolute',left:76,right:145,top,display:'grid',gap:10,fontSize:38,color:dark?brand.sand:brand.wine}}>
  {['2 trabajos listos','Resto: 6 semanas','Reserva con señal'].map((t,i)=><div key={t} style={{display:'flex',alignItems:'center',gap:17}}><span style={{fontFamily:brand.heading,fontSize:29,opacity:.55}}>0{i+1}</span>{t}</div>)}
</div>;
const extras:Comment[]=[
  ['HormigonSinEstrenar','El cemento sigue en borradores',392,-180,600],
  ['CamionSinDestino','He venido a hacer presencia',408,630,1100],
  ['TornilloSinPedido','Yo todavía no estoy contratado',430,-160,1340],
  ['JefeDeObraEnVisto','Mi mensaje sí ha arrancado',450,640,400],
  ['VARDeContratos','Revisando la firma',492,-100,520],
  ['ExcelSinCasco','En mi hoja ya estaba terminado',510,580,1250],
  ['CascoSinEncargo','Vestido para la ocasión',530,-150,1450],
  ['PedidoEnPretemporada','Todavía estamos calentando',548,650,620],
].map((r,i)=>({id:`side-${i}`,author:String(r[0]),text:String(r[1]),start:Number(r[2]),end:660,x:Number(r[3]),y:Number(r[4]),width:620,direction:i%2?1:-1}));
const main:Comment[]=[
  {id:'grua',author:'GruaEnPracticas',text:'La licencia no trae albañiles',start:360,end:497,x:88,y:750,width:830},
  {id:'excel',author:'PaquitoElDelExcel',text:'La obra está cargando...',start:480,end:650,x:88,y:750,width:830,direction:-1},
];

const PhoneScene=({source}:{source:number})=>{
  const q=progress(source,210,231);const scale=lerp(.014,1,q),anchor=projectPhone(source);
  return <div style={{position:'absolute',left:lerp(anchor.x,164,q),top:lerp(anchor.y,380,q),width:700,height:1150,scale,transformOrigin:'top left',opacity:source>=340?1-progress(source,340,368):1}}>
    <Phone detailed rect={{x:0,y:0,w:700,h:1150}} contact="Javi · Obra" message="Sin encargo cerrado no puedo arrancar" attachment={<div style={{fontWeight:700,fontSize:38,color:brand.wine,marginTop:40,borderTop:`2px solid ${brand.line}`,paddingTop:24}}>ENCARGO PENDIENTE</div>}/>
  </div>;
};
export const Opening=()=>{
  const f=useCurrentFrame(),source=sourceTime(f);
  return <AbsoluteFill style={frameStyle}>
    <World sourceFrame={source}/>
    <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(244,234,216,.12),transparent 55%,rgba(28,32,33,.35))'}}/>
    <Simulation/>
    <div style={{position:'absolute',left:76,top:264,opacity:progress(source,42,60)*(1-progress(source,198,225)),translate:`0 ${lerp(18,0,progress(source,42,60))}px`}}>
      <Head size={89}>TIENES PERMISO.</Head><Head size={89}>LA OBRA NO ARRANCA.</Head>
    </div>
    <PhoneScene source={source}/>
    {source>=350&&<AbsoluteFill style={{background:`rgba(31,24,29,${.45*progress(source,350,370)})`}}/>}
    <div style={{opacity:.36}}><CommentStack sourceFrame={source} comments={extras}/></div>
    <CommentStack sourceFrame={source} comments={main}/>
    {source>=360&&<div style={{position:'absolute',left:88,top:620,color:brand.sand,fontSize:30,letterSpacing:2}}>COMENTARIOS FICTICIOS</div>}
    {f>=600&&<div style={{position:'absolute',left:76,top:190,padding:'10px 20px',background:brand.wine,color:brand.sand,fontSize:40,lineHeight:1.15,fontWeight:700}}>↶ VOLVAMOS A LA DECISIÓN</div>}
    <Brand dark/>
  </AbsoluteFill>;
};

export const ModelView=({choice='base',action=0,labels=true}:{choice?:Choice;action?:number;labels?:boolean})=>{
  const l=projectPoint(zoneWorld.logistics),s=projectPoint(zoneWorld.storage),r=projectPoint(zoneWorld.resources);
  return <div style={{position:'relative',width:1080,height:810,overflow:'hidden'}}>
    <World map choice={choice} action={action} width={1080} height={810}/>
    <svg viewBox="0 0 1080 810" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      <defs><pattern id="hatch44" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(-32)"><path d="M0 0 V16" stroke={brand.wine} strokeOpacity=".25" strokeWidth="3"/></pattern></defs>
      <ellipse cx="505" cy="341" rx="278" ry="126" fill="url(#hatch44)" opacity=".48"/>
      {choice==='A'&&<g opacity={action}><path d={`M${l.x} ${l.y} L480 703 L${s.x} ${s.y}`} fill="none" stroke={brand.wine} strokeWidth="5"/><circle cx="480" cy="703" r="14" fill={brand.wine}/></g>}
      {choice==='B'&&<g opacity={action}><path d="M160 265 Q540 80 905 340 L950 625 Q560 835 170 610Z" fill="none" stroke={brand.wine} strokeWidth="6" strokeDasharray="16 10"/><path d="M550 686 V731" stroke={brand.wine} strokeWidth="5"/></g>}
      {choice==='C'&&<g opacity={action}><ellipse cx={r.x} cy={r.y} rx="125" ry="68" fill="none" stroke={brand.wine} strokeWidth="6"/></g>}
    </svg>
    {labels&&<>
      <div style={{position:'absolute',left:l.x-145,top:l.y+12,padding:'8px 17px',background:brand.sand,color:brand.wine,fontSize:30,fontWeight:700}}>LOGÍSTICA</div>
      <div style={{position:'absolute',left:s.x-55,top:s.y+5,padding:'8px 17px',background:brand.sand,color:brand.wine,fontSize:30,fontWeight:700}}>ACOPIO</div>
      <div style={{position:'absolute',left:278,top:288,fontSize:29,fontWeight:700,color:brand.wine,background:brand.sand,padding:'7px 15px'}}>RESTO · DISEÑO PENDIENTE</div>
    </>}
  </div>;
};

export const Briefing=()=>{
  const f=useCurrentFrame();
  return <AbsoluteFill style={{...frameStyle,background:brand.sand}}>
    <Simulation/>
    <div style={{position:'absolute',left:76,top:275,opacity:progress(f,0,18)}}><Label>JULIO 2024 · LICENCIA CONCEDIDA</Label><Head style={{marginTop:35}}>AHORA DIRIGES<br/>EL NOU MESTALLA.</Head></div>
    <div style={{position:'absolute',top:615}}><ModelView/></div>
    <div style={{position:'absolute',left:76,right:145,top:1430,fontSize:44,lineHeight:1.25}}>Empezar trabajo útil.<br/><b>Sin contratar a ciegas.</b></div>
    <Brand/>
  </AbsoluteFill>;
};

const conversations = [
  {contact:'Javi · Obra',message:'Dos trabajos listos y separados. Podemos coordinarlos',header:'ALCANCE CERRADO',summary:'2 trabajos listos'},
  {contact:'Lucía · Arquitectura',message:'El diseño del resto tarda seis semanas',header:'DISEÑO PENDIENTE',summary:'2 trabajos listos · Resto: 6 semanas'},
  {contact:'Marta · Compras',message:'Cuadrilla disponible. Reserva hasta mañana; señal no reembolsable',header:'OFERTA DE RESERVA',summary:'2 trabajos listos · Resto: 6 semanas'},
];
export const Evidence=({index,settled=false,hideModel=false}:{index:number;settled?:boolean;hideModel?:boolean})=>{
  const localFrame=useCurrentFrame();const f=settled?999:localFrame;const c=conversations[index];
  return <AbsoluteFill style={{...frameStyle,background:brand.sand}}>
    <Simulation/><div style={{position:'absolute',left:76,top:248}}><Label>ANTES DE MOVILIZAR / 0{index+1}</Label></div>
    <div style={{position:'absolute',left:125,top:355,width:760,height:1170}}>
      <Phone detailed rect={{x:0,y:0,w:760,h:1170}} contact={c.contact} message={c.message} messageStyle={{opacity:progress(f,0,18),translate:`0 ${lerp(12,0,progress(f,0,18))}px`}} attachment={<>
        <div data-object="attachment-44" style={{height:380,position:'relative',overflow:'hidden',marginLeft:-15,marginRight:-15,borderRadius:16,background:'#E5DBCA'}}>{!hideModel&&<div style={{scale:.575,transformOrigin:'top left'}}><ModelView/></div>}</div>
        {index===0&&<div style={{fontSize:31,fontWeight:700,color:brand.wine,marginTop:14}}>LOGÍSTICA + ACOPIO</div>}
        {index===2&&<div style={{fontSize:31,fontWeight:700,color:brand.wine,marginTop:14}}>RESERVAR ≠ ORDENAR LA OBRA</div>}
        {index===1&&<div style={{display:'flex',gap:5,marginTop:14}}>{[1,2,3,4,5,6].map(n=><div key={n} style={{flex:1,background:brand.wine,color:brand.sand,fontSize:29,textAlign:'center',padding:'15px 0'}}>S{n}</div>)}</div>}
      </>}/>
    </div>
    {index>0&&<div style={{position:'absolute',left:125,top:1570,fontSize:31,color:brand.wine}}>{c.summary}</div>}
    <Brand/>
  </AbsoluteFill>;
};

export const Question=()=>{
  const f=useCurrentFrame(),q=progress(f,0,36);
  return <AbsoluteFill style={{...frameStyle,background:brand.sand}}>
    <div style={{position:'absolute',inset:0,opacity:1-progress(f,0,18)}}><Evidence index={2} settled hideModel/></div>
    <Simulation/><div style={{position:'absolute',left:76,top:270,opacity:progress(f,20,36)}}><Label>TU PRIMERA PRIORIDAD</Label><Head style={{marginTop:32}}>¿CÓMO EMPEZARÍAS?</Head></div>
    <div style={{position:'absolute',top:lerp(788.2,530,q),left:lerp(176,0,q),height:lerp(380/.575,810,q),overflow:'hidden',scale:lerp(.575,1,q),transformOrigin:'top left',borderRadius:lerp(28,0,q)}}><ModelView/></div>
    <div style={{opacity:progress(f,20,36)}}><Data top={1345}/></div><Brand/>
  </AbsoluteFill>;
};

export const Alternative=({choice}:{choice:'A'|'B'|'C'})=>{
  const f=useCurrentFrame(),{fps}=useVideoConfig();const a=progress(f,.4*fps,2.5*fps),o=options[choice];
  return <AbsoluteFill style={{...frameStyle,background:brand.sand}}>
    <Simulation/><div style={{position:'absolute',left:76,top:255,opacity:progress(f,0,24)}}>
      <Label>¿QUÉ ACTIVARÍAS PRIMERO?</Label>
      <div style={{display:'flex',alignItems:'center',gap:25,marginTop:26}}><span style={{fontFamily:brand.heading,fontSize:110,color:brand.wine}}>{choice}</span><Head size={65}>{o.title}</Head></div>
    </div>
    <div style={{position:'absolute',top:500}}><ModelView choice={choice} action={a}/><div style={{position:'absolute',left:76,top:45,fontSize:27,color:brand.wine}}>MAQUETA EDITORIAL · ZONAS DEL SUPUESTO</div></div>
    <div style={{position:'absolute',left:76,top:606,width:820,display:'flex',gap:18,opacity:a,fontSize:31,fontWeight:700,color:brand.wine}}>
      {choice==='A'?<><div style={{background:'#E3D7C5',padding:'8px 15px'}}>2 ENCARGOS</div><div style={{padding:'8px 15px'}}>1 COORDINACIÓN</div></>:choice==='B'?<div style={{background:'#E3D7C5',padding:'8px 15px'}}>ESTA OFERTA EXIGE EL DISEÑO · 6 SEM.</div>:<><div style={{background:'#E3D7C5',padding:'8px 15px'}}>RESERVADO</div><div style={{padding:'8px 15px'}}>SEÑAL COMPROMETIDA</div></>}
    </div>
    <div style={{position:'absolute',left:76,top:1310,right:145,fontSize:44,lineHeight:1.32}}><b>{o.benefit}</b><br/>{o.cost}</div>
    <div style={{position:'absolute',left:76,top:1460,right:145,borderTop:`2px solid ${brand.line}`,paddingTop:18,fontSize:31,color:brand.wine}}>2 trabajos listos · Resto: 6 semanas<br/>Reserva con señal</div>
    <Brand/>
  </AbsoluteFill>;
};

export const Decision=()=>{
  const f=useCurrentFrame();
  return <AbsoluteFill style={{...frameStyle,background:brand.wine,color:brand.sand}}>
    <Simulation dark/>
    <div style={{position:'absolute',left:76,top:265,right:145}}><Head size={90}>¿A, B O C?</Head><div style={{fontSize:52,marginTop:22}}>¿Qué riesgo asumirías?</div></div>
    <div style={{position:'absolute',left:76,right:145,top:570,display:'grid',gap:20}}>
      {(['A','B','C'] as const).map((key,i)=><div key={key} style={{height:220,display:'flex',alignItems:'center',gap:24,padding:'25px 32px',boxSizing:'border-box',background:brand.sand,color:brand.wine,borderRadius:18,opacity:progress(f,i*4,18+i*4),translate:`0 ${lerp(18,0,progress(f,i*4,18+i*4))}px`}}>
        <div style={{fontFamily:brand.heading,fontSize:96,width:85,flexShrink:0}}>{key}</div><div><Head size={56}>{options[key].short}</Head><div style={{fontSize:37,marginTop:12}}>{options[key].risk}</div></div>
      </div>)}
    </div>
    <Data top={1325} dark/><Brand dark/>
  </AbsoluteFill>;
};
export const Signature=()=> <AbsoluteFill style={{...frameStyle,background:brand.wine,color:brand.sand}}>
  <div style={{position:'absolute',top:1070,opacity:.18,maskImage:'linear-gradient(to bottom, transparent, black 25%, black 70%, transparent)'}}><World map width={1080} height={810}/></div>
  <div style={{position:'absolute',left:76,top:330}}><Label dark>NOU MESTALLA / 44</Label><Head size={160} style={{marginTop:68}}>ALBERTO<br/>VILLA</Head><div style={{width:800,height:3,background:brand.sand,opacity:.5,margin:'50px 0'}}/><div style={{fontSize:43,lineHeight:1.4}}>Hechos reales.<br/>Decisión simulada.</div></div>
</AbsoluteFill>;

export type Episode44Props={renderLayer?:'final'|'hero'|'map-base'|'map-a'};
export const Episode44=({renderLayer='final'}:Episode44Props)=>{
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  if(renderLayer==='hero')return <LiveWorld sourceFrame={frame}/>;
  if(renderLayer==='map-base')return <LiveWorld map width={1080} height={810}/>;
  if(renderLayer==='map-a')return <LiveWorld map width={1080} height={810} choice="A" action={frame/126}/>;
  return <AbsoluteFill>
    <Sequence name="01–04 · Obra, comentarios y rebobinado" from={0} durationInFrames={12*fps} premountFor={fps}><Opening/></Sequence>
    <Sequence name="05 · Ahora diriges" from={12*fps} durationInFrames={3*fps} premountFor={fps}><Briefing/></Sequence>
    <Sequence name="06 · Javi / alcance" from={15*fps} durationInFrames={4*fps} premountFor={fps}><Evidence index={0}/></Sequence>
    <Sequence name="07 · Lucía / diseño" from={19*fps} durationInFrames={4*fps} premountFor={fps}><Evidence index={1}/></Sequence>
    <Sequence name="08 · Marta / reserva" from={23*fps} durationInFrames={4*fps} premountFor={fps}><Evidence index={2}/></Sequence>
    <Sequence name="09 · Tu prioridad" from={27*fps} durationInFrames={3*fps} premountFor={fps}><Question/></Sequence>
    <Sequence name="10 · A" from={30*fps} durationInFrames={7*fps} premountFor={fps}><Alternative choice="A"/></Sequence>
    <Sequence name="11 · B" from={37*fps} durationInFrames={7*fps} premountFor={fps}><Alternative choice="B"/></Sequence>
    <Sequence name="12 · C" from={44*fps} durationInFrames={7*fps} premountFor={fps}><Alternative choice="C"/></Sequence>
    <Sequence name="13 · Decide" from={51*fps} durationInFrames={6*fps} premountFor={fps}><Decision/></Sequence>
    <Sequence name="14 · Firma" from={57*fps} durationInFrames={2*fps} premountFor={fps}><Signature/></Sequence>
  </AbsoluteFill>;
};
