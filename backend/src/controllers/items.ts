import { Request, Response } from "express";
import knex from "../database/connection";
class ItemsControllers {
  async index(req: Request, res: Response) {
    const items = await knex("items").select("*");

    const serializedItems = items.map((e) => {
      return {
        id: e.id,
        title: e.title,
        imagemUrl: `http://localhost:3333/uploads/${e.image}`,
      };
    });
    return res.status(200).json(serializedItems);
  }
}
const itemsControllers = new ItemsControllers();
export default itemsControllers;
