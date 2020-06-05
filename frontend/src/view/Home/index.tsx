import React from "react";
import * as S from "./styled";
import { FiSearch } from "react-icons/fi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import logobackground from "../../assets/home-background.svg";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <S.MainContainer>
        <S.LeftContainer>
          <h1>Seu marketplace de coleta de residuos.</h1>
          <p>
            Ajudamos pessoas a encotrarem pontos de coleta de forma eficiente
          </p>
          <Link to="/create-point">
            <span>
              {" "}
              <FiSearch color="#fff" />{" "}
            </span>
            <strong>ajudamos pessoas a encotrarem pontos de coletas</strong>
          </Link>
        </S.LeftContainer>
        <S.RignttContainer src={logobackground} />
      </S.MainContainer>
      <Footer />
    </>
  );
};
export default Home;
