export default function Dashboard({ totalUnidades, productosEnStockCritico, ingresosHoy, ventasDelDia, valorTotalInventario }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', marginBottom: '30px' }}>
      <div style={{ backgroundColor: '#0ea5e9', color: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '14px', opacity: 0.9 }}>Total Productos</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '5px' }}>{totalUnidades}</div>
      </div>
      <div style={{ backgroundColor: '#f97316', color: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '14px', opacity: 0.9 }}>Stock Crítico</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '5px' }}>{productosEnStockCritico}</div>
      </div>
      <div style={{ backgroundColor: '#10b981', color: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '14px', opacity: 0.9 }}>Ingresos (Hoy)</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '5px' }}>{ingresosHoy}</div>
      </div>
      <div style={{ backgroundColor: '#8b5cf6', color: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '14px', opacity: 0.9 }}>Ventas del Día</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '5px' }}>S/ {ventasDelDia.toFixed(2)}</div>
      </div>
      <div style={{ backgroundColor: '#475569', color: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '14px', opacity: 0.9 }}>Valor Total</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '5px' }}>S/ {valorTotalInventario.toFixed(2)}</div>
      </div>
    </div>
  );
}