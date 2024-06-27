import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderStyled>
      <nav>
        <ul>
          <li>
            <Link to="/">Listy App</Link>
          </li>
          <div className='menu'>
            <li>
              <Link className='menu-item' to="/listar">Listar Tarefas</Link>
            </li>
            <li>
              <Link className='menu-item' to="/cadastrar">Cadastrar</Link>
            </li>
          </div>
        </ul>
      </nav>
    </HeaderStyled>
  );
};

const HeaderStyled = styled.header`
  width: 100vw;
  height: 3.25rem;
  padding: 1.25rem 2.5rem;

  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    font-size: 1.25rem;
  }

  .menu-item {
    color: #000;
    background:  #FFBB00;
    width: 160px;
    padding: 0.5rem;
  }

  .menu-item:hover {
    background: #FFD700;
  }

  .menu {
    display: flex;
    gap: 1rem;
  }
`;

export default Header;
