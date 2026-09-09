import { useState } from 'react';

export default function GestionInventario({ alGuardar }) {
  const [formData, setFormData] = useState({
    nombre: '', marca: '', categoria: '', stockActual: 0, precioVenta: 0.0, requiereSerie: false
  });
  
  // Estado independiente para almacenar los números de serie ingresados
  const [seriesList, setSeriesList] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({ ...formData, [name]: newValue });

    // Si cambian la cantidad de stock y requiere serie, ajustamos la cantidad de cajas de texto
    if (name === 'stockActual' || name === 'requiereSerie') {
      const isSerieRequerida = name === 'requiereSerie' ? checked : formData.requiereSerie;
      const cantidad = name === 'stockActual' ? parseInt(value) || 0 : formData.stockActual;
      
      if (isSerieRequerida) {
        setSeriesList(Array(cantidad).fill(''));
      } else {
        setSeriesList([]);
      }
    }
  };

  const handleSerieInput = (index, valor) => {
    const nuevasSeries = [...seriesList];
    nuevasSeries[index] = valor;
    setSeriesList(nuevasSeries);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Crear el artículo base (nacerá con stock 0 según tu Java)
    fetch('http://localhost:8086/api/inventario/articulos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(nuevoArticulo => {
      
      const cantidadInicial = parseInt(formData.stockActual);
      
      // Si el stock inicial es 0, terminamos aquí.
      if (cantidadInicial <= 0) {
        alert('Producto creado con stock 0.');
        limpiarFormulario();
        return;
      }

      // 2. Si hay stock, disparamos la entrada al Kardex
      if (formData.requiereSerie) {
        // Validar que no haya series vacías
        if (seriesList.some(s => s.trim() === '')) {
          alert('El artículo se creó, pero debes llenar todos los números de serie para ingresar el stock.');
          return;
        }
        
        // Petición POST a tu endpoint de series
        fetch(`http://localhost:8086/api/inventario/entrada-series?articuloId=${nuevoArticulo.id}&motivo=Inventario Inicial&usuario=Admin`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(seriesList)
        })
        .then(() => finalizarGuardado('Producto y Series guardadas con éxito en el Kardex.'));
        
      } else {
        // Petición POST a tu endpoint base
        fetch(`http://localhost:8086/api/inventario/entrada-base?articuloId=${nuevoArticulo.id}&cantidad=${cantidadInicial}&motivo=Inventario Inicial&usuario=Admin`, {
          method: 'POST'
        })
        .then(() => finalizarGuardado('Producto y Stock guardados con éxito en el Kardex.'));
      }
    })
    .catch(error => console.error('Error:', error));
  };

  const finalizarGuardado = (mensaje) => {
    alert(mensaje);
    limpiarFormulario();
    if (alGuardar) alGuardar(); // Refresca la tabla
  };

  const limpiarFormulario = () => {
    setFormData({ nombre: '', marca: '', categoria: '', stockActual: 0, precioVenta: 0.0, requiereSerie: false });
    setSeriesList([]);
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ margin: '0 0 20px 0', color: '#1e293b' }}>Registrar Nuevo Producto</h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '14px', color: '#64748b', marginBottom: '5px' }}>Nombre del Artículo</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '14px', color: '#64748b', marginBottom: '5px' }}>Marca</label>
          <input type="text" name="marca" value={formData.marca} onChange={handleChange} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '14px', color: '#64748b', marginBottom: '5px' }}>Categoría</label>
          <select name="categoria" value={formData.categoria} onChange={handleChange} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
            <option value="">Seleccionar...</option>
            <option value="Componentes">Componentes</option>
            <option value="Periféricos">Periféricos</option>
            <option value="Accesorios">Accesorios</option>
            <option value="General">General</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <label style={{ fontSize: '14px', color: '#64748b', marginBottom: '5px' }}>Stock Inicial</label>
            <input type="number" name="stockActual" value={formData.stockActual} onChange={handleChange} min="0" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <label style={{ fontSize: '14px', color: '#64748b', marginBottom: '5px' }}>Precio (S/)</label>
            <input type="number" step="0.01" name="precioVenta" value={formData.precioVenta} onChange={handleChange} min="0" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', gridColumn: '1 / -1', backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
          <input type="checkbox" name="requiereSerie" checked={formData.requiereSerie} onChange={handleChange} id="requiereSerie" style={{ transform: 'scale(1.2)' }} />
          <label htmlFor="requiereSerie" style={{ fontSize: '14px', color: '#0f172a', fontWeight: '500', cursor: 'pointer' }}>
            Este producto requiere control estricto por número de serie (Ej. Placas, RAMs)
          </label>
        </div>

        {/* Zona Dinámica de Series */}
        {formData.requiereSerie && formData.stockActual > 0 && (
          <div style={{ gridColumn: '1 / -1', padding: '15px', border: '1px dashed #cbd5e1', borderRadius: '8px', backgroundColor: '#f1f5f9' }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#334155', fontSize: '14px' }}>Ingrese los {formData.stockActual} Números de Serie:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
              {seriesList.map((serie, index) => (
                <input 
                  key={index}
                  type="text" 
                  placeholder={`SN / Código ${index + 1}`}
                  value={serie}
                  onChange={(e) => handleSerieInput(index, e.target.value)}
                  required
                  style={{ padding: '8px', borderRadius: '4px', border: '1px solid #94a3b8' }}
                />
              ))}
            </div>
          </div>
        )}

        <button type="submit" style={{ gridColumn: '1 / -1', padding: '14px', backgroundColor: '#0ea5e9', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginTop: '10px' }}>
          Registrar Producto y Stock
        </button>
      </form>
    </div>
  );
}