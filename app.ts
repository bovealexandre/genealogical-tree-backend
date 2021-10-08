/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let createError = require("http-errors")
let express = require("express")
let path = require("path")
let cookieParser = require("cookie-parser")
let logger = require("morgan")

let graphqlHTTP = require("express-graphql").graphqlHTTP
let schema = require("./src/database/schemas/schema")
let cors = require("cors")
const expressPlayground =
  require("graphql-playground-middleware-express").default

let app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("*", cors())
const schem = schema.default
app.use(
  "/graphql",
  cors(),
  graphqlHTTP({
    schema: schem,
    // rootValue: global,
    // graphiql: true,
  })
)

app.get("/playground", expressPlayground({ endpoint: "/graphql" }))

// catch 404 and forward to error handler
app.use(function (req: any, res: any, next: (arg0: any) => void) {
  next(createError(404))
})

// error handler
app.use(function (
  err: { message: any; status: any },
  req: { app: { get: (arg0: string) => string } },
  res: {
    locals: { message: any; error: any }
    status: (arg0: any) => void
    render: (arg0: string) => void
  },
  next: any
) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
