const app = require("express")();
const PORT = 8080;

app.use(JSON);

app.listen(PORT, () => {});

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
