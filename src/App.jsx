import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard.jsx';
import BusquedaProductos from './components/BusquedaProductos.jsx';
import GestionInventario from './components/GestionInventario.jsx';
import Login from './components/Login.jsx';


function App() {
  // Estados de navegación y UI
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const [vistaActual, setVistaActual] = useState('dashboard'); // 'dashboard' | 'busqueda' | 'gestion'
  const [menuBusquedaAbierto, setMenuBusquedaAbierto] = useState(true);
  
  // Estados de datos y filtros
  const [articulos, setArticulos] = useState([]);
  const [criterioBusqueda, setCriterioBusqueda] = useState('nombre');
  const [textoBusqueda, setTextoBusqueda] = useState('');

  const cargarInventario = () => {
    fetch('http://localhost:8086/api/inventario/articulos')
      .then(response => response.json())
      .then(data => setArticulos(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    cargarInventario();
  }, []);

  // Cálculos rápidos para el Dashboard
  const valorTotalInventario = articulos.reduce((total, art) => total + ((art.precioVenta || 0) * (art.stockActual || 0)), 0);
  const stockCritico = articulos.filter(art => art.stockActual === 0).length;

  const articulosFiltrados = articulos.filter(art => {
    if (!textoBusqueda) return true;
    const texto = textoBusqueda.toLowerCase();
    
    if (criterioBusqueda === 'nombre') return art.nombre?.toLowerCase().includes(texto);
    if (criterioBusqueda === 'marca') return art.marca?.toLowerCase().includes(texto);
    
    // NUEVO: Busca coincidencias dentro del arreglo oculto de series
    if (criterioBusqueda === 'serie') {
      return art.series && art.series.some(s => s.numeroSerie.toLowerCase().includes(texto));
    }
    
    return true;
  });
if (!estaAutenticado) {
    return <Login onLogin={() => setEstaAutenticado(true)} />;
  }
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f1f5f9', margin: 0, overflow: 'hidden' }}>
      {/* BARRA LATERAL (SIDEBAR) */}
      <div style={{ width: '260px', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
        {/* Logo / Título de la Empresa */}
        <div style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '20px', fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>🍥</span> Naruto Store
        </div>

        {/* Menú de Navegación */}
        <div style={{ padding: '20px 10px', flex: 1, overflowY: 'auto' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 'bold', marginBottom: '10px', paddingLeft: '10px' }}>
            Navegación Principal
          </div>

          <div
            onClick={() => setVistaActual('dashboard')}
            style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: vistaActual === 'dashboard' ? '#e0f2fe' : 'transparent', color: vistaActual === 'dashboard' ? '#0369a1' : '#334155', fontWeight: '500', marginBottom: '5px', cursor: 'pointer' }}
          >
            Dashboard
          </div>

          <div>
            <div
              onClick={() => setMenuBusquedaAbierto(!menuBusquedaAbierto)}
              style={{ padding: '10px 12px', borderRadius: '8px', color: '#334155', fontWeight: '500', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
            >
              <span onClick={() => setVistaActual('busqueda')}>Búsqueda de Productos   </span>
              <span>{menuBusquedaAbierto ? '▼' : '▶'}</span>
            </div>

            {menuBusquedaAbierto && (
              <div style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                {['nombre', 'serie', 'marca'].map(criterio => (
                  <div
                    key={criterio}
                    onClick={() => { setCriterioBusqueda(criterio); setVistaActual('busqueda'); }}
                    style={{ padding: '8px 10px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', backgroundColor: criterioBusqueda === criterio && vistaActual === 'busqueda' ? '#f1f5f9' : 'transparent', color: criterioBusqueda === criterio && vistaActual === 'busqueda' ? '#2563eb' : '#64748b', fontWeight: criterioBusqueda === criterio && vistaActual === 'busqueda' ? '600' : '400', textTransform: 'capitalize' }}
                  >
                    • Por {criterio}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            onClick={() => setVistaActual('gestion')}
            style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: vistaActual === 'gestion' ? '#e0f2fe' : 'transparent', color: vistaActual === 'gestion' ? '#0369a1' : '#334155', fontWeight: '500', marginTop: '5px', cursor: 'pointer' }}
          >
          Gestión de Inventario
          </div>
        </div>

        {/* Zona inferior para Cerrar Sesión */}
        <div style={{ padding: '20px', borderTop: '1px solid #e2e8f0' }}>
          <button
            onClick={() => setEstaAutenticado(false)}
            style={{ width: '100%', padding: '12px', backgroundColor: '#fef2f2', color: '#ef4444', border: '1px solid #f87171', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '14px', transition: '0.2s' }}
          >
            <span>🚪</span> Cerrar Sesión
          </button>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ height: '60px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px' }}>
          <h2 style={{ fontSize: '18px', color: '#0f172a', margin: 0, textTransform: 'capitalize' }}>Panel de {vistaActual}</h2>
          <span style={{ fontSize: '14px', color: '#64748b' }}>👤 Admin Naruto Store</span>
        </div>

        <div style={{ padding: '30px' }}>
          {vistaActual === 'dashboard' && (
            <Dashboard
              articulos={articulos}
              stockCritico={stockCritico}
              valorTotalInventario={valorTotalInventario}
            />
          )}

          {vistaActual === 'busqueda' && (
            <BusquedaProductos
              criterioBusqueda={criterioBusqueda}
              textoBusqueda={textoBusqueda}
              setTextoBusqueda={setTextoBusqueda}
              articulosFiltrados={articulosFiltrados}
              alActualizar={cargarInventario}
            />
          )}

          {vistaActual === 'gestion' && (
            <GestionInventario alGuardar={cargarInventario} />
          )}
        </div>
      </div>
    </div>
  );
}
export default App;