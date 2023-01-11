import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Form from "./pages/Formulario/Form";
import UpdateForm from "./pages/Formulario/UpdateForm";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
  height: 100vh;
        <Route path="/CadastrarUsuario" element={<Form />} />
        <Route path="/AtualizarUsuario/:id" element={<UpdateForm />} />
      </Routes>
    </Router>
  );
}

export default App;
