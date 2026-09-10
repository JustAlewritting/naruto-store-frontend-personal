import { useState } from 'react';

export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación de credenciales estáticas
    if (usuario === 'GrupoArverg' && password === 'TipicalType123$$$') {
      onLogin();
    } else {
      alert('Credenciales incorrectas. Acceso denegado.');
    }
  };

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      // Puedes cambiar este enlace por cualquier wallpaper de Naruto que prefieras
      backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url("https://images5.alphacoders.com/105/1054346.png")', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <span style={{ fontSize: '40px' }}>🍥</span>
          <h2 style={{ color: '#0f172a', margin: '10px 0 0 0' }}>Naruto Store</h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '5px' }}>Ingresa tus credenciales de administrador</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', color: '#475569', marginBottom: '5px', fontWeight: '500' }}>Usuario</label>
            <input 
              type="text" 
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required 
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '15px' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', color: '#475569', marginBottom: '5px', fontWeight: '500' }}>Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '15px' }} 
            />
          </div>

          <button type="submit" style={{ padding: '14px', backgroundColor: '#f97316', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginTop: '10px' }}>
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}