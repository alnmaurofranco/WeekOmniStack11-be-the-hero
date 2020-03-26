import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
//API
import api from "../../services/api";

import "./styles.css";
import logoImg from "../../assets/logo.svg";
import herosImg from "../../assets/heroes.png";

function Logon() {
  const [id, setID] = useState(""); // pega os dados digitados no form
  const histroy = useHistory(); // navega pelas rotas da aplicação

  async function handleLogon(e) {
    e.preventDefault(); //não da refresh na pagina
    try {
      const response = await api.post("sessions", { id });
      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);

      histroy.push("profile");
    } catch (error) {
      alert("Ocorreu um erro ao fazer logon da sua ONG.");
    }
  }
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="" />
        <form onSubmit={handleLogon}>
          <h1>Faça seu Logon</h1>

          <input
            value={id}
            onChange={e => setID(e.target.value)}
            placeholder="Sua ID"
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={herosImg} alt="Heros" />
    </div>
  );
}

export default Logon;
