import React, {
  useEffect,
  useState,
  useCallback,
  ChangeEvent,
  FormEvent,
} from "react";
import * as S from "./styled";
import { Map, Marker, TileLayer } from "react-leaflet";
import api from "../../api/api";
import axios from "axios";
import { LeafletMouseEvent } from "leaflet";

//componentes
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Dropzone from "../../components/Dropzone";

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
  const [posicionInitioState, setPosicionInitio] = useState<[number, number]>([
    0,
    0,
  ]);
  // mandar para o bakc-end
  const [selectUfState, setSelectUf] = useState("RO");
  const [selectCityState, setSelectCity] = useState("");
  const [posicionState, setPosicion] = useState<[number, number]>([0, 0]);
  const [selectItemState, setSelectItems] = useState<number[]>([]);
  const [selectFileState, setSelectFile] = useState<File>();
  const [formDataState, setFormData] = useState({
    name: "",
    email: "",
    whatsapt: "",
  });

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

  const handleMapClick = useCallback((e: LeafletMouseEvent) => {
    setPosicion([e.latlng.lat, e.latlng.lng]);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((posi) => {
      const { latitude, longitude } = posi.coords;
      setPosicionInitio([latitude, longitude]);
    });
  }, []);

  const onDataForm = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    },
    [formDataState]
  );
  console.log(formDataState);
  

  const handleSelectItem = useCallback(
    (id: number) => {
      const alreadyItems = selectItemState.findIndex((e) => e === id);
      if (alreadyItems >= 0) {
        const filterItems = selectItemState.filter((e) => e !== id);
        setSelectItems(filterItems);
      } else {
        setSelectItems([...selectItemState, id]);
      }
    },
    [selectItemState]
  );

  const handleSubimit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const data = new FormData();

      data.append("name", formDataState.name);
      data.append("email", formDataState.email);
      data.append("whatsapt", formDataState.whatsapt);
      data.append("latitude", String(posicionState[0]));
      data.append("longitude", String(posicionState[1]));
      data.append("city", selectCityState);
      data.append("uf", selectUfState);
      data.append("items", selectItemState.join(","));

      if (selectFileState) {
        data.append("image", selectFileState);
      }

      try {
        await api.post("/points", data);
        alert("ponto de coleta criado");
      } catch (error) {
        console.log(error);
      }
    },
    [formDataState, posicionState, cityState, ufState, selectItemState]
  );

  return (
    <>
      <Header />
      <S.MainContainer>
        <form onSubmit={handleSubimit}>
          <h1>
            Cadastro <br /> ponto de coleta
          </h1>

          <Dropzone onFileUpload={setSelectFile} />

          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>
            <div className="field">
              <label htmlFor="name">Nome da entidade</label>
              <input type="text" name="name" id="name" onChange={onDataForm} />
            </div>
            <div className="field-group">
              <div className="field">
                <label htmlFor="email">E-mail</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={onDataForm}
                />
              </div>
              <div className="field">
                <label htmlFor="Whatsapp">Whatsapp</label>
                <input
                  type="text"
                  name="whatsapt"
                  id="whatsapt"
                  onChange={onDataForm}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Endereco</h2>
              <span>selecione o endereco no mapa</span>
            </legend>

            <Map
              center={posicionInitioState}
              zoom={10}
              onclick={handleMapClick}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={posicionState} />
            </Map>

            <div className="field-group">
              <div className="field">
                <label htmlFor="uf">Estado</label>
                <select
                  value={selectUfState}
                  name="uf"
                  id="uf"
                  onChange={handleSelectUf}
                >
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
                <select
                  value={selectCityState}
                  name="cidade"
                  id="cidade"
                  onChange={handleSelectCity}
                >
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
                  <li
                    key={e.id}
                    onClick={() => handleSelectItem(e.id)}
                    className={selectItemState.includes(e.id) ? "selected" : ""}
                  >
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
