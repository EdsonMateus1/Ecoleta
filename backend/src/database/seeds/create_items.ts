// seed serve para cadastrar dados

import Knex from "knex";
export async function seed(knex: Knex) {
  await knex("items").insert([
    { title: "lampadas", image: "lampadas.svg" },
    { title: "pilhas e baterias", image: "baterias.svg" },
    { title: "papeis e paelao", image: "papeis-paelao.svg" },
    { title: "residuos eletronicos", image: "eletronicos.svg" },
    { title: "residuos organicos", image: "organicos.svg" },
    { title: "oleo de cozinha", image: "oleo.svg" },
  ]);
}
