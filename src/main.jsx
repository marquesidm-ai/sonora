import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Home, Library, Search, Heart, ListMusic, Play, Pause, SkipBack, SkipForward, Volume2, Upload, Music2 } from 'lucide-react';
import './styles.css';

const demoTracks = [
  { id: 1, title: 'Sua primeira música', artist: 'SONORA', album: 'Minha Biblioteca', duration: '0:00' },
  { id: 2, title: 'Adicione seus MP3', artist: 'Sua coleção', album: 'Biblioteca pessoal', duration: '0:00' },
  { id: 3, title: 'Crie sua primeira playlist', artist: 'SONORA', album: 'Playlists', duration: '0:00' },
];

function App() {
  const [active, setActive] = useState('Início');
  const [query, setQuery] = useState('');
  const [playing, setPlaying] = useState(null);
  const [liked, setLiked] = useState(new Set());
  const [tracks, setTracks] = useState(demoTracks);

  const filtered = useMemo(() => tracks.filter(t => `${t.title} ${t.artist} ${t.album}`.toLowerCase().includes(query.toLowerCase())), [tracks, query]);

  function importMusic(e) {
    const files = [...e.target.files];
    if (!files.length) return;
    const imported = files.filter(f => f.type.startsWith('audio/')).map((file, i) => ({
      id: Date.now() + i, title: file.name.replace(/\.[^/.]+$/, ''), artist: 'Minha Biblioteca', album: 'Arquivos importados', duration: '0:00', file
    }));
    setTracks(prev => [...imported, ...prev]);
    setActive('Biblioteca');
  }

  return <div className="app">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Music2 size={22}/></div><span>SONORA</span></div>
      <nav>
        {[['Início', Home], ['Buscar', Search], ['Sua Biblioteca', Library]].map(([name, Icon]) => <button key={name} className={active === name ? 'nav active' : 'nav'} onClick={() => setActive(name)}><Icon size={20}/><span>{name}</span></button>)}
      </nav>
      <div className="nav-section">SUA COLEÇÃO</div>
      <button className="nav" onClick={() => setActive('Favoritos')}><Heart size={20}/><span>Favoritos</span></button>
      <button className="nav" onClick={() => setActive('Playlists')}><ListMusic size={20}/><span>Playlists</span></button>
      <label className="import-btn"><Upload size={18}/><span>Adicionar músicas</span><input type="file" accept="audio/*" multiple onChange={importMusic}/></label>
    </aside>

    <main className="main">
      <header className="topbar">
        <div className="mobile-brand"><Music2 size={20}/> SONORA</div>
        <div className="search"><Search size={19}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar músicas, artistas e álbuns"/></div>
        <div className="profile">D</div>
      </header>

      <section className="content">
        <p className="eyebrow">SUA MÚSICA</p>
        <h1>{active === 'Início' ? 'Boa música. Do seu jeito.' : active}</h1>
        <p className="subtitle">Sua biblioteca pessoal, simples e organizada.</p>

        <div className="hero">
          <div><span className="hero-label">BIBLIOTECA PESSOAL</span><h2>Tenha suas músicas<br/>sempre com você.</h2><p>Adicione seus arquivos MP3 e transforme o SONORA no seu streaming particular.</p><label className="primary"><Upload size={18}/> Adicionar músicas<input type="file" accept="audio/*" multiple onChange={importMusic}/></label></div>
          <div className="hero-disc"><Music2 size={58}/></div>
        </div>

        <div className="section-head"><h2>{query ? 'Resultados' : 'Sua biblioteca'}</h2><span>{filtered.length} músicas</span></div>
        <div className="track-list">{filtered.map((track, i) => <div className="track" key={track.id}>
          <div className="cover"><Music2 size={20}/></div><div className="track-info"><strong>{track.title}</strong><span>{track.artist} · {track.album}</span></div>
          <button className="heart" onClick={() => setLiked(prev => { const n = new Set(prev); n.has(track.id) ? n.delete(track.id) : n.add(track.id); return n; })}><Heart size={18} fill={liked.has(track.id) ? 'currentColor' : 'none'}/></button>
          <span className="duration">{track.duration}</span><button className="play-small" onClick={() => setPlaying(playing === track.id ? null : track.id)}>{playing === track.id ? <Pause size={17}/> : <Play size={17}/>}</button>
        </div>)}</div>
      </section>
    </main>

    <div className="player"><div className="now"><div className="cover small"><Music2 size={17}/></div><div><strong>{playing ? tracks.find(t => t.id === playing)?.title : 'Nenhuma música selecionada'}</strong><span>{playing ? 'SONORA' : 'Escolha uma música para começar'}</span></div></div><div className="controls"><div><button><SkipBack size={19}/></button><button className="play-main" onClick={() => playing && setPlaying(null)}>{playing ? <Pause size={20}/> : <Play size={20}/>}</button><button><SkipForward size={19}/></button></div><div className="progress"><span>0:00</span><input type="range" min="0" max="100" defaultValue="0"/><span>0:00</span></div></div><div className="volume"><Volume2 size={18}/><input type="range" min="0" max="100" defaultValue="80"/></div></div>

    <div className="mobile-nav">{[['Início', Home], ['Buscar', Search], ['Biblioteca', Library], ['Favoritos', Heart]].map(([name, Icon]) => <button key={name} className={active.includes(name) ? 'active' : ''} onClick={() => setActive(name)}><Icon size={21}/><span>{name}</span></button>)}</div>
  </div>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
