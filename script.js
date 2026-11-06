/* ===== EDIT YOUR LETTER HERE ===== */
const LETTER=`Happy Birthday Acy!

Hope this day, your birthday would give you so much fun. Be happy always! They say every year is a new chapter, so I hope this one is full of kind people, good memories, and plenty of reasons to laugh. You deserve a life that feels as light as today.

I wish you a great day, maskig unsa pa ka daghan imong problema, talk to me lang para dungagan HAHAHAHHA. Growing up isn't about having all the answers, it's about choosing to keep going, and you already do that so well. Don't be too hard on yourself, okay? You're doing better than you think.

HAPPY BIRTHDAY AGAIN! Wish you to be happy and healthy always!

From Kuya Saj!`;

/* pixel script font: [startRow, ...rows]; rows 0-7 caps/ascenders, 3-7 x-height, 8-10 descenders. Auto-slanted + bolded. */
const G={
H:[0,'X.....X','X.....X','X.....X','XXXXXXX','X.....X','X.....X','X.....X','X.....X'],
A:[0,'...X...','..X.X..','.X...X.','.X...X.','XXXXXXX','X.....X','X.....X','X.....X'],
B:[0,'XXXXX.','X....X','X....X','XXXXX.','X....X','X....X','X....X','XXXXX.'],
a:[3,'.XXX..','....X.','.XXXX.','X...X.','.XXXX.'],
p:[3,'X.XX..','XX..X.','X...X.','XX..X.','X.XX..','X.....','X.....','X.....'],
y:[3,'X...X.','X...X.','X...X.','.XXXX.','....X.','....X.','...X..','XXX...'],
i:[1,'X','.','X','X','X','X','XX'],
r:[3,'X.XX','XX..','X...','X...','X...'],
t:[1,'.X..','.X..','XXX.','.X..','.X..','.X..','.XX.'],
h:[0,'X....','X....','X....','X.XX.','XX..X','X...X','X...X','X...X'],
d:[0,'....X','....X','....X','.XX.X','X..XX','X...X','X..XX','.XX.X'],
c:[3,'.XXX','X...','X...','X...','.XXX'],
'!':[0,'X','X','X','X','X','X','.','X']};
function glyph(ch){
  if(ch===' ')return '<i style="display:block;width:calc(var(--u)*4);height:1px"></i>';
  const g=G[ch];if(!g)return '';const s0=g[0],rows=g.slice(1);let w=0;rows.forEach(r=>w=Math.max(w,r.length));
  let d='';
  rows.forEach((r,j)=>{const y=s0+j,sh=Math.round((7-y)*.25),f=[];
    for(let i=0;i<r.length;i++)if(r[i]==='X'){f[i]=1;f[i+1]=1}
    for(let i=0;i<=w;i++)if(f[i]&&!f[i-1]){let n=i;while(f[n])n++;d+=`M${i+sh} ${y}h${n-i}v1h-${n-i}z`}});
  return `<svg viewBox="0 0 ${w+1} 11" style="width:calc(var(--u)*${w+1});height:calc(var(--u)*11)"><path d="${d}"/></svg>`;
}
function word(id,s){const el=document.getElementById(id);[...s].forEach((ch,i)=>{const e=document.createElement('span');e.innerHTML=glyph(ch);e.style.animationDelay=`-${i*.09}s,-${i*.3}s`;el.appendChild(e)})}
word('t1','Happy Birthday');word('t2','Acy!');

const c=document.getElementById('c'),x=c.getContext('2d',{alpha:false});
let W=130,H=260,ps=3,floorY=160,baseY=200,wstars=[],envX=-9999;
let A,master,T0=0,loop=0,next=0,nb,lit=true,hype=0,burstDone=false,heartT=0;
const spb=.4;
const P=['#ff4fa3','#ffd23f','#3ee6c4','#3ea0ff','#ff8a3d','#ffffff'];
const PL={c:'#6fe3a8',e:'#2f9f6b',h:'#b5f5d3'},PR={c:'#ffd666',e:'#d9a21e',h:'#fff0b0'};
const BP=[['#ff4fa3','#b82a73'],['#ffd23f','#c9961a'],['#3ee6c4','#1f9c84'],['#3ea0ff','#1f6cc0'],['#ff8a3d','#c25a16'],['#ff6b6b','#b83a3a'],['#8ff0ff','#4fb0c4']];

