import styled from 'styled-components';
import Header from '../components/Header';
import { useState } from 'react';

const Cadastrar = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch('http://localhost:5000/tarefas/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titulo: titulo,
        descricao: descricao,
        categoriaId: categoria,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        alert('Tarefa cadastrada com sucesso!');
        console.log(data);
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  };

  return (
    <>
      <Header />

      <CadastrarStyled>
        <h1>Cadastrar Tarefa</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <label htmlFor="categoria">Categoria</label>
          <input
            type="text"
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />

          <button type="submit">Cadastrar</button>
        </form>
      </CadastrarStyled>
    </>
  );
};

const CadastrarStyled = styled.div`
  h1 {
    font-size: 2.5rem;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }

  label {
    font-size: 1.25rem;
  }

  input,
  textarea {
    padding: 0.5rem;
    font-size: 1rem;
  }

  button {
    padding: 0.5rem;
    font-size: 1rem;
    background: #ffbb00;
    color: #000;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background: #ffd700;
  }
`;

export default Cadastrar;
