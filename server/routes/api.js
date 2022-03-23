module.exports = (app, connection) => {
  app.get("/api/alluser", async (req, res) => {
    try {
      await connection.query("SELECT * FROM users", (err, result, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        // console.log(result);
        res.status(200).json({ result: result });
      });
    } catch (error) {
      console.log(err);
      return res.status(500).send();
    }
  });
  app.post("/api/creatuser", async (req, res) => {
    let name = req.body.user_name;
    let email = req.body.user_email;
    let status = req.body.user_status;

    await connection.query(
      "INSERT INTO users (user_name,user_email,user_status) VALUES(?,?,?)",
      [name, email, status],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          //console.log(result);
          res.send("Insert susscessed");
        }
      }
    );
  });

  app.put("/api/updateuser/:id", async (req, res) => {
    let id = req.params.id;
    let name = req.body.user_name;
    let email = req.body.user_email;
    let status = req.body.user_status;

    await connection.query(
      "UPDATE users SET user_name = ?,user_email = ?,user_status = ? WHERE user_id = ?",
      [name, email, status, id],

      (err, result) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          console.log(result);
          res.send("Update susscessed");
        }
      }
    );
  });

  app.delete("/api/deleteuser/:id", async (req, res) => {
    let id = req.params.id;

    await connection.query(
      "DELETE FROM users WHERE user_id = ?",
      id,
      (err, result) => {
        if (err) {
          console.log(err);
          res.send("Delete Fail");
        } else {
          res.send(result);
        }
      }
    );
  });
};