/* ---------- pixel helpers (everything is made of square pixels) ---------- */
const R=(a,b,w,h,k)=>{x.fillStyle=k;x.fillRect(Math.round(a),Math.round(b),w,h)};
function E(cx,cy,rx,ry,k){x.fillStyle=k;cx=Math.round(cx);cy=Math.round(cy);
  for(let dy=-ry;dy<=ry;dy++){const hw=Math.round(rx*Math.sqrt(Math.max(0,1-(dy*dy)/((ry+.5)*(ry+.5)))));x.fillRect(cx-hw,cy+dy,hw*2+1,1)}}
const EO=(cx,cy,rx,ry,k,e)=>{E(cx,cy,rx+1,ry+1,e);E(cx,cy,rx,ry,k)};
const HS=['.X.X.','XXXXX','.XXX.','..X..'];
function bm(m,px,py,k){x.fillStyle=k;px=Math.round(px);py=Math.round(py);m.forEach((row,j)=>{for(let i=0;i<row.length;i++)if(row[i]==='X')x.fillRect(px+i,py+j,1,1)})}
function line(x0,y0,x1,y1,k){x.fillStyle=k;const n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0),1);for(let i=0;i<=n;i++)x.fillRect(Math.round(x0+(x1-x0)*i/n),Math.round(y0+(y1-y0)*i/n),1,1)}
function plus(px,py,k){R(px-1,py,3,1,k);R(px,py-1,1,3,k)}
const hexv=h=>[1,3,5].map(i=>parseInt(h.substr(i,2),16));
function mix(a,b,m){const p1=hexv(a),p2=hexv(b);return 'rgb('+p1.map((v,k)=>Math.round(v+(p2[k]-v)*m)).join(',')+')'}

function fit(){
  const vw=innerWidth,vh=innerHeight;ps=Math.max(3,Math.round(Math.min(vw,vh)/125));
  W=Math.ceil(vw/ps);H=Math.ceil(vh/ps);c.width=W;c.height=H;c.style.width=W*ps+'px';c.style.height=H*ps+'px';x.imageSmoothingEnabled=false;
  floorY=Math.round(H*(H/W>1.4?.6:.72));baseY=floorY+Math.round((H-floorY)*.4);
  let s=5;const rnd=()=>{s=(s*9301+49297)%233280;return s/233280};
  wstars=Array.from({length:14},()=>[rnd(),rnd()]);
}
addEventListener('resize',fit);fit();

