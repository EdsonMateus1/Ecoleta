import React from "react";
import * as S from "./styled";
import logo from "../../assets/logo.svg";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";

// interface forma de definir a tipagem de um objeto

const Header: React.FC = () => {
  return (
    <S.MainContainer>
      <img src={logo} alt="logo" />
      <Link to="/create-point">
        {" "}
        <FiLogIn /> Cadastrar ponto de coleta
      </Link>
    </S.MainContainer>
  );
};
export default Header;
