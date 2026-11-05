import React from 'react';
import {AbsoluteFill,Sequence,useCurrentFrame,useVideoConfig} from 'remotion';
import '../../shared/brand/fonts';
import {brand} from '../../shared/brand/tokens';
import {progress,lerp,mixRect} from '../../shared/motion/time';
import {OpeningSceneAtFrame,Scarf} from './Opening';
import {openingSourceFrame,options} from './timeline';
import {Maquette,type ModelState} from './NouMestalla3D';

const label:React.CSSProperties={fontSize:32,fontWeight:700,letterSpacing:2};
const Head=({children,style}:{children:React.ReactNode;style?:React.CSSProperties})=><div style={{fontFamily:brand.heading,fontSize:82,lineHeight:1.13,...style}}>{children}</div>;
const Marker=()=> <div style={{position:'absolute',left:80,top:170,...label}}>2007 · SIMULACIÓN</div>;
function Laptop({children,style}:{children?:React.ReactNode;style?:React.CSSProperties}){return <div style={{position:'absolute',width:920,height:900,left:80,top:430,background:'#cccac3',border:'18px solid #353939',borderRadius:20,boxSizing:'border-box',boxShadow:'0 22px 60px #31251e35',...style}}>
 <div style={{height:45,background:'linear-gradient(#596970,#36484f)',color:'#fff',fontSize:26,padding:'5px 16px',boxSizing:'border-box'}}>Correo del proyecto <span style={{float:'right'}}>— □ ×</span></div>
 <div style={{height:50,fontSize:26,padding:'9px 20px',borderBottom:'2px solid #aaa',boxSizing:'border-box'}}>Archivo　Editar　Ver　Mensaje</div>{children}
 <div style={{position:'absolute',left:-52,right:-52,bottom:-110,height:92,background:'linear-gradient(#6d7170,#424746)',clipPath:'polygon(4% 0,96% 0,100% 80%,98% 100%,2% 100%,0 80%)',borderRadius:10}}><div style={{position:'absolute',left:'12%',right:'12%',top:10,height:44,background:'repeating-linear-gradient(90deg,#282d2d 0,#282d2d 24px,#6c7371 25px,#6c7371 28px)',border:'4px solid #555c5a'}}/></div>
 </div>;}
