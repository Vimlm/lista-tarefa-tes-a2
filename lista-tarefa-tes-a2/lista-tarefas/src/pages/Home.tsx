import Header from "../components/Header";
import styled from 'styled-components';

const Home = () => {
  return (
    <>
      <Header />



      <HomeStyled>
        <h1>Listy App</h1>

        <p>Adicione, liste e gerencie suas tarefas, tudo a partir de um único App, conheça ja o Listy<span>.</span></p>
      </HomeStyled>
    </>
  )
}

const HomeStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(70vh - 3.25rem);
  gap: 1rem;

  h1 {
    font-size: 2.5rem;
  }

  p {
    font-size: 1.25rem;
    text-align: center;
    color: #B2B2B2;
  }
`

export default Home
