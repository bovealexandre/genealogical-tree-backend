/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app.ts":
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let createError = __webpack_require__(/*! http-errors */ "http-errors");
let express = __webpack_require__(/*! express */ "express");
let path = __webpack_require__(/*! path */ "path");
let cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");
let logger = __webpack_require__(/*! morgan */ "morgan");
let graphqlHTTP = __webpack_require__(/*! express-graphql */ "express-graphql").graphqlHTTP;
let schema = __webpack_require__(/*! ./src/database/schemas/schema */ "./src/database/schemas/schema.ts");
let cors = __webpack_require__(/*! cors */ "cors");
const expressPlayground = __webpack_require__(/*! graphql-playground-middleware-express */ "graphql-playground-middleware-express")["default"];
let app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("*", cors());
const schem = schema.default;
app.use("/graphql", cors(), graphqlHTTP({
    schema: schem,
    // rootValue: global,
    // graphiql: true,
}));
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
module.exports = app;


/***/ }),

/***/ "./src/database/db.ts":
/*!****************************!*\
  !*** ./src/database/db.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const knex_1 = __importDefault(__webpack_require__(/*! knex */ "knex"));
const knexfile_1 = __importDefault(__webpack_require__(/*! ./knexfile */ "./src/database/knexfile.ts"));
const config = knexfile_1.default["development" || 0];
const db = (0, knex_1.default)(config);
exports["default"] = db;


/***/ }),

/***/ "./src/database/knexfile.ts":
/*!**********************************!*\
  !*** ./src/database/knexfile.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config = {
    development: {
        client: "sqlite3",
        connection: {
            filename: "E://Test/timbtrack-test/src/database/dev.sqlite3",
        },
        debug: true,
        useNullAsDefault: true,
    },
    staging: {
        client: "postgresql",
        connection: {
            host: "127.0.0.1",
            database: "my_db",
            user: "username",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
    production: {
        client: "postgresql",
        connection: {
            host: "127.0.0.1",
            database: "my_db",
            user: "username",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};
exports["default"] = config;


/***/ }),

/***/ "./src/database/schemas/schema.ts":
/*!****************************************!*\
  !*** ./src/database/schemas/schema.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const graphql_1 = __webpack_require__(/*! graphql */ "graphql");
