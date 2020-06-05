import React, { useEffect, useState, useCallback, ChangeEvent } from "react";
import * as S from "./styled";
import { Map, Marker, TileLayer } from "react-leaflet";
import api from "../../api/api";
import axios from "axios";

//componentes
import Header from "../../components/Header";
import Footer from "../../components/Footer";
const Maps = () => {
  return (
    <Map center={[51.505, -0.09]} zoom={15}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[51.505, -0.09]} />
    </Map>
  );
};
// em TS e necessario definir a tipagem de array e objetos
interface Item {
  id: number;
  title: string;
  imagemUrl: string;
}
interface UF {
  id: number;
  sigla: string;
  nome: string;
}
interface City {
  id: number;
  nome: string;
}
const CreatePoint: React.FC = () => {
  const [itemsState, setItems] = useState<Item[]>([]);
  const [ufState, setUF] = useState<UF[]>([]);
  const [cityState, setCity] = useState<City[]>([]);
  // mandar para o bak-end
  const [selectUfState, setSelectUf] = useState("RO");
  const [selectCityState, setSelectCity] = useState("");

  const getItems = useCallback(async () => {
    const res = await api.get("/items");
    setItems(res.data);
  }, []);

  useEffect(() => {
    getItems();
  }, [getItems]);

  const getUF = useCallback(async () => {
    const res = await axios.get(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );
    setUF(res.data);
  }, []);

  useEffect(() => {
    getUF();
  }, []);

  const handleSelectUf = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setSelectUf(e.target.value);
  }, []);

  const getCity = useCallback(async () => {
    const res = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectUfState}/municipios`
    );
    setCity(res.data);
  }, [selectUfState]);

  useEffect(() => {
    getCity();
  }, [selectUfState]);

  const handleSelectCity = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setSelectCity(e.target.value);
  }, []);
  return (
    <>
      <Header />
      <S.MainContainer>
        <form>
          <h1>
            Cadastro <br /> ponto de coleta
          </h1>

          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>
            <div className="field">
              <label htmlFor="name">Nome da entidade</label>
              <input type="text" name="name" id="name" />
            </div>
            <div className="field-group">
              <div className="field">
                <label htmlFor="e-mail">E-mail</label>
                <input type="text" name="e-mail" id="e-mail" />
              </div>
              <div className="field">
                <label htmlFor="Whatsapp">Whatsapp</label>
                <input type="text" name="Whatsapp" id="Whatsapp" />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Endereco</h2>
              <span>selecione o endereco no mapa</span>
            </legend>
            <S.MapsContainer></S.MapsContainer>
            <div className="field-group">
              <div className="field">
                <label htmlFor="uf">Estado</label>
                <select value={selectUfState} name="uf" id="uf" onChange={handleSelectUf}>
                  {ufState.map((e) => {
                    return (
                      <option key={e.id} value={e.sigla}>
                        {e.nome}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="field">
                <label htmlFor="cidade">Cidade</label>
                <select value={selectCityState} name="cidade" id="cidade" onChange={handleSelectCity}>
                  {cityState.map((e) => {
                    return (
                      <option key={e.id} value={e.nome}>
                        {e.nome}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>itens de coleta</h2>
              <span>selecione um ou mais intems abaixo</span>
            </legend>
            <ul className="items-grid">
              {itemsState.map((e) => {
                return (
                  <li key={e.id}>
                    <img src={e.imagemUrl} alt={e.title} />
                    <span>{e.title}</span>
                  </li>
                );
              })}
            </ul>
          </fieldset>
          <button type="submit">Cadastrar ponto de coleta</button>
        </form>
      </S.MainContainer>
    </>
  );
};
export default CreatePoint;
