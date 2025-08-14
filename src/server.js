import app from "./app.js";

//const PORT = process.env.PORT || 3000;
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`We're listening the server on http://localhost:${PORT}`);
});