/* ---------- room ---------- */
function room(t){
  const nbands=6;for(let i=0;i<nbands;i++){const y0=Math.floor(i*floorY/nbands),y1=Math.floor((i+1)*floorY/nbands);R(0,y0,W,y1-y0,mix('#1b3358','#2f5d8a',i/(nbands-1)))}
  for(let yy=4,r=0;yy<floorY-4;yy+=8,r++)for(let xx=(r%2)*4+2;xx<W;xx+=8)R(xx,yy,1,1,'#3a6b9e');
  for(let y=floorY,r=0;y<H;y+=6,r++){R(0,y,W,6,r%2?'#9a6a45':'#a47349');R(0,y+5,W,1,'#684229');for(let xx=(r%2)*12;xx<W;xx+=24)R(xx,y,1,5,'#684229')}
  R(0,floorY-3,W,3,'#f3e8d4');R(0,floorY,W,1,'#b9a98a');
}
function windowDraw(t){
  const ww=30,wh=38,x0=Math.round(W*.17)-15,y0=Math.round(floorY*.5)-19;
  R(x0-8,y0-6,ww+16,2,'#c9a46a');R(x0-9,y0-7,2,4,'#e0c080');R(x0+ww+7,y0-7,2,4,'#e0c080');
  R(x0-2,y0-2,ww+4,wh+4,'#f3e8d4');
  const sk=['#0f2552','#16356a','#1f4682','#2b5a9e'];
  for(let i=0;i<4;i++){const a=Math.floor(i*wh/4),b=Math.floor((i+1)*wh/4);R(x0,y0+a,ww,b-a,sk[i])}
  wstars.forEach((q,i)=>{if(Math.floor(t*2+i)%3!==0)R(x0+Math.floor(q[0]*ww),y0+Math.floor(q[1]*wh*.6),1,1,'#fff')});
  E(x0+21,y0+9,4,4,'#fff3c0');R(x0+19,y0+8,2,2,'#e6d596');R(x0+22,y0+11,1,1,'#e6d596');
  for(let q=0;q<ww;q++){const hh=4+Math.round(Math.sin(q/4)*1.5+Math.sin(q/9)*2);R(x0+q,y0+wh-hh,1,hh,'#0b1d3a')}
  R(x0+15,y0,1,wh,'#f3e8d4');R(x0,y0+19,ww,1,'#f3e8d4');
  R(x0-4,y0+wh+2,ww+8,2,'#f3e8d4');
  [x0-10,x0+ww].forEach(cx=>{R(cx,y0-5,10,wh+10,'#ff8fa3');R(cx+3,y0-5,1,wh+10,'#e0708a');R(cx+7,y0-5,1,wh+10,'#e0708a');R(cx,y0+wh+5,10,1,'#d96a86')});
  for(let i=0;i<9;i++){if(Math.floor(t*3+i)%3)R(x0-8+i*4,y0-4,2,2,P[i%5])}
}
function bunting(t){
  const sag=7;for(let q=0;q<W;q++)R(q,Math.round(1+sag*Math.sin(Math.PI*q/(W-1))),1,1,'#ffffff');
  const n=Math.ceil(W/13);for(let i=0;i<n;i++){const fx=Math.round((i+.5)*W/n),fy=Math.round(1+sag*Math.sin(Math.PI*fx/(W-1)))+1,sw=Math.round(Math.sin(t*3+i));
    for(let r=0;r<4;r++)R(fx-3+r+sw,fy+r,7-2*r,1,P[i%5])}
}
function bal(cx,cy,pr){EO(cx,cy,4,5,pr[0],pr[1]);R(cx-2,cy-3,1,2,'#ffffff');R(cx-1,cy+6,3,1,pr[1]);R(cx,cy+7,1,1,pr[1])}
function bunch(gx,t,side){
  const ay=baseY-8,L=[[-8,-24,0],[-1,-31,1],[7,-25,2],[-5,-39,3],[4,-36,4],[11,-32,5]];
  const pos=L.map(([dx,dy,k],i)=>[gx+dx*side+Math.round(Math.sin(t*.9+i+side)*1.5),ay+dy,k]);
  pos.forEach(q=>line(gx,ay,q[0],q[1]+8,'#cfd8e6'));
  pos.forEach(q=>bal(q[0],q[1],BP[q[2]]));
}
function gift(cx,by,n,c1,c2){
  const hw=n>>1,bh=Math.round(n*.65);
  R(cx-hw-1,by,n+2,1,'#4a2e1c');R(cx-hw,by-bh,n,bh,c1);R(cx-hw-1,by-bh-3,n+2,3,c2);R(cx-1,by-bh-3,2,bh+3,c2);R(cx-3,by-bh-5,3,2,c2);R(cx+1,by-bh-5,3,2,c2);
}
function scenery(t,d){
  room(t);windowDraw(t);bunting(t);
  [.22,.36,.5,.64,.78].forEach((f,i)=>{const bx=Math.round(W*f+Math.sin(t*.8+i)*3),by=Math.round(H+14-((t*8+i*52)%(H+44)));
    line(bx,by+8,bx+Math.round(Math.sin(t*2+i)),by+16,'#cfd8e6');bal(bx,by,BP[(i*2)%7])});
  const g1=Math.round(W*.08),g2=Math.round(W*.92);
  bunch(g1,t,1);bunch(g2,t,-1);
  gift(g1,baseY+2,12,'#3ea0ff','#ffd23f');gift(g2,baseY+2,12,'#ff4fa3','#ffffff');gift(g1+11,baseY+4,9,'#3ee6c4','#ff4fa3');
  const rx=Math.min(Math.round(W*.45),Math.round(d/2+30)),rc=baseY+1;
  E(W/2,rc,rx,7,'#ff8fa3');E(W/2,rc,rx-3,5,'#ffd0da');E(W/2,rc,rx-6,3,'#ff8fa3');
}

