import { Request, Response } from "express";
import connection from "../../config/database.config";
import { ResultSetHeader } from "mysql2";

const getAll = async (req: Request, res: Response) => {
  connection.query("SELECT * from comments", function (error, results) {
    if (error) {
      res.status(500).send({ error: "Error while fetching data" });
      return;
    }

    console.log("results", results);
    res.status(200).send(results);
  });
};

const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("end point get one (id): ", id);

  const sql = "SELECT * FROM comments WHERE id = ?";
  const values = [id];
  connection.query(sql, values, (error, results) => {
    if (error) {
      res.status(500).send({ error: "Error while fetching data" });
      return;
    }

    if (Array.isArray(results) && results.length === 0) {
      res.status(404).send({ error: "comments not found" });
      return;
    }

    if (Array.isArray(results) && results.length === 1) {
      res.status(200).send(results[0]);
      return;
    }
  });
};

const getAllByTravelId = async (req: Request, res: Response) => {
  const { travel_id } = req.params;
  console.log("end point get all by travel_id (travel_id): ", travel_id);

  const sql = "SELECT * FROM comments WHERE travel_id = ?";
  const values = [travel_id];
  connection.query(sql, values, (error, results) => {
    console.log("results: ", results);
    if (error) {
      res.status(500).send({ error: "Error while fetching data" });
      return;
    }

    res.status(200).send(results);
  });
}

const create = async (req: Request, res: Response) => {
  const { pseudo, content, travel_id, createdAt, updatedAt } = req.body;
  const sql =
    "INSERT INTO comments (pseudo, content, travel_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)";
  const values = [pseudo, content, travel_id, createdAt, updatedAt];

  connection.query(sql, values, (err, results: ResultSetHeader) => {
    if (err) {
      console.error("Error while creating data:", err);
      res.status(500).send({ error: "Error while creating data" });
      return;
    }
    if ("insertId" in results) {
      console.log("results: ", (results as ResultSetHeader).insertId);
    }
    res.status(200).send({ message: "comments created successfully" });
  });
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log("end point update (id): ", id);
  console.log("end point update (body): ", req.body);

  connection.query(
    "SELECT * FROM comments WHERE id = ?",
    [id],
    (error, results) => {
      console.log("results: ", results);
      console.log("error: ", error);
      if (error) {
        console.log("error: ", error);
        res.status(500).send({ error: "Error while fetching data" });
        return;
      }
      if (Array.isArray(results) && results.length === 0) {
        res.status(404).send({ error: "comments not found" });
        return;
      }

      if (Array.isArray(results) && results.length === 1) {
        const currentcomments = results[0];
        const newcomments = {
          ...currentcomments,
          ...req.body,
        };

        console.log("newcomments: ", newcomments);

        const sqlUpdate =
          "UPDATE comments SET pseudo = ?, content = ?, travel_id = ? WHERE id = ?";
        const values = [
          newcomments.pseudo,
          newcomments.content,
          newcomments.travel_id,
          id,
        ];

        connection.query(sqlUpdate, values, (error, results) => {
          if (error) {
            res.status(500).send({ error: "Error while updating data" });
            return;
          }

          res.status(200).send({ message: "comments updated successfully" });
        });
      }
    }
  );
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("end point delete (id): ", id);

  const sqlDelete = "DELETE FROM comments WHERE id = ?";
  const sqlSelect = "SELECT * FROM comments WHERE id = ?";
  const values = [id];

  // Vérifier si l'id existe dans la base de données
  connection.query(sqlSelect, values, (error, results) => {
    if (error) {
      res.status(500).send({ error: "Error while fetching data" });
      return;
    }
    if (Array.isArray(results) && results.length === 0) {
      res.status(404).send({ error: "comments not found" });
      return;
    }
  });

  // Si l'id existe, on peut supprimer
  connection.query(sqlDelete, values, (error, results) => {
    if (error) {
      res.status(500).send({ error: "Error while deleting data" });
      return;
    }

    console.log("results", results);

    res.status(200).send({ message: "comments deleted successfully" });
  });
};

export default {
  getAll,
  getOne,
  getAllByTravelId,
  create,
  update,
  remove,
};