// src/components/HeaderMobile.jsx
export default function HeaderMobile() {
  return (
    <header className="header-mobile flex justify-between items-center p-4 bg-gray-800 text-white md:hidden">
      <h1 className="logo text-xl font-bold">CarpiShop</h1>
      <button className="open-menu" id="open-menu">
        <i className="bi bi-list text-2xl"></i>
      </button>
    </header>
  );
}