/* ---------- characters ---------- */
function cake(cx,by,t){
  R(cx-15,by-1,31,2,'#eaf6ff');
  R(cx-13,by-10,27,9,'#ff7eb6');R(cx-13,by-10,27,3,'#ffffff');
  for(let i=0;i<7;i++)R(cx-12+i*4,by-7,2,2,'#ffffff');
  ['#ffd23f','#3ee6c4','#3ea0ff','#ffffff','#ffd23f'].forEach((k,i)=>R(cx-10+i*5,by-5,1,1,k));
  for(let i=0;i<13;i++)R(cx-12+i*2,by-3,1,1,'#ffffff');
  R(cx-8,by-17,17,7,'#ffe08a');R(cx-8,by-17,17,2,'#ffffff');
  [-7,5].forEach(o=>{R(cx+o,by-19,3,2,'#ff3d5a');R(cx+o+1,by-20,1,1,'#4cc46a')});
  [-4,0,4].forEach((o,i)=>{
    R(cx+o,by-24,1,7,i%2?'#ff7eb6':'#ffffff');R(cx+o,by-22,1,1,'#3ea0ff');
    if(lit){const f=Math.floor(t*9+o)%2;R(cx+o-1,by-28+f,3,4,'rgba(255,220,120,.25)');R(cx+o,by-27+f,1,2,'#ff9f1a');R(cx+o,by-26+f,1,1,'#fff6b0')}
  });
}
function env(cx,by,t){
  R(cx-12,by-16,25,16,'#e3c98f');R(cx-11,by-15,23,14,'#fffdf5');
  for(let r=0;r<9;r++){R(cx-11+r,by-15+r,23-2*r,1,'#fff0cc');R(cx-11+r,by-15+r,1,1,'#e3c98f');R(cx+11-r,by-15+r,1,1,'#e3c98f')}
  bm(HS,cx-2,by-10,'#ff4f6d');
  [[-17,-12],[17,-8],[2,-21],[-18,-3]].forEach((q,i)=>{if(Math.floor(t*4+i)%2)plus(cx+q[0],by+q[1],'#ffd23f')});
}
function ear(ax,ay,sd,col,edge){
  const x0=ax+sd*9,rowv=i=>{const out=Math.floor(i*.3),inn=Math.min(i,6);return sd<0?[x0-out,x0+inn]:[x0-inn,x0+out]};
  for(let i=0;i<10;i++){const [xl,xr]=rowv(i);R(xl-1,ay-35+i,xr-xl+3,1,edge)}
  for(let i=1;i<10;i++){const [xl,xr]=rowv(i);R(xl,ay-35+i,xr-xl+1,1,col)}
  for(let i=4;i<10;i++){const [xl,xr]=rowv(i);R(xl+1,ay-35+i,Math.max(1,xr-xl-1),1,'#ffb3cb')}
}
function thick(pts,edge,col){
  [[2,4,edge],[1,2,col]].forEach(([o,sz,k])=>{x.fillStyle=k;
    for(let s=0;s<pts.length-1;s++){const a=pts[s],b=pts[s+1],n=Math.max(Math.abs(b[0]-a[0]),Math.abs(b[1]-a[1]),1);
      for(let i=0;i<=n;i++)x.fillRect(Math.round(a[0]+(b[0]-a[0])*i/n)-o,Math.round(a[1]+(b[1]-a[1])*i/n)-o,sz,sz)}})}
function alien(ax,ay,pal,t,beat,ph,item){
  const cat=item==='cake',col=pal.c,edge=pal.e,hl=pal.h,hxs=cat?15:12,open=Math.sin(beat*Math.PI*2+ph)>0;
  [-1,1].forEach(sd=>thick([[ax+sd*5,ay-9],[ax+sd*14,ay-14],[ax+sd*hxs,ay-40]],edge,col));
  EO(ax,ay-7,6,6,col,edge);
  R(ax-7,ay-2,6,3,edge);R(ax+2,ay-2,6,3,edge);
  bm(HS,ax-2,ay-10,hl);
  [-1,1].forEach(sd=>{if(cat)ear(ax,ay,sd,col,edge);else{EO(ax+sd*9,ay-28,4,4,col,edge);E(ax+sd*9,ay-28,2,2,'#ffb3cb')}});
  R(ax,ay-33,1,4,edge);bm(HS,ax-2,ay-38,'#ff6f9c');
  EO(ax,ay-19,12,10,col,edge);
  R(ax-8,ay-26,4,1,hl);R(ax-9,ay-25,1,2,hl);
  const bl=Math.floor(t*1.5+ph)%9===0;
  [-1,1].forEach(sd=>{const ex=ax+sd*5;
    if(bl)R(ex-3,ay-19,7,1,'#1f2a44');
    else{E(ex,ay-19,3,4,'#1f2a44');R(ex+1,ay-22,2,2,'#ffffff');R(ex-2,ay-17,1,1,'#ffffff')}
    R(ax+sd*9-1,ay-15,3,2,'#ff7aa8')});
  if(open){R(ax-1,ay-14,3,2,'#6b1230');R(ax,ay-13,1,1,'#ff7a95')}
  else{[[-2,-14],[-1,-13],[0,-14],[1,-13],[2,-14]].forEach(q=>R(ax+q[0],ay+q[1],1,1,'#1f2a44'))}
  [[-20,-30,0],[19,-22,1.7]].forEach(q=>{if(Math.floor(t*4+q[2])%2)plus(ax+q[0],ay+q[1],'#fff6a0')});
  cat?cake(ax,ay-40,t):env(ax,ay-40,t);
}

