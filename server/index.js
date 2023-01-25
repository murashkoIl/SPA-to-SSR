import path from "path";
import fs from "fs";

import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import express from "express";
import App from "../src/App";

const PORT = process.env.PORT || 3000;
const app = express();
const router = express.Router();

app.use(express.static("./build"));

app.get("*", (req, res) => {
  const context = {};
  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  const indexFile = path.resolve("./build/index.html");

  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Something went wrong");
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

router.use(
  express.static(path.resolve(__dirname, "..", "build"), { maxAge: "10d" })
);

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
