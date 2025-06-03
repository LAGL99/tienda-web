// src/components/Producto.jsx
export default function Producto({ producto }) {
  return (
    <div className="producto border p-4 rounded shadow">
      <img src={producto.imagen} alt={producto.nombre} className="producto-imagen w-full h-auto mb-2" />
      <h3 className="text-lg font-semibold">{producto.nombre}</h3>
      {/* Puedes agregar más detalles aquí */}
    </div>
  );
}