/* ---------- particles & fireworks ---------- */
const pt=[],hs=[],rk=[],sp=[];
const FC=['#ff4fa3','#ffd23f','#3ee6c4','#3ea0ff','#ff8a3d','#ff6b6b','#ffffff','#8ff0ff'];
function spawn(){pt.push({x:Math.random()*W,y:-2,vx:0,vy:12+Math.random()*14,g:0,s:Math.random()*6,c:P[Math.floor(Math.random()*6)],z:Math.random()<.5?1:2})}
function burst(px,py,n){for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,s=40+Math.random()*80;pt.push({x:px,y:py,vx:Math.cos(a)*s,vy:Math.sin(a)*s-60,g:200,s:0,c:P[i%6],z:2})}}
function launch(){const ty=H*(.08+Math.random()*.3),T=.6+Math.random()*.2;
  rk.push({x:W*(.1+Math.random()*.8),y:H+3,vx:(Math.random()-.5)*8,vy:-(H+3-ty)/T,ty,c:FC[Math.floor(Math.random()*FC.length)]})}
function explode(ex,ey,c){
  const hshape=Math.random()<.45,n=hshape?40:56,c2=FC[Math.floor(Math.random()*FC.length)];
  for(let i=0;i<n;i++){let vx,vy;
    if(hshape){const a=i/n*Math.PI*2;vx=16*Math.pow(Math.sin(a),3)*2.4;vy=-(13*Math.cos(a)-5*Math.cos(2*a)-2*Math.cos(3*a)-Math.cos(4*a))*2.4}
    else{const a=Math.random()*Math.PI*2,s=16+Math.sqrt(Math.random())*32;vx=Math.cos(a)*s;vy=Math.sin(a)*s}
    const life=1.1+Math.random()*.5;sp.push({x:ex,y:ey,vx,vy,life,max:life,c:i%3?c:c2})}
}
function particles(t,dt,lx,rx){
  if(Math.random()<.9&&pt.length<260)spawn();if(Math.random()<.5&&pt.length<260)spawn();
  for(let i=pt.length-1;i>=0;i--){const p=pt[i];p.vy+=p.g*dt;p.x+=p.vx*dt+(p.g?0:Math.sin(t*3+p.s)*6*dt);p.y+=p.vy*dt;
    if(p.g)p.vx*=1-Math.min(1,dt*1.2);
    if(p.y>H+3||p.x<-4||p.x>W+4){pt.splice(i,1);continue}R(p.x,p.y,p.z,p.z,p.c)}
  heartT-=dt;if(heartT<=0&&t>2.5){heartT=.5+Math.random()*.5;const px=Math.random()<.5?lx:rx;hs.push({x:px+(Math.random()-.5)*24,y:baseY-45,life:2.2,c:Math.random()<.5?'#ff6f9c':'#ffd23f'})}
  for(let i=hs.length-1;i>=0;i--){const p=hs[i];p.life-=dt;if(p.life<=0){hs.splice(i,1);continue}p.y-=12*dt;if(p.life>.6||Math.floor(p.life*12)%2)bm(HS,p.x,p.y,p.c)}
  for(let i=rk.length-1;i>=0;i--){const r=rk[i];r.x+=r.vx*dt;r.y+=r.vy*dt;R(r.x,r.y,1,3,'#ffffff');R(r.x,r.y+3,1,3,r.c);
    if(r.y<=r.ty){explode(r.x,r.y,r.c);rk.splice(i,1)}}
  for(let i=sp.length-1;i>=0;i--){const p=sp[i];p.life-=dt;if(p.life<=0){sp.splice(i,1);continue}
    p.vx*=1-dt*1.1;p.vy=p.vy*(1-dt*1.1)+30*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;
    const f=p.life/p.max;if(f<.25&&Math.floor(p.life*30)%2)continue;
    const sz=f>.45?2:1;R(p.x,p.y,sz,sz,p.c);if(f>.6)R(p.x-p.vx*.05,p.y-p.vy*.05,1,1,p.c)}
}