function Email({which,frame}:{which:number;frame:number}){
 const f=frame,start=which===0?1200:1500,q=progress(f,start,start+24);
 return <Laptop><div style={{height:70,display:'flex',gap:4,padding:'14px 18px 0',boxSizing:'border-box',fontSize:29,fontWeight:700}}>{['Marta','Diego','Lucía'].map((s,i)=><div key={s} style={{flex:1,padding:'10px 16px',background:i===which?'#faf7ef':'#adafa8',borderRadius:'8px 8px 0 0',color:brand.ink,boxShadow:i===which?'inset 0 5px #4b1931':undefined}}>{s}{i>which?' ·':''}</div>)}</div>
 <div style={{background:'#faf7ef',height:619,padding:'36px 35px',boxSizing:'border-box',opacity:q,translate:`${(1-q)*20}px 0`}}>
 <div style={{fontSize:38,fontWeight:700}}>{which===0?'Marta · Finanzas':'Diego · Obra'}</div>
 <div style={{fontSize:31,color:'#796c6c',marginTop:15,paddingBottom:24,borderBottom:'2px solid #d4cfc5'}}>Asunto: {which===0?'Fondos para la obra':'Primer compromiso'}</div>
 <div style={{fontSize:50,lineHeight:1.3,fontWeight:700,marginTop:37}}>{which===0?<>La venta sigue sin cerrar.<br/><br/>Financiar toda la obra exige nuevas garantías.</>:<>Hay fondos para terminar una primera fase.<br/><br/>Incluyen protección y pausa. No la apertura.</>}</div>
 <div style={{fontSize:30,marginTop:30,color:'#796c6c'}}>▧ {which===0?'Venta pendiente':'Paquete de trabajo · adjunto'}</div>
 </div>
 </Laptop>;
}
function PlanWorld({frame:f}:{frame:number}){
 const option=f>=2550?2:f>=2280?1:0;
 const start=[2010,2280,2550][option],end=[2280,2550,2820][option];
 const active=f>=2010&&f<2820;
 const state:ModelState=f>=1740&&f<2010?'B':active?(['A','B','C'] as const)[option]:'plan';
 const activation=active?progress(f,start+24,start+90)*(1-progress(f,end-24,end)):1;
 const settle=progress(f,720,740);
 let modelY=500,modelScale=1;
 if(f>=900&&f<1200)modelY=430;
 if(f>=1200&&f<1740){modelY=1300;modelScale=.45;}
 if(f>=1740&&f<1800){const q=progress(f,1740,1799);modelY=lerp(1300,390,q);modelScale=lerp(.45,1,q);}
 if(f>=1800)modelY=390;
 if(f>=2796){const q=progress(f,2796,2840);modelY=lerp(390,330,q);modelScale=lerp(1,.66,q);}
 return <AbsoluteFill style={{background:'#e1d5c1',color:brand.wine}}>
 <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 30% 40%,#f4ead8 0%,#e1d5c1 65%,#b9a68c 100%)'}}/>
 <Marker/>
 <div style={{position:'absolute',left:0,top:modelY,width:1080,height:1000,scale:modelScale,transformOrigin:'50% 0%',opacity:f>=1170&&f<1740?.45:1}}><Maquette state={state} activation={activation} two={f>=900&&f<1200} frame={f}/></div>
 {f<900&&<><Head style={{position:'absolute',left:80,top:280,width:850,opacity:settle,translate:`0 ${(1-settle)*25}px`}}>AHORA DIRIGES TÚ<br/>EL NOU MESTALLA</Head>
 <div style={{position:'absolute',left:115,top:1260,width:820,height:6,background:brand.wine,scale:`${progress(f,740,780)} 1`,transformOrigin:'left'}}/>
 <div style={{position:'absolute',left:125,top:1320,fontSize:40,fontWeight:700,width:770,textAlign:'center',opacity:progress(f,770,790)}}>Antes de contratar toda la obra</div>
 <div style={{position:'absolute',left:670,top:1410,width:300,height:190,scale:.5,transformOrigin:'top left',opacity:.9}}><Laptop style={{left:0,top:0,width:600,height:380}}/></div></>}
 {f>=900&&f<1200&&<><Head style={{position:'absolute',left:80,top:280,width:860,fontSize:77}}>DOS ESTADIOS.<br/>UNA DEPENDENCIA.</Head>
 <div style={{position:'absolute',left:80,top:935,width:430,fontSize:35,fontWeight:700}}>MESTALLA EXISTENTE</div><div style={{position:'absolute',left:600,top:935,fontSize:35,fontWeight:700}}>NOU MESTALLA</div>
 <div style={{position:'absolute',left:480,top:1045,width:280,borderTop:'5px dashed #97707e',scale:`${progress(f,960,1019)} 1`,transformOrigin:'left'}}/>
 <div style={{position:'absolute',left:758,top:1013,fontSize:50}}>?</div>
 <Head style={{position:'absolute',left:80,top:1330,width:870,fontSize:68}}>Dinero previsto<br/>≠ dinero disponible</Head></>}
 {f>=960&&f<1224&&(()=>{const r=mixRect({x:95,y:1030,w:380,h:170},{x:80,y:430,w:920,h:900},progress(f,1170,1223));return <div style={{position:'absolute',left:r.x,top:r.y,width:r.w,height:r.h,background:brand.sand,border:'3px solid #97707e',borderRadius:12,boxShadow:'0 12px 25px #34252d20',opacity:progress(f,960,1019)*(1-progress(f,1200,1224)),overflow:'hidden'}}><div style={{position:'absolute',left:30,top:32,width:320,fontSize:34,fontWeight:700}}>Venta pendiente</div><div style={{position:'absolute',left:30,top:93,fontSize:28}}>Terrenos / derechos</div></div>;})()}
 {f>=1200&&f<1770&&<div style={{opacity:1-progress(f,1740,1770)}}>
 <Head style={{position:'absolute',left:80,top:280,fontSize:70,opacity:1-progress(f,1740,1750)}}>LAS PRUEBAS DEL CASO</Head>
 <Email which={f<1500?0:1} frame={f}/></div>}
 {f>=1740&&f<1800&&<div style={{position:'absolute',left:80,top:280,fontSize:50,fontWeight:700,opacity:progress(f,1750,1768)}}>Primera fase · cierre protegido</div>}
 {f>=1800&&f<2010&&<div style={{position:'absolute',left:80,top:730,width:850,boxSizing:'border-box',padding:'34px 40px 45px',background:'#faf7ef',borderTop:'10px solid #4b1931',boxShadow:'0 20px 50px #2c241d30',opacity:progress(f,1800,1823),translate:`0 ${(1-progress(f,1800,1823))*30}px`}}>
 <div style={{fontSize:35,fontWeight:700,marginBottom:32}}>Lucía · Tesorería</div>
 <div style={{fontSize:51,lineHeight:1.3,fontWeight:700}}>Préstamo puente:<br/>vence en 12 meses.</div>
 <div style={{margin:'26px 0 35px',height:5,background:brand.wine,position:'relative'}}><div style={{position:'absolute',right:0,top:-9,width:5,height:23,background:brand.wine}}/></div>
 <div style={{fontSize:48,lineHeight:1.3}}>Venta:<br/>sin fecha confirmada.</div>
 <div style={{marginTop:24,width:'95%',borderTop:'5px dashed #97707e'}}/>
 <div style={{fontSize:30,marginTop:34,color:'#78656b'}}>Refinanciación no garantizada</div>
 </div>}
 {active&&<><div style={{position:'absolute',left:80,top:285,...label,fontSize:38}}>¿QUÉ COMPROMETES?</div>
 <div style={{position:'absolute',left:80,top:1060,width:850,height:5,background:brand.wine}}/>
 <div style={{position:'absolute',left:80,top:1110,width:850,opacity:progress(f,start,start+23)*(1-progress(f,end-24,end)),translate:`${(1-progress(f,start,start+23))*35}px 0`}}>
 <div style={{display:'flex',gap:28,alignItems:'flex-start'}}><div style={{width:90,height:106,flexShrink:0,display:'grid',placeItems:'center',background:brand.wine,color:brand.sand,fontFamily:brand.heading,fontSize:80}}>{options[option].letter}</div><Head style={{fontSize:62,lineHeight:1.13}}>{options[option].title}</Head></div>
 <div style={{marginTop:35,fontSize:43,fontWeight:700,lineHeight:1.35}}>{options[option].benefit}</div>
 <div style={{marginTop:23,fontSize:37,lineHeight:1.3}}>{options[option].cost}</div>
 </div>
 <div style={{position:'absolute',left:80,top:970,fontSize:33,fontWeight:700}}>{options[option].status}</div>
 {option===1&&<div style={{position:'absolute',left:80,top:1505,fontSize:30}}>No abierto al público · maqueta ilustrativa</div>}
 </>}
 {f>=2820&&f<3150&&<><Head style={{position:'absolute',left:80,top:260,width:850,fontSize:70}}>¿Cuánta obra arrancas<br/>con una venta pendiente?</Head>
 <div style={{position:'absolute',left:80,top:820,width:850,height:5,background:brand.wine}}/>
 <div style={{position:'absolute',left:80,top:865,width:850,opacity:progress(f,2820,2849)}}>{options.map((o,i)=><div key={o.letter} style={{display:'flex',gap:24,alignItems:'center',minHeight:136,borderBottom:'2px solid #b6a59a',background:brand.sand,padding:'15px 18px',boxSizing:'border-box',translate:`${(1-progress(f,2820+i*3,2843+i*3))*35}px 0`}}><div style={{fontFamily:brand.heading,fontSize:66,width:70,color:brand.wine}}>{o.letter}</div><div style={{fontSize:44,fontWeight:700,lineHeight:1.22}}>{o.short}</div></div>)}</div>
 <div style={{position:'absolute',left:80,top:1322,width:850,fontSize:31,lineHeight:1.4}}>Venta sin fecha · Fase cerrable<br/>Puente a 12 meses</div>
 <div style={{position:'absolute',left:80,top:1450,width:850,fontWeight:700,fontSize:41}}>A, B o C: ¿qué comprometerías?</div>
 </>}
 {f>=3150&&<><Scarf style={{left:80,top:1050,width:950,height:180,rotate:'-6deg'}}/><Head style={{position:'absolute',left:80,top:290,width:850,fontSize:80,opacity:progress(f,3150,3168)}}>En el siguiente:<br/>qué arriesgas<br/>con A, B y C</Head></>}
 <div style={{position:'absolute',left:80,top:1660,fontSize:28,color:'#806b66'}}>ALBERTO VILLA　/　41</div>
 </AbsoluteFill>;
}
function Ending(){const f=useCurrentFrame(),q=progress(f,0,24);return <AbsoluteFill style={{background:brand.wine,color:brand.sand,clipPath:`inset(${(1-q)*55}% ${(1-q)*8}% ${(1-q)*44}% ${(1-q)*8}%)`}}><div style={{position:'absolute',left:80,top:340,width:850,opacity:q}}><div style={{...label,marginBottom:70}}>NOU MESTALLA · 41</div><Head style={{fontSize:92,lineHeight:1.18}}>Aprende gestión<br/>de proyectos<br/>con casos ficticios</Head><div style={{width:100,height:7,background:brand.sand,marginTop:65}}/><Head style={{fontSize:102,marginTop:65}}>Alberto Villa</Head><div style={{fontSize:44,marginTop:70}}>Más casos en la bio</div></div></AbsoluteFill>;}
export const NouMestalla41Decision=()=>{
 const frame=useCurrentFrame(),{fps}=useVideoConfig();
 return <AbsoluteFill style={{fontFamily:brand.body,background:brand.sand,overflow:'hidden'}}>
 <Sequence name="Recreación, comentarios e historia" from={0} durationInFrames={9*fps} premountFor={fps}><OpeningSceneAtFrame sourceFrame={frame}/></Sequence>
 <Sequence name="Rebobinado de los mismos estados" from={9*fps} durationInFrames={108} premountFor={fps}><OpeningSceneAtFrame sourceFrame={openingSourceFrame(frame)}/><AbsoluteFill style={{background:'#64666d',mixBlendMode:'saturation',opacity:.45}}/><div style={{position:'absolute',left:80,top:1760,color:brand.sand,fontSize:30}}>◀◀</div></Sequence>
 <Sequence name="Viaje adicional al plan de 2007" from={648} durationInFrames={72} premountFor={fps}><PlanWorld frame={720}/><div style={{position:'absolute',inset:0,clipPath:`inset(0 0 ${progress(frame,648,719)*100}% 0)`}}><OpeningSceneAtFrame sourceFrame={0}/></div></Sequence>
 <Sequence name="Simulación, pruebas, alternativas y decisión" from={12*fps} durationInFrames={43*fps} premountFor={fps}><PlanWorld frame={frame}/></Sequence>
 <Sequence name="Cierre Alberto Villa" from={55*fps} durationInFrames={4*fps} premountFor={fps}><PlanWorld frame={3299}/><Ending/></Sequence>
 </AbsoluteFill>;
};
