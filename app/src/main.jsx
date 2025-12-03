import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

function App() {
  const [code, setCode] = React.useState('');
  const [auth, setAuth] = React.useState(false);
  const [stock, setStock] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if(auth) {
      setLoading(true);
      fetch('/stock')
        .then(r=>r.json())
        .then(data => {
          setStock(data);
          setLoading(false);
        })
        .catch(e => {
          console.error(e);
          setLoading(false);
        });
    }
  }, [auth]);

  const login = async () => {
    try {
      const res = await fetch('/auth', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({code})
      });
      if(res.ok) {
        setAuth(true);
      } else {
        alert('Code invalide');
      }
    } catch(e) {
      alert('Erreur réseau');
    }
  };

  if(!auth) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      <div style={{background:'white',padding:'2rem',borderRadius:'1rem',width:'400px',boxShadow:'0 20px 60px rgba(0,0,0,0.3)'}}>
        <div style={{textAlign:'center',marginBottom:'2rem'}}>
          <div style={{fontSize:'4rem',marginBottom:'1rem'}}>🏥</div>
          <h1 style={{fontSize:'2rem',fontWeight:'bold',color:'#1a202c',marginBottom:'0.5rem'}}>Medifresh Stock</h1>
          <p style={{color:'#718096',fontSize:'0.875rem'}}>Version 2.0</p>
        </div>
        <input
          type="text"
          value={code}
          onChange={e=>setCode(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&login()}
          placeholder="Code d'accès"
          style={{width:'100%',padding:'0.75rem',border:'2px solid #e2e8f0',borderRadius:'0.5rem',marginBottom:'1rem',fontSize:'1rem',outline:'none'}}
        />
        <button 
          onClick={login} 
          style={{width:'100%',padding:'0.75rem',background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',color:'white',border:'none',borderRadius:'0.5rem',cursor:'pointer',fontSize:'1rem',fontWeight:'600'}}
        >
          Se connecter
        </button>
        <p style={{marginTop:'1rem',fontSize:'0.875rem',color:'#a0aec0',textAlign:'center'}}>
          💡 Code : <span style={{fontWeight:'bold',color:'#4a5568'}}>2025</span>
        </p>
      </div>
    </div>
  );

  if(loading) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f7fafc'}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:'4rem',animation:'spin 1s linear infinite'}}>⏳</div>
        <p style={{color:'#4a5568',marginTop:'1rem'}}>Chargement du stock...</p>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:'100vh',background:'#f7fafc',padding:'2rem'}}>
      <div style={{maxWidth:'1200px',margin:'0 auto'}}>
        <div style={{background:'white',borderRadius:'1rem',boxShadow:'0 4px 6px rgba(0,0,0,0.1)',padding:'2rem',marginBottom:'2rem'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <h1 style={{fontSize:'2rem',fontWeight:'bold',color:'#1a202c',marginBottom:'0.5rem'}}>📦 Stock Medifresh</h1>
              <p style={{color:'#718096'}}>Version 2.0 • Synchronisation automatique</p>
            </div>
            <div style={{textAlign:'right'}}>
              <p style={{fontSize:'2.5rem',fontWeight:'bold',color:'#667eea',marginBottom:'0.25rem'}}>{stock.length}</p>
              <p style={{color:'#718096',fontSize:'0.875rem'}}>produits</p>
            </div>
          </div>
        </div>

        <div style={{background:'white',borderRadius:'1rem',boxShadow:'0 4px 6px rgba(0,0,0,0.1)',overflow:'hidden'}}>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead style={{background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',color:'white'}}>
                <tr>
                  <th style={{padding:'1rem',textAlign:'left',fontWeight:'600'}}>Produit</th>
                  <th style={{padding:'1rem',textAlign:'left',fontWeight:'600'}}>Référence</th>
                  <th style={{padding:'1rem',textAlign:'right',fontWeight:'600'}}>Quantité</th>
                  <th style={{padding:'1rem',textAlign:'right',fontWeight:'600'}}>Arrivage</th>
                  <th style={{padding:'1rem',textAlign:'right',fontWeight:'600'}}>Seuil</th>
                </tr>
              </thead>
              <tbody>
                {stock.map((item,i)=>(
                  <tr key={i} style={{borderBottom:'1px solid #e2e8f0',transition:'background 0.2s',cursor:'pointer'}} onMouseOver={e=>e.currentTarget.style.background='#edf2f7'} onMouseOut={e=>e.currentTarget.style.background='white'}>
                    <td style={{padding:'1rem',fontWeight:'500',color:'#1a202c'}}>{item.name}</td>
                    <td style={{padding:'1rem',color:'#4a5568'}}>{item.ref}</td>
                    <td style={{padding:'1rem',textAlign:'right',fontWeight:'600',color:'#2d3748'}}>{item.qty}</td>
                    <td style={{padding:'1rem',textAlign:'right',color:'#718096'}}>{item.arrivage}</td>
                    <td style={{padding:'1rem',textAlign:'right',color:'#718096'}}>{item.seuil}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{marginTop:'2rem',textAlign:'center',color:'#a0aec0',fontSize:'0.875rem'}}>
          Medifresh Stock Manager V2.0 • Code: 2025
        </div>
      </div>
    </div>
  );
}

const style = document.createElement('style');
style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
document.head.appendChild(style);

createRoot(document.getElementById('root')).render(<App />);