/* ---------- singer, lyrics & chaos ---------- */
const F={A:['.X.','X.X','XXX','X.X','X.X'],B:['XX.','X.X','XX.','X.X','XX.'],C:['.XX','X..','X..','X..','.XX'],D:['XX.','X.X','X.X','X.X','XX.'],E:['XXX','X..','XX.','X..','XXX'],H:['X.X','X.X','XXX','X.X','X.X'],I:['XXX','.X.','.X.','.X.','XXX'],O:['XXX','X.X','X.X','X.X','XXX'],P:['XX.','X.X','XX.','X..','X..'],R:['XX.','X.X','XX.','X.X','X.X'],T:['XXX','.X.','.X.','.X.','.X.'],U:['X.X','X.X','X.X','X.X','XXX'],Y:['X.X','X.X','.X.','.X.','.X.']};
const NOTE=['.XXX','.X..','.X..','XX..','XX..'];
function txt(s,cx,y,k,sc){
  const w=s.length*4*sc-sc,x0=Math.round(cx-w/2);
  [[-1,0,'#000'],[1,0,'#000'],[0,-1,'#000'],[0,1,'#000'],[1,1,'#000'],[0,0,k]].forEach(([ox,oy,kk])=>{x.fillStyle=kk;
    [...s].forEach((ch,ci)=>{const g=F[ch];if(!g)return;g.forEach((r,j)=>{for(let i=0;i<3;i++)if(r[i]==='X')x.fillRect(x0+ci*4*sc+i*sc+ox,Math.round(y)+j*sc+oy,sc,sc)})})})}
const SY='HAP PY BIRTH DAY TO YOU HAP PY BIRTH DAY TO YOU HAP PY BIRTH DAY DEAR A CY HAP PY BIRTH DAY TO YOU'.split(' ');
const SB=[];
const lw=[];let sylI=-1,sylT=-9,singX=0,singY=0;
function say(i){
  const w=SY[i],big=w.length<4;
  lw.push({s:w,x:singX,y:singY-44,vx:(Math.random()-.5)*30,vy:-(16+Math.random()*10),life:2.1,max:2.1,c:P[i%6],sc:big?3:2,ph:Math.random()*6});
  for(let k=0;k<2;k++)lw.push({n:1,x:singX+(Math.random()-.5)*10,y:singY-30,vx:(Math.random()-.5)*50,vy:-(20+Math.random()*20),life:1.6,max:1.6,c:P[(i+k+2)%6],ph:Math.random()*6});
  if(i%6===5){burst(singX,singY-30,24);hype=1}
}
function drawLw(t,dt){
  for(let i=lw.length-1;i>=0;i--){const q=lw[i];q.life-=dt;if(q.life<=0){lw.splice(i,1);continue}
    q.x+=q.vx*dt+Math.sin(t*9+q.ph)*14*dt;q.y+=q.vy*dt;
    if(q.life<.4&&Math.floor(q.life*20)%2)continue;
    const px=Math.max(10,Math.min(W-10,q.x));
    if(q.n){x.fillStyle='#000';NOTE.forEach((r,j)=>{for(let k=0;k<4;k++)if(r[k]==='X')x.fillRect(Math.round(px)+k+1,Math.round(q.y)+j+1,1,1)});bm(NOTE,px,q.y,q.c)}
    else txt(q.s,px,q.y,P[Math.floor(t*14+i)%6],q.sc)}
}
function singer(cx,y,t,mo,sw){
  const C1='#9b8cff',E1='#5a4bc4';cx=Math.round(cx+sw);
  E(cx,y+1,10,2,'rgba(0,0,0,.35)');
  R(cx-6,y-2,5,3,E1);R(cx+2,y-2,5,3,E1);
  EO(cx,y-7,6,6,C1,E1);
  thick([[cx-5,y-9],[cx-11,y-14],[cx-13,y-20-Math.round(Math.sin(t*12)*3)]],E1,C1);
  thick([[cx+5,y-9],[cx+8,y-13],[cx+7,y-17]],E1,C1);
  EO(cx,y-19,11,9,C1,E1);
  for(let r=0;r<9;r++){const w=2+r;R(cx-(w>>1),y-37+r,w,1,r%3===0?'#ffd23f':'#ff4fa3')}
  E(cx,y-38,1,1,'#ffffff');
  [-1,1].forEach(sd=>{E(cx+sd*4,y-21,2,3,'#1f2a44');R(cx+sd*4,y-23,1,1,'#fff');R(cx+sd*7-1,y-16,3,2,'#ff7aa8')});
  E(cx,y-14,3,mo,'#6b1230');if(mo>2)R(cx-1,y-14+mo-1,3,1,'#ff7a95');
  E(cx+7,y-19,2,2,'#d8dde8');R(cx+7,y-17,1,2,'#333');
  [[-17,-24,0],[17,-30,1.3]].forEach(q=>{if(Math.floor(t*6+q[2])%2)plus(cx+q[0],y+q[1],'#fff6a0')});
}
function beams(t){
  [[.2,0],[.5,2],[.8,4]].forEach(([f,o],i)=>{const bx=W*f,a=Math.sin(t*1.7+o)*.7;x.globalAlpha=.11;
    for(let y=0;y<floorY;y+=1)R(bx+y*a-(3+y*.1),y,6+y*.2,1,P[(Math.floor(t*2)+i)%6]);x.globalAlpha=1})}