const graphql_iso_date_1 = __webpack_require__(/*! graphql-iso-date */ "graphql-iso-date");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const db_1 = __importDefault(__webpack_require__(/*! ../db */ "./src/database/db.ts"));
let familyType = new graphql_1.GraphQLObjectType({
    name: "Family",
    fields: () => ({
        family_id: {
            type: graphql_1.GraphQLString,
        },
        family_name: {
            type: graphql_1.GraphQLString,
        },
        family_details: {
            type: graphql_1.GraphQLString,
        },
        family_description: {
            type: graphql_1.GraphQLString,
        },
        family_date_to: {
            type: graphql_iso_date_1.GraphQLDate,
        },
        family_date_from: {
            type: graphql_iso_date_1.GraphQLDate,
        },
        created_at: {
            type: graphql_iso_date_1.GraphQLDateTime,
        },
        updated_at: {
            type: graphql_iso_date_1.GraphQLDateTime,
        },
    }),
});
let individualType = new graphql_1.GraphQLObjectType({
    name: "Individuals",
    fields: () => ({
        individual_id: {
            type: graphql_1.GraphQLString,
        },
        individual_first_name: {
            type: graphql_1.GraphQLString,
        },
        individual_last_name: {
            type: graphql_1.GraphQLString,
        },
        individual_place_of_birth: {
            type: graphql_1.GraphQLString,
        },
        individual_date_of_birth: {
            type: graphql_iso_date_1.GraphQLDate,
        },
        individual_details: {
            type: graphql_1.GraphQLString,
        },
        individual_gender: {
            type: graphql_1.GraphQLString,
        },
        individual_family_id: {
            type: graphql_1.GraphQLString,
        },
        secondPerson: {
            type: individualType,
            resolve(parent, args) {
                return (0, db_1.default)()
                    .select("*")
                    .from("individuals")
                    .where("id", parent.individual_couple_id)
                    .first();
            },
        },
        children: {
            type: new graphql_1.GraphQLList(individualType),
            resolve(parent, args) {
                return (0, db_1.default)()
                    .select("*")
                    .from("individuals")
                    .where("id", parent.individual_parent_id);
            },
        },
        created_at: {
            type: graphql_iso_date_1.GraphQLDateTime,
        },
        updated_at: {
            type: graphql_iso_date_1.GraphQLDateTime,
        },
    }),
});
let query = new graphql_1.GraphQLObjectType({
    name: "Query",
    fields: {
        families: {
            type: new graphql_1.GraphQLList(familyType),
            resolve() {
                return (0, db_1.default)().select().from("families");
            },
        },
        family: {
            type: familyType,
            args: {
                id: {
                    type: graphql_1.GraphQLString,
                },
            },
            resolve(parent, { id }) {
                return (0, db_1.default)()
                    .select()
                    .from("families")
                    .where("individual_family_id", id)
                    .first();
            },
        },
        //Individuals Query
        getFamily: {
            type: individualType,
            args: {
                id: {
                    type: graphql_1.GraphQLString,
                },
            },
            resolve(parent, { id }) {
                return (0, db_1.default)()
                    .select()
                    .from("individuals")
                    .where("individual_family_id", id)
                    .orderBy("individual_date_of_birth", "desc")
                    .first();
            },
        },
    },
});
// eslint-disable-next-line no-unused-vars
let mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: function () {
        return {
            addFamily: {
                type: familyType,
                args: {
                    family_name: {
                        type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                    },
                    family_details: {
                        type: graphql_1.GraphQLString,
                    },
                    family_description: {
                        type: graphql_1.GraphQLString,
                    },
                    family_date_to: {
                        type: graphql_1.GraphQLString,
                    },
                    family_date_from: {
                        type: graphql_1.GraphQLString,
                    },
                },
                resolve(parent, { family_name, family_details, family_description, family_date_to, family_date_from, }) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const id = (0, uuid_1.v4)();
                        const timestamp = Date.now();
                        yield (0, db_1.default)("families").insert({
                            family_id: id,
                            family_name: family_name,
                            family_details: family_details,
                            family_description: family_description,
                            family_date_to: family_date_to,
                            family_date_from: family_date_from,
                            created_at: timestamp,
                            updated_at: timestamp,
                        });
                    });
                },
            },
            updateFamily: {
                type: familyType,
                args: {
                    family_id: {
                        name: "id",
                        type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                    },
                    family_name: {
                        type: graphql_1.GraphQLString,
                    },
                    family_details: {
                        type: graphql_1.GraphQLString,
                    },
                    family_description: {
                        type: graphql_1.GraphQLString,
                    },
                    family_date_to: {
                        type: graphql_1.GraphQLString,
                    },
                    family_date_from: {
                        type: graphql_1.GraphQLString,
                    },
                },
                resolve(root, params) {
                    (0, db_1.default)()
                        .select()
                        .from("families")
                        .where("id", params.family_id)
                        .first()
                        .then(function (family) {
                        (0, db_1.default)("books")
                            .where("family_id", params.family_id)
                            .update({
                            family_name: params.family_name || family.family_name,
                            family_details: params.family_details || family.family_details,
                            family_description: params.family_description || family.family_description,
                            family_date_to: params.family_date_to || family.family_date_to,
                            family_date_from: params.family_date_from || family.family_date_from,
                        });
                    });
                },
            },
            removeFamily: {
                type: familyType,
                args: {
                    family_id: {
                        type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                    },
                },
                resolve(root, params) {
                    return (0, db_1.default)()
                        .select()
                        .from("families")
                        .where("id", params.family_id)
                        .first()
                        .del();
                },
            },
            // Individuals Mutation
            addIndividual: {
                type: individualType,
                args: {
                    individual_first_name: {
                        type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                    },
                    individual_last_name: {
                        type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                    },
                    individual_place_of_birth: {
                        type: graphql_1.GraphQLString,
                    },
                    individual_date_of_birth: {
                        type: graphql_1.GraphQLString,
                    },
                    individual_details: {
                        type: graphql_1.GraphQLString,
                    },
                    individual_gender: {
                        type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                    },
                    individual_couple_id: {
                        type: graphql_1.GraphQLString,
                    },
                    individual_parent_id: {
                        type: graphql_1.GraphQLString,
                    },
                    individual_family_id: {
                        type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                    },
                },
                resolve(parent, { individual_first_name, individual_last_name, individual_place_of_birth, individual_date_of_birth, individual_details, individual_gender, individual_couple_id, individual_parent_id, individual_family_id, }) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const id = (0, uuid_1.v4)();
                        const timestamp = Date.now();
                        yield (0, db_1.default)("individuals").insert({
                            individual_id: id,
                            individual_first_name: individual_first_name,
                            individual_last_name: individual_last_name,
                            individual_place_of_birth: individual_place_of_birth,
                            individual_date_of_birth: individual_date_of_birth,
                            individual_details: individual_details,
                            individual_gender: individual_gender,
                            individual_couple_id: individual_couple_id,
                            individual_parent_id: individual_parent_id,
                            individual_family_id: individual_family_id,
                            created_at: timestamp,
                            updated_at: timestamp,
                        });
                    });
                },
            },
            updateIndividual: {
                type: individualType,
                args: {
                    individual_id: {
                        name: "id",
                        type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                    },
                    individual_first_name: {
                        type: graphql_1.GraphQLString,
                    },
                    individual_last_name: {
                        type: graphql_1.GraphQLString,
                    },
                    individual_place_of_birth: {
                        type: graphql_1.GraphQLString,
                    },
                    individual_date_of_birth: {
                        type: graphql_1.GraphQLString,
                    },
                    individual_details: {
                        type: graphql_1.GraphQLString,
                    },
                    individual_gender: {
                        type: graphql_1.GraphQLString,
                    },
                    individual_couple_id: {
                        type: graphql_1.GraphQLString,
                    },
                    individual_parent_id: {
                        type: graphql_1.GraphQLString,
                    },
                    individual_family_id: {
                        type: graphql_1.GraphQLString,
                    },
                },
                resolve(root, params) {
                    (0, db_1.default)()
                        .select()
                        .from("individuals")
                        .where("id", params.individual_id)
                        .first()
                        .then(function (individual) {
                        (0, db_1.default)("books")
                            .where("individual_id", params.individual_id)
                            .update({
                            individual_first_name: params.individual_first_name ||
                                individual.individual_first_name,
                            individual_last_name: params.individual_last_name ||
                                individual.individual_last_name,
                            individual_place_of_birth: params.individual_place_of_birth ||
                                individual.individual_place_of_birth,
                            individual_date_of_birth: params.individual_date_of_birth ||
                                individual.individual_date_of_birth,
                            individual_details: params.individual_details || individual.individual_details,
                            individual_gender: params.individual_gender || individual.individual_gender,
                            individual_couple_id: params.individual_couple_id ||
                                individual.individual_couple_id,
                            individual_parent_id: params.individual_parent_id ||
                                individual.individual_parent_id,
                            individual_family_id: params.individual_family_id ||
                                individual.individual_family_id,
                        });
                    });
                },
            },
            removeIndividual: {
                type: individualType,
                args: {
                    individual_id: {
                        type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                    },
                },
                resolve(root, params) {
                    return (0, db_1.default)()
                        .select()
                        .from("individuals")
                        .where("individual_id", params.individual_id)
                        .first()
                        .del();
                },
            },
        };
    },
});
exports["default"] = new graphql_1.GraphQLSchema({
    query: query,
    mutation: mutation,
});


