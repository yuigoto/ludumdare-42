/**
 * UNLOCKR : Serve
 * ----------------------------------------------------------------------
 * Serves the application using Express.
 *
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
require("dotenv").config();
const express     = require("express");
const path        = require("path");

// Path
const OUT_DIR     = process.env.OUT_DIR || "build";
const BUILD_PATH  = path.resolve(__dirname, OUT_DIR) + "\\";

// Express
const APP         = express();
const APP_PORT    = process.env.PORT || 4242;
// const APP_MODE    = process.env.NODE_ENV || "development";

// Set to serve directory and index.html
APP.use("/", express.static(OUT_DIR));
APP.use("/", (request, response) => {
  response.sendFile(
    path.resolve(BUILD_PATH, "index.html")
  );
});

// Serve it!
APP.listen(APP_PORT, err => {
  if (err) console.error(err);
  console.log("Application running on http://localhost:" + APP_PORT);
});
