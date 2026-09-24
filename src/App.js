import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { LEVELS } from './data/levels';

const START_HEARTS = 5;
const SPEED = 0.72;

function Hearts({ value }) {
  return <div className="hearts" aria-label={`${value} de 5 vidas`}>{[0,1,2,3,4].map(i => <span key={i} className={i < value ? 'heart on' : 'heart off'}>♥</span>)}</div>;
}

function Progress({ value }) {
  return <div className="progress-box"><div className="progress-label"><span>Progresso</span><b>{value}%</b></div><div className="progress-track"><div className="progress-fill" style={{ width: `${value}%` }} /></div></div>;
}

function Menu({ start }) {
  return <main className="full menu"><div className="menu-card"><span className="badge">RPG EDUCATIVO</span><img className="menu-player" src="/assets/personagem/personagem.png" alt="Personagem" /><p className="eyebrow">SEMANA DO TRÂNSITO</p><h1>CAMINHO SEGURO</h1><p className="subtitle">Faça escolhas responsáveis, enfrente situações do trânsito e encontre o caminho de volta para casa.</p><button className="main-btn" onClick={start}>COMEÇAR A AVENTURA</button><div className="mini-info"><span>❤️ 5 vidas</span><span>📈 progresso</span><span>🛵 mobilidade elétrica</span></div><div className="marreco">🐥 Você pode encontrar um marreco durante a aventura.</div></div></main>;
}

function Story({ type, next }) {
  const work = type === 'work';
  const file = work ? 'trabalho.png' : 'casa.png';
  return <main className={`full story ${work ? 'work' : 'home'}`} style={{ backgroundImage: `linear-gradient(rgba(8,12,18,.30), rgba(8,12,18,.66)), url("/assets/cenarios/${file}")` }}><div className="story-card"><span className="badge">{work ? 'INÍCIO' : 'CHEGADA'}</span><h1>{work ? 'Hora de ir para casa' : 'Você chegou em casa!'}</h1><p>{work ? 'Seu trabalho terminou. Agora começa o trajeto. As decisões no caminho vão determinar o resultado da aventura.' : 'Você concluiu os desafios e voltou para casa com mais atenção e responsabilidade no trânsito.'}</p>{!work && <div className="marreco">🐥 Marreco: missão concluída!</div>}<button className="main-btn" onClick={next}>{work ? 'SAIR DO TRABALHO' : 'VER RESULTADO'}</button></div></main>;
}

function Choice({ event, choose }) {
  return <div className="modal-backdrop"><section className="event-card"><div className="event-icon">{event.icon}</div><span className="badge light">SITUAÇÃO DE TRÂNSITO</span><h2>{event.title}</h2><p className="desc">{event.description}</p><p className="question">{event.question}</p><div className="choices">{event.choices.map((c,i)=><button className="choice" key={i} onClick={()=>choose(c)}><span>{String.fromCharCode(65+i)}</span>{c.text}</button>)}</div></section></div>;
}

function Reward({ reward, last, next }) {
  return <div className="modal-backdrop"><section className="reward-card"><div className="spark">✦</div><span className="badge light">RECOMPENSA DESBLOQUEADA</span><div className="reward-icon">{reward.icon}</div><h2>{reward.name}</h2><p>{reward.description}</p>{reward.image && <img className="reward-car" src={reward.image} alt={reward.name} />}<button className="main-btn" onClick={next}>{last ? 'IR PARA CASA' : 'PRÓXIMO NÍVEL'}</button></section></div>;
}

function GameWorld({ level, position, direction, completed, openEvent }) {
  const left = useMemo(() => level.events.filter(e => !completed.includes(e.id)), [level.events, completed]);
  return <div className={`world level-${level.id}`} style={{ backgroundImage: `linear-gradient(rgba(9,11,15,.03), rgba(9,11,15,.12)), url("${level.map}")`, backgroundPosition: level.mapPosition }}>
    {left.map(e => <button key={e.id} className="marker" style={{left:`${e.x}%`, top:`${e.y}%`}} onClick={()=>openEvent(e)} aria-label={`Abrir ${e.title}`}>{e.icon}<small>!</small></button>)}
    <div className={`player player-${direction}`} style={{left:`${position.x}%`, top:`${position.y}%`}}><img src="/assets/personagem/atrás.png" alt="Jogador" /></div>
    <div className="controls"><b>🚗 CONTROLES</b><span>WASD / setas para movimentar</span><span>Vá até os marcadores !</span></div>
    <div className="drive-signal">🚗 <strong>DIRIJA</strong><span>WASD / SETAS</span></div>
    {completed.length === 0 && <div className="objective"><b>OBJETIVO</b>Encontre os desafios e faça escolhas seguras.</div>}
  </div>;
}

function Game({ levelIndex, hearts, progress, position, direction, completed, event, setEvent, answer, openEvent }) {
  const level = LEVELS[levelIndex];
  return <main className="full game-shell"><header className="hud"><div className="title"><small>NÍVEL {level.id}/3</small><strong>{level.title.replace(/^Nível \d+ — /,'')}</strong></div><Progress value={progress}/><Hearts value={hearts}/></header><div className="subtitle-bar">{level.description}</div><GameWorld level={level} position={position} direction={direction} completed={completed} openEvent={openEvent}/>{event && <Choice event={event} choose={answer}/>}</main>;
}

