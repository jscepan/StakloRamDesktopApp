const express = require("express");
const app = express();
const PORT = 6768;
app.use(express.json());

app.get("/invoices", (req, res) => {
  res.status(200).send([
    {
      id: 1,
      amount: 444,
    },
    {
      id: 1,
      amount: 444,
    },
    {
      id: 1,
      amount: 444,
    },
  ]);
});

app.get("/invoices/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).send({
    id: 1,
    amount: 444,
  });
});

app.listen(PORT, () => {
  console.log("Server started");
});
