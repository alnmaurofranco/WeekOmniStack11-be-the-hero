import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiTrash2, FiEdit2, FiPower } from "react-icons/fi";
//API
import api from "../../services/api";

import "./styles.css";
import logoImg from "../../assets/logo.svg";

function Profile() {
  const [incidents, setIncidents] = useState([]);

  const ongId = localStorage.getItem("ongId");
  const ongName = localStorage.getItem("ongName");

  const [edit, setEdit] = useState(false);
  const [id, setId] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const history = useHistory();

  useEffect(() => {
    api
      .get("profile", {
        headers: {
          Authorization: ongId
        }
      })
      .then(response => {
        setIncidents(response.data);
      });
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      alert("Erro ao deletar");
    }
  }

  async function toggle(item) {
    setId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setValue(item.value);

    setEdit(true);
  }

  async function handleEditIncident(e) {
    e.preventDefault();

    const data = { title, description, value };

    try {
      await api.put(`incidents/edit/${id}`, data, {
        headers: {
          Authorization: ongId
        }
      });

      setEdit(false);
      window.location.reload();
    } catch (err) {
      alert("kkk");
    }
  }

  async function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo Caso
        </Link>

        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>{edit ? "Editar Caso" : "Casos Cadastrados"}</h1>
      {incidents.length !== 0 ? (
        edit ? (
          <div className="edit-section">
            <form onSubmit={handleEditIncident}>
              <input value={title} onChange={e => setTitle(e.target.value)} />
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <input value={value} onChange={e => setValue(e.target.value)} />
              <button type="submit" className="button">
                Salvar Alteraçoes
              </button>
            </form>
          </div>
        ) : (
          <ul>
            {incidents.map(incident => (
              <li key={incident.id}>
                <strong>CASO:</strong>
                <p>{incident.title}</p>

                <strong>DESCRIÇÃO:</strong>
                <p>{incident.description}</p>

                <strong>VALOR:</strong>
                <p>
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  }).format(incident.value)}
                </p>

                <button
                  type="button"
                  className="edit"
                  onClick={e => toggle(incident)}
                >
                  <FiEdit2 size={20} color="#a8a8b3" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteIncident(incident.id)}
                >
                  <FiTrash2 size={20} color="#e02041" />
                </button>
              </li>
            ))}
          </ul>
        )
      ) : (
        <div className="section-empty">
          <p>Não existe nenhum caso no momento!</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
