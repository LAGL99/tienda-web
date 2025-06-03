// src/App.jsx
import HeaderMobile from "./components/HeaderMobile";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

export default function App() {
  return (
    <div className="wrapper flex">
      <HeaderMobile />
      <Sidebar />
      <Main />
    </div>
  );
}