/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/***/ ((module) => {

module.exports = require("debug");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "express-graphql":
/*!**********************************!*\
  !*** external "express-graphql" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("express-graphql");

/***/ }),

/***/ "graphql":
/*!**************************!*\
  !*** external "graphql" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("graphql");

/***/ }),

/***/ "graphql-iso-date":
/*!***********************************!*\
  !*** external "graphql-iso-date" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("graphql-iso-date");

/***/ }),

/***/ "graphql-playground-middleware-express":
/*!********************************************************!*\
  !*** external "graphql-playground-middleware-express" ***!
  \********************************************************/
/***/ ((module) => {

module.exports = require("graphql-playground-middleware-express");

/***/ }),

/***/ "http-errors":
/*!******************************!*\
  !*** external "http-errors" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("http-errors");

/***/ }),

/***/ "knex":
/*!***********************!*\
  !*** external "knex" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("knex");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("morgan");

/***/ }),

/***/ "process/browser":
/*!**********************************!*\
  !*** external "process/browser" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("process/browser");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!********************!*\
  !*** ./bin/www.ts ***!
  \********************/
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "process/browser");
//#!/usr/bin/env node

/* eslint-disable no-undef */
Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Module dependencies.
 */
const app = __webpack_require__(/*! ../app */ "./app.ts");
let debug = __webpack_require__(/*! debug */ "debug")('timbtrack-test:server');
const http_1 = __webpack_require__(/*! http */ "http");
/**
 * Get port from environment and store in Express.
 */
let port = normalizePort(process.env.PORT || '4000');
app.set('port', port);
/**
 * Create HTTP server.
 */
let server = (0, http_1.createServer)(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : addr
            ? 'port ' + addr.port
            : 'port 3000';
    debug('Listening on ' + bind);
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map