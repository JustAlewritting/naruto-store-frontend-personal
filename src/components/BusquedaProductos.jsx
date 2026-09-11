export default function BusquedaProductos({
  criterioBusqueda,
  textoBusqueda,
  setTextoBusqueda,
  articulosFiltrados,
  alActualizar // Nueva propiedad para recargar la tabla tras borrar
}) {

  const handleEliminar = (id, nombre) => {
    const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar el producto:\n${nombre}?`);
    if (confirmar) {
      fetch(`http://localhost:8086/api/inventario/articulos/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          alert('Producto eliminado del sistema.');
          alActualizar(); // Refresca la lista de inmediato
        } else {
          alert('No se puede eliminar. Es probable que este producto ya tenga historial en el Kardex.');
        }
      })
      .catch(error => console.error('Error:', error));
    }
  };

  return (
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

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '13px' }}>
            <th style={{ padding: '12px' }}>Nombre</th>
            <th style={{ padding: '12px' }}>Control Serie</th>
            <th style={{ padding: '12px' }}>Marca</th>
            <th style={{ padding: '12px' }}>Categoría</th>
            <th style={{ padding: '12px' }}>Stock</th>
            <th style={{ padding: '12px' }}>Precio</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {articulosFiltrados.length > 0 ? (
            articulosFiltrados.map(art => (
              <tr key={art.id} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '14px' }}>
                <td style={{ padding: '12px', fontWeight: '500', color: '#0f172a' }}>{art.nombre}</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>
                  {art.requiereSerie ? (
                    <span style={{ color: '#b91c1c', backgroundColor: '#fef2f2', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>Sí</span>
                  ) : (
                    <span style={{ color: '#475569' }}>No</span>
                  )}
                </td>
                <td style={{ padding: '12px', color: '#475569' }}>{art.marca || 'N/A'}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ backgroundColor: '#e2e8f0', padding: '3px 8px', borderRadius: '4px', fontSize: '12px' }}>{art.categoria || 'General'}</span>
                </td>
                <td style={{ padding: '12px', fontWeight: 'bold', color: '#16a34a' }}>{art.stockActual} un.</td>
                <td style={{ padding: '12px', fontWeight: '500' }}>S/ {art.precioVenta ? art.precioVenta.toFixed(2) : '0.00'}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <button 
                    onClick={() => handleEliminar(art.id, art.nombre)}
                    style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>No se encontraron productos.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}