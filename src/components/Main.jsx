// src/components/Main.jsx
import Producto from "./Producto";

const productos = [
  { nombre: "Album 01", imagen: "./img/albumes/01.jpg" },
  // Puedes agregar más productos aquí
];

export default function Main() {
  return (
    <main className="p-4 flex-1">
      <h2 className="titulo-principal text-2xl font-bold mb-4">Todos los productos</h2>
      <div id="contenedor-productos" className="contenedor-productos grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {productos.map((p, index) => (
          <Producto key={index} producto={p} />
        ))}
      </div>
    </main>
  );
}
