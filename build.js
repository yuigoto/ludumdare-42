/**
 * UNLOCKR : Build
 * ----------------------------------------------------------------------
 * Builds the application.
 *
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */

// Load environment variables from .env
require("dotenv").config();

// Imports
const async       = require("async");
const copy        = require("copy");
const fs          = require("fs");
const path        = require("path");
const sass        = require("node-sass");

// Set path constants
const OUT_DIR     = process.env.OUT_DIR || "build";
const BUILD_PATH  = path.resolve(__dirname, OUT_DIR) + "\\";

// Creates build folder
if (!fs.existsSync(BUILD_PATH)) mkdirSync(BUILD_PATH);

// Execute build with sync
module.exports    = async.series(
  [
    // Assets
    callback => {
      copy(
        ["src/assets/**/*"],
        BUILD_PATH + "assets",
        null,
        (err, files) => {
          callback(err, files);
        }
      );
    },

    // Copy Node modules
    callback => {
      copy(
        ["node_modules/phaser-ce/build/phaser*.*"],
        BUILD_PATH + "assets/js",
        null,
        (err, files) => {
          callback(err, files);
        }
      );
    },

    // Copy static files
    callback => {
      copy(
        ["src/static/**/*"],
        BUILD_PATH,
        null,
        (err, files) => {
          callback(err, files);
        }
      );
    },

    // SCSS
    callback => {
      let CSS_DIR   = BUILD_PATH + "assets/css/",
          CSS_MAP   = "build.css.map",
          CSS_FILE  = "build.css";

      sass.render(
        {
          file: "src/scss/main.scss",
          outFile: CSS_DIR + CSS_FILE,
          outputStyle: "compressed",
          precision: 8,
          sourceMap: true
        },
        (err, result) => {
          fs.mkdirSync(CSS_DIR);
          fs.writeFileSync(
            CSS_DIR + CSS_FILE,
            result.css.toString(),
            err => {
              if (err) console.error(`Could not save "${CSS_FILE}"`);
            }
          );
          fs.writeFileSync(
            CSS_DIR + CSS_MAP,
            result.map.toString(),
            err => {
              if (err) console.error(`Could not save "${CSS_MAP}"`);
            }
          );
          callback(err, result);
        }
      );
    }
  ],
  (err, result) => {
    if (err) {
      console.log(result);
      console.error(`Errors: ${err}`);
    }
  }
);
