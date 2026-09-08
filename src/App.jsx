import { useState } from 'react';

function App() {
  const [menuBusquedaAbierto, setMenuBusquedaAbierto] = useState(true);
  const [criterioBusqueda, setCriterioBusqueda] = useState('nombre');
  const [textoBusqueda, setTextoBusqueda] = useState('');

  // Datos de prueba simulados
  const [articulos] = useState([
    { id: 1, nombre: 'Katana de Sasuke', serie: 'NS-001', marca: 'Konoha', categoria: 'Armas', stock: 4, precioVenta: 150.00 },
    { id: 2, nombre: 'Banda Ninja Konoha', serie: 'NS-002', marca: 'Bandai', categoria: 'Accesorios', stock: 12, precioVenta: 35.00 },
    { id: 3, nombre: 'Kunai de Acero', serie: 'NS-003', marca: 'NinjaGear', categoria: 'Herramientas', stock: 25, precioVenta: 15.00 },
    { id: 4, nombre: 'Funko Pop Naruto Uzumaki', serie: 'FK-992', marca: 'Funko', categoria: 'Coleccionables', stock: 8, precioVenta: 60.00 }
  ]);

  // Filtrar según el criterio seleccionado en el menú desplegable lateral
  const articulosFiltrados = articulos.filter(art => {
    if (!textoBusqueda) return true;
    const texto = textoBusqueda.toLowerCase();
    if (criterioBusqueda === 'nombre') return art.nombre.toLowerCase().includes(texto);
    if (criterioBusqueda === 'serie') return art.serie.toLowerCase().includes(texto);
    if (criterioBusqueda === 'marca') return art.marca.toLowerCase().includes(texto);
    return true;
  });

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

          <div style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: '#e0f2fe', color: '#0369a1', fontWeight: '500', marginBottom: '5px', cursor: 'pointer' }}>
            📊 Dashboard
          </div>

          {/* Menú Desplegable de Búsqueda */}
          <div>
            <div 
              onClick={() => setMenuBusquedaAbierto(!menuBusquedaAbierto)}
              style={{ padding: '10px 12px', borderRadius: '8px', color: '#334155', fontWeight: '500', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
            >
              <span>🔍 Búsqueda de Productos</span>
              <span>{menuBusquedaAbierto ? '▼' : '▶'}</span>
            </div>

            {/* Subopciones desplegables */}
            {menuBusquedaAbierto && (
              <div style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                <div 
                  onClick={() => setCriterioBusqueda('nombre')}
                  style={{ padding: '8px 10px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', backgroundColor: criterioBusqueda === 'nombre' ? '#f1f5f9' : 'transparent', color: criterioBusqueda === 'nombre' ? '#2563eb' : '#64748b', fontWeight: criterioBusqueda === 'nombre' ? '600' : '400' }}
                >
                  • Por Nombre
                </div>
                <div 
                  onClick={() => setCriterioBusqueda('serie')}
                  style={{ padding: '8px 10px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', backgroundColor: criterioBusqueda === 'serie' ? '#f1f5f9' : 'transparent', color: criterioBusqueda === 'serie' ? '#2563eb' : '#64748b', fontWeight: criterioBusqueda === 'serie' ? '600' : '400' }}
                >
                  • Por Serie
                </div>
                <div 
                  onClick={() => setCriterioBusqueda('marca')}
                  style={{ padding: '8px 10px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', backgroundColor: criterioBusqueda === 'marca' ? '#f1f5f9' : 'transparent', color: criterioBusqueda === 'marca' ? '#2563eb' : '#64748b', fontWeight: criterioBusqueda === 'marca' ? '600' : '400' }}
                >
                  • Por Marca
                </div>
              </div>
            )}
          </div>

          <div style={{ padding: '10px 12px', borderRadius: '8px', color: '#334155', fontWeight: '500', marginTop: '5px', cursor: 'pointer' }}>
            📦 Gestión de Inventario
          </div>
          <div style={{ padding: '10px 12px', borderRadius: '8px', color: '#334155', fontWeight: '500', marginTop: '5px', cursor: 'pointer' }}>
            👥 Proveedores
          </div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        
        {/* Barra Superior */}
        <div style={{ height: '60px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px' }}>
          <h2 style={{ fontSize: '18px', color: '#0f172a', margin: 0 }}>Panel de Control y Búsqueda</h2>
          <span style={{ fontSize: '14px', color: '#64748b' }}>👤 Admin Naruto Store</span>
        </div>

        {/* Cuerpo de la Interfaz */}
        <div style={{ padding: '30px' }}>
          
          {/* Tarjetas de Estadísticas Estilo Dashboard */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
            <div style={{ backgroundColor: '#0ea5e9', color: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Total Productos</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '5px' }}>{articulos.length}</div>
            </div>
            <div style={{ backgroundColor: '#f97316', color: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Stock Crítico</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '5px' }}>0</div>
            </div>
            <div style={{ backgroundColor: '#10b981', color: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Categorías Activas</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '5px' }}>4</div>
            </div>
            <div style={{ backgroundColor: '#6366f1', color: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Ventas del Día</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '5px' }}>S/ 450</div>
            </div>
          </div>

          {/* Sección Dinámica de Búsqueda */}
          <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>
                Filtro Activo: Buscando por <span style={{ color: '#2563eb', textTransform: 'capitalize' }}>{criterioBusqueda}</span>
              </h3>
            </div>

            <input 
              type="text" 
              placeholder={`Escribe el ${criterioBusqueda} del producto para filtrar...`}
              value={textoBusqueda}
              onChange={(e) => setTextoBusqueda(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', fontSize: '15px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', marginBottom: '20px', boxSizing: 'border-box' }}
            />

            {/* Tabla de Resultados */}
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '13px' }}>
                  <th style={{ padding: '12px' }}>Nombre</th>
                  <th style={{ padding: '12px' }}>Serie</th>
                  <th style={{ padding: '12px' }}>Marca</th>
                  <th style={{ padding: '12px' }}>Categoría</th>
                  <th style={{ padding: '12px' }}>Stock</th>
                  <th style={{ padding: '12px' }}>Precio</th>
                </tr>
              </thead>
              <tbody>
                {articulosFiltrados.length > 0 ? (
                  articulosFiltrados.map(art => (
                    <tr key={art.id} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '14px' }}>
                      <td style={{ padding: '12px', fontWeight: '500', color: '#0f172a' }}>{art.nombre}</td>
                      <td style={{ padding: '12px', fontFamily: 'monospace', color: '#475569' }}>{art.serie}</td>
                      <td style={{ padding: '12px', color: '#475569' }}>{art.marca}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ backgroundColor: '#e2e8f0', padding: '3px 8px', borderRadius: '4px', fontSize: '12px' }}>{art.categoria}</span>
                      </td>
                      <td style={{ padding: '12px', fontWeight: 'bold', color: '#16a34a' }}>{art.stock} un.</td>
                      <td style={{ padding: '12px', fontWeight: '500' }}>S/ {art.precioVenta.toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                      No se encontraron productos para ese criterio de búsqueda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;