function GameOver({ restart }) {
  return <main className="full result"><section className="result-card"><div className="big-icon">💥</div><span className="badge light">FIM DA TENTATIVA</span><h1>Você perdeu todas as vidas</h1><p>O progresso da aventura foi perdido. Recomece e tente tomar decisões mais seguras.</p><button className="main-btn" onClick={restart}>TENTAR NOVAMENTE</button></section></main>;
}

function Victory({ rewards, restart }) {
  return <main className="full result victory"><section className="result-card"><div className="big-icon">🏠</div><span className="badge light">MISSÃO CONCLUÍDA</span><h1>Você voltou para casa!</h1><p>Os três níveis foram concluídos e as recompensas abaixo foram desbloqueadas.</p><div className="collection">{rewards.map(r=><div className="collection-item" key={r.name}><span>{r.icon}</span><div><b>{r.name}</b><small>{r.type}</small></div></div>)}</div><button className="main-btn" onClick={restart}>NOVA AVENTURA</button></section></main>;
}

export default function App() {
  const [screen, setScreen] = useState('menu');
  const [levelIndex, setLevelIndex] = useState(0);
  const [hearts, setHearts] = useState(START_HEARTS);
  const [progress, setProgress] = useState(0);
  const [position, setPosition] = useState(LEVELS[0].startPosition);
  const [direction, setDirection] = useState('down');
  const [completed, setCompleted] = useState([]);
  const [event, setEvent] = useState(null);
  const [rewards, setRewards] = useState([]);
  const keys = useRef(new Set());
  const frame = useRef(null);

  const resetLevel = useCallback((index) => {
    const l = LEVELS[index];
    setLevelIndex(index); setHearts(START_HEARTS); setProgress(0); setCompleted([]); setEvent(null); setPosition(l.startPosition); setDirection('down');
  }, []);

  const start = () => { setRewards([]); resetLevel(0); setScreen('work'); };
  const restart = () => { setRewards([]); resetLevel(0); setScreen('game'); };

  useEffect(() => {
    if (screen !== 'game' || event) return;
    const down = e => keys.current.add(e.key.toLowerCase());
    const up = e => keys.current.delete(e.key.toLowerCase());
    window.addEventListener('keydown', down); window.addEventListener('keyup', up);
    const loop = () => {
      let dx=0, dy=0;
      if(keys.current.has('a')||keys.current.has('arrowleft')) dx--;
      if(keys.current.has('d')||keys.current.has('arrowright')) dx++;
      if(keys.current.has('w')||keys.current.has('arrowup')) dy--;
      if(keys.current.has('s')||keys.current.has('arrowdown')) dy++;
      if(dx||dy){
        setDirection(Math.abs(dx)>Math.abs(dy) ? (dx>0?'right':'left') : (dy>0?'down':'up'));
        setPosition(p=>({x:Math.max(10,Math.min(90,p.x+dx*SPEED)), y:Math.max(7,Math.min(92,p.y+dy*SPEED))}));
      }
      frame.current=requestAnimationFrame(loop);
    };
    frame.current=requestAnimationFrame(loop);
    return ()=>{ cancelAnimationFrame(frame.current); window.removeEventListener('keydown',down); window.removeEventListener('keyup',up); };
  }, [screen,event]);

  const level = LEVELS[levelIndex];
  useEffect(()=>{
    if(screen!=='game'||event) return;
    const near = level.events.find(e=>!completed.includes(e.id)&&Math.hypot(e.x-position.x,e.y-position.y)<6);
    if(near){ setEvent(near); keys.current.clear(); }
  },[position,screen,event,level,completed]);

  const answer = choice => {
    if(!event) return;
    if(choice.correct){
      const next=[...completed,event.id]; setCompleted(next); setProgress(p=>Math.min(100,p+choice.progress)); setEvent(null); keys.current.clear();
      if(next.length===level.events.length){ setRewards(r=>[...r,level.reward]); setScreen('reward'); }
    } else {
      const left=hearts-1; setHearts(left); setEvent(null); keys.current.clear(); setPosition(level.startPosition); if(left<=0) setScreen('gameover');
    }
  };

  const next = () => {
    if(levelIndex===LEVELS.length-1){ setScreen('home'); return; }
    resetLevel(levelIndex+1); setScreen('game');
  };

  if(screen==='menu') return <Menu start={start}/>;
  if(screen==='work') return <Story type="work" next={()=>{resetLevel(0);setScreen('game')}}/>;
  if(screen==='gameover') return <GameOver restart={restart}/>;
  if(screen==='reward') return <><Game levelIndex={levelIndex} hearts={hearts} progress={progress} position={position} direction={direction} completed={completed} event={null} setEvent={setEvent} answer={answer} openEvent={setEvent}/><Reward reward={level.reward} last={levelIndex===LEVELS.length-1} next={next}/></>;
  if(screen==='home') return <Story type="home" next={()=>setScreen('victory')}/>;
  if(screen==='victory') return <Victory rewards={rewards} restart={start}/>;
  return <Game levelIndex={levelIndex} hearts={hearts} progress={progress} position={position} direction={direction} completed={completed} event={event} setEvent={setEvent} answer={answer} openEvent={setEvent}/>;
}
