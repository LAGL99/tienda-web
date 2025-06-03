// src/components/Sidebar.jsx
export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 bg-gray-100 h-screen p-4">
      <button className="close-menu mb-4" id="close-menu">
        <i className="bi bi-x text-xl"></i>
      </button>
      <header>
        <h1 className="logo text-2xl font-bold mb-4">CarpiShop</h1>
      </header>
      <nav>
        <ul className="menu flex flex-col gap-2">
          <li><button id="todos" className="boton-menu active">🖐 Todos los productos</button></li>
          <li><button id="abrigos" className="boton-menu">🖐 Abrigos</button></li>
          <li><button id="camisetas" className="boton-menu">🖐 Camisetas</button></li>
          <li><button id="pantalones" className="boton-menu">🖐 Pantalones</button></li>
          <li>
            <a className="boton-menu boton-carrito flex items-center gap-2" href="./carrito.html">
              🛒 Carrito <span id="numerito" className="numerito">0</span>
            </a>
          </li>
        </ul>
      </nav>
      <footer className="mt-auto">
        <p className="texto-footer text-sm text-gray-500">© 2022 Carpi Coder</p>
      </footer>
    </aside>
  );
}
