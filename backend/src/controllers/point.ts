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

    const trx = await knex.transaction();

    const point = {
      image: req.file.filename,
      name,
      email,
      whatsapt,
      latitude,
      longitude,
      city,
      uf,
    };

    const id = await trx("points").insert(point);

    const pointId = id[0];

    const pointItems = items
      .split(",")
      .map((item: string) => Number(item.trim()))
      .map((itemId: Number) => {
        return {
          item_id: itemId,
          point_id: pointId,
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

    const serializedPoint = {
      point,
      imagemUrl: `http://localhost:3333/uploads/${point.image}`,
    };

    const items = await knex("items")
      .join("point_items", "item_id", "=", "point_items.item_id")
      .where("point_items.item_id", id)
      .select("items.title");

    return res.status(200).json({ point: serializedPoint, items });
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

    const serializedPoint = points.map((e) => {
      return {
        ...e,
        imagemUrl: `http://localhost:3333/uploads/${e.image}`,
      };
    });
    return res.status(200).json(serializedPoint);
  }
}

const pointController = new PointController();
export default pointController;
