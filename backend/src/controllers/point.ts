import { Request, Response } from "express";
import knex from "../database/connection";
class PointController {
  async create(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapt,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = req.body;

    const point = {
      image: "imagemFake",
      name,
      email,
      whatsapt,
      latitude,
      longitude,
      city,
      uf,
    };

    const trx = await knex.transaction();

    const id = await trx("points").insert(point);

    const pointId = id[0];

    const pointItems = items.map((itemId: Number) => {
      return {
        itemId: itemId,
        pointItem: pointId,
      };
    });
    await trx("point_items").insert(pointItems);
    await trx.commit();
    return res.status(200).json({ id: pointId, ...point });
  }
  async show(req: Request, res: Response) {
    const { id } = req.params;
    const point = await knex("points").where("id", id).first();

    if (!point) {
      return res.status(400).json({ messagem: "point not found" });
    }
    const items = await knex("items")
      .join("point_items", "item_id", "=", "point_items.item_id")
      .where("point_items.item_id", id)
      .select("items.title");

    return res.status(200).json({ point, items });
  }
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;
    const paserdItems = String(items)
      .split(",")
      .map((e) => Number(e.trim()));
    const points = await knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.point_id", paserdItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    return res.status(200).json(points);
  }
}
const pointController = new PointController();
export default pointController;
