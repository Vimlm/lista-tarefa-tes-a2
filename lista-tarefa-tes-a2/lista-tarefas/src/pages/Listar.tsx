import styled from 'styled-components';
import Header from '../components/Header';
import Tarefa from '../interfaces/Tarefa';
import { useState } from 'react';

const Listar = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useState(() => {
    fetch('http://localhost:5000/tarefas/listar')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setTarefas(data);
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  });

  const windowReload = () => {
    window.location.reload();
  };

  const statusTarefa: string = '';

  return (
    <>
      <Header />
      <ListarStyled>
        {statusTarefa === '' ? (
          <>
            <h1>Lista de Tarefas</h1>
            <ul>
              {tarefas.map((tarefa) => (
                <ul key={tarefa.tarefaId}>
                  <li>Título: {tarefa.titulo}</li>
                  <li>Descrição: {tarefa.descricao}</li>
                  <li>Status: {tarefa.status}</li>
                  <button
                    onClick={() => {
                      console.log(tarefa);
                      fetch(
                        `http://localhost:5000/tarefas/alterar/${tarefa.tarefaId}`,
                        {
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                        }
                      )
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error(
                              'Erro na requisição: ' + response.statusText
                            );
                          }
                          return response.json();
                        })
                        .then(() => {
                          alert('Status alterado com sucesso!');
                          windowReload();
                        })
                        .catch((error) => {
                          console.error('Erro:', error);
                        });
                    }}
                  >
                    Mudar Status
                  </button>
                </ul>
              ))}
            </ul>
          </>
        ) : null}

        {statusTarefa === 'Concluída' ? (
          <>
            <h1>Lista de Tarefas Concluidas</h1>

            <ul>
              {tarefas.map((tarefa) =>
                tarefa.status === 'Concluída' ? (
                  <ul key={tarefa.tarefaId}>
                    <li>Titulo: {tarefa.titulo}</li>
                    <li>Descricao: {tarefa.descricao}</li>
                    <li>Status: {tarefa.status}</li>
                  </ul>
                ) : null
              )}
            </ul>
          </>
        ) : null}

        {statusTarefa != 'Concluída' && statusTarefa != '' ? (
          <>
            <h1>Lista de Tarefas Pendentes</h1>

            <ul>
              {tarefas.map((tarefa) =>
                tarefa.status !== 'Concluída' ? (
                  <ul key={tarefa.tarefaId}>
                    <li>{tarefa.titulo}</li>
                    <li>{tarefa.descricao}</li>
                    <li>{tarefa.status}</li>
                  </ul>
                ) : null
              )}
            </ul>
          </>
        ) : null}

        <div className="botoes">
          <button
            onClick={() => {
              window.location.reload();
            }}
          >
            Mostrar Todas Tarefas
          </button>
          <button
            onClick={() => {
              const tarefasConcluidas = tarefas.filter(
                (tarefa) => tarefa.status === 'Concluída'
              );
              setTarefas(tarefasConcluidas);
            }}
          >
            Concluídas
          </button>

          <button
            onClick={() => {
              const tarefasPendentes = tarefas.filter(
                (tarefa) => tarefa.status === 'Em andamento'
              );
              setTarefas(tarefasPendentes);
            }}
          >
            Em Andamento
          </button>

          <button
            onClick={() => {
              const tarefasNaoIniciadas = tarefas.filter(
                (tarefa) => tarefa.status === 'Não iniciada'
              );
              setTarefas(tarefasNaoIniciadas);
            }}
          >
            Não Iniciada
          </button>
        </div>
      </ListarStyled>
    </>
  );
};

const ListarStyled = styled.div`
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 2.5rem;
    text-align: center;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background: #111;
    border-bottom: 1px solid #fff;
    border-top: 1px solid #fff;
  }

  li {
    max-width: fit-content;
  }

  button {
    background: #ffbb00;
    padding: 0.5rem;
    width: 160px;
    margin-top: 1rem;
  }

  button:hover {
    background: #ffd700;
  }

  .botoes {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
  }
`;

export default Listar;