setTimeout(()=>setInterval(()=>{if(!document.hidden){launch();if(Math.random()<.6)setTimeout(launch,150);if(Math.random()<.3)setTimeout(launch,300)}},1000),3000);

/* ---------- loop ---------- */
function draw(t,beat,dt){
  const e=Math.min(1,t/3),ee=1-Math.pow(1-e,3);
  const d=Math.max(40,Math.min(Math.round(W*.3),56));
  scenery(t,d);beams(t);
  const jump=Math.abs(Math.sin(beat*Math.PI)),j=Math.round(jump*(e<1?3:2)+(.6+hype)*2.5*Math.abs(Math.sin(t*14)));
  const wob=e>=1?Math.round(Math.sin(t*5)*2):0,lx=Math.round(-20+((W/2-d/2)+20)*ee)+wob,rx=Math.round((W+20)+((W/2+d/2)-(W+20))*ee)-wob;
  E(lx,baseY+1,10,2,'rgba(0,0,0,.35)');E(rx,baseY+1,10,2,'rgba(0,0,0,.35)');
  alien(lx,baseY-j,PL,t,beat,0,'cake');
  envX=rx;alien(rx,baseY-j,PR,t,beat,3,'env');
  if(!SB.length)M.reduce((a,m)=>{SB.push(a);return a+m[1]},0);
  const bt=((beat%24)+24)%24;let si=0;while(si+1<SB.length&&SB[si+1]<=bt)si++;
  singX=W/2;singY=Math.min(baseY+16,H-3);
  if(si!==sylI){sylI=si;sylT=t;if(t>2)say(si)}
  const mo=t-sylT<.16?5:(t-sylT<.5?3:1);
  singer(singX,singY-Math.round(Math.abs(Math.sin(beat*Math.PI*2))*3),t,t>2?mo:1,Math.round(Math.sin(t*6)*2));
  particles(t,dt,lx,rx);drawLw(t,dt);
  const fl=Math.pow(1-(beat%1),3)*.14;x.globalAlpha=fl;R(0,0,W,H,P[Math.floor(beat)%6]);x.globalAlpha=1;
  const sk=(beat%1<.18&&t>3)?1:0;c.style.transform=sk?`translate(${Math.round((Math.random()-.5)*2.5*ps)}px,${Math.round((Math.random()-.5)*2.5*ps)}px)`:'';
}
let last=performance.now();const t0=last;
function frame(n){
  const dt=Math.min(.05,(n-last)/1000);last=n;const t=(n-t0)/1000;
  hype=Math.max(0,hype-dt*1.5);
  const beat=(A&&A.state==='running')?Math.max(0,A.currentTime-T0)/spb:t/spb;
  if(t>3&&!burstDone){burstDone=true;burst(W/2,baseY-45,70);hype=1}
  draw(t,beat,dt);requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

/* ---------- the letter ---------- */
const lt=document.getElementById('lt'),la=document.getElementById('la'),lb=document.getElementById('lb');
let typer,fwTimer,openedAt=0;
function openLetter(){
  lt.classList.add('on');let i=0;clearInterval(typer);clearInterval(fwTimer);openedAt=performance.now();
  burst(W/2,baseY-45,70);hype=1;
  for(let k=0;k<7;k++)setTimeout(launch,k*200);
  fwTimer=setInterval(()=>{launch();if(Math.random()<.6)setTimeout(launch,200)},850);
  typer=setInterval(()=>{i=Math.min(LETTER.length,i+2);la.textContent=LETTER.slice(0,i);lb.textContent=LETTER.slice(i);if(i>=LETTER.length)clearInterval(typer)},14);
}
function closeLetter(){if(performance.now()-openedAt<500)return;clearInterval(typer);clearInterval(fwTimer);lt.classList.remove('on')}
lt.onclick=closeLetter;
c.addEventListener('pointerdown',e=>{
  if(lt.classList.contains('on'))return;
  const r=c.getBoundingClientRect(),px=(e.clientX-r.left)/ps,py=(e.clientY-r.top)/ps;
  if(Math.abs(px-envX)<20&&py>baseY-64&&py<baseY+5)openLetter();
});

/* ---------- happy birthday music ---------- */
const mf=m=>440*Math.pow(2,(m-69)/12);
const M=[[67,.75],[67,.25],[69,1],[67,1],[72,1],[71,2],[67,.75],[67,.25],[69,1],[67,1],[74,1],[72,2],
[67,.75],[67,.25],[79,1],[76,1],[72,1],[71,1],[69,1],[77,.75],[77,.25],[76,1],[72,1],[74,1],[72,2]];
const C={C:[48,60,64,67],G:[43,59,62,67],F:[41,60,65,69]},CH=['C','G','G','C','C','F','F','C'];
function tone(type,f,t,d,g){const o=A.createOscillator(),v=A.createGain();o.type=type;o.frequency.value=f;
  v.gain.setValueAtTime(.0001,t);v.gain.linearRampToValueAtTime(g,t+.01);v.gain.setValueAtTime(g,t+d*.6);v.gain.exponentialRampToValueAtTime(.0001,t+d);
  o.connect(v);v.connect(master);o.start(t);o.stop(t+d+.05)}
function nz(t,d,g,f){const s=A.createBufferSource(),hp=A.createBiquadFilter(),v=A.createGain();s.buffer=nb;hp.type='highpass';hp.frequency.value=f;
  v.gain.setValueAtTime(g,t);v.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(hp);hp.connect(v);v.connect(master);s.start(t);s.stop(t+d)}
function kick(t){const o=A.createOscillator(),v=A.createGain();o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(40,t+.12);
  v.gain.setValueAtTime(.5,t);v.gain.exponentialRampToValueAtTime(.0001,t+.18);o.connect(v);v.connect(master);o.start(t);o.stop(t+.2)}
function pl(){
  const s=[0,2,4][loop++%3],S0=next;next+=24*spb;let t=0;
  M.forEach(([m,d])=>{tone('triangle',mf(m+s),S0+t*spb,d*spb*.9,.13);tone('sine',mf(m+s+12),S0+t*spb,d*spb*.9,.05);t+=d});
  for(let b=0;b<8;b++){
    const T=S0+b*3*spb,ch=C[CH[b]];
    kick(T);tone('triangle',mf(ch[0]+s),T,spb*.85,.22);
    [1,2].forEach(k=>{ch.slice(1).forEach(m=>tone('sine',mf(m+s),T+spb*k,spb*.3,.04));nz(T+spb*k,.08,.1,1800)});
    [.5,1.5,2.5].forEach(k=>nz(T+spb*k,.03,.05,7000));
  }
}
function initAudio(){
  try{
    A=new (window.AudioContext||window.webkitAudioContext)();master=A.createGain();master.gain.value=.8;master.connect(A.destination);
    nb=A.createBuffer(1,Math.floor(A.sampleRate*.2),A.sampleRate);const d=nb.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
    A.resume();next=A.currentTime+.15;T0=next;pl();
    setInterval(()=>{if(A.currentTime+2>next)pl()},250);
    document.addEventListener('visibilitychange',()=>{if(document.hidden)A.suspend()});
  }catch(e){A=null}
}
initAudio();
['pointerdown','touchstart','keydown','click'].forEach(ev=>addEventListener(ev,()=>{if(A&&A.state==='suspended')A.resume()},{passive:true}));
