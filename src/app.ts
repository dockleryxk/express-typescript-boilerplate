import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import "dotenv/config"
import fs from "fs"
import path from "path"
import { createServer as createLiveReloadServer } from "livereload"
import connectLivereload from "connect-livereload"

const app: express.Application = express()

const liveReloadServer = createLiveReloadServer()
liveReloadServer.watch(path.join(__dirname, "public"))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(connectLivereload())

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).sendFile(path.join(__dirname, "public/index.html"))
})

app.get("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("success")
})

app.post("*", (req: Request, res: Response, next: NextFunction) => {
  const stringifiedBody = JSON.stringify(req.body, null, 2)
  console.log(stringifiedBody)
  const logString = `"${ new Date().toISOString() }": ${ stringifiedBody }\n\n--------------------------------------------------------------------------------\n\n`
  fs.appendFile("./post-data.log", logString, (err) => {
    if (err) {
      console.log(err)
    }
  })
  res.status(200).send("[accepted]")
})

app.listen(process.env.PORT || 3000, () => {
  if (!process.env.PORT) {
    console.warn("\x1b[31m%s\x1b[0m", "It looks like you do not have a .env file or have not set the PORT environment variable.")
    console.warn("\x1b[31m%s\x1b[0m", "Please create a .env file in the root of the project and add a PORT variable with the desired port number.")
    console.log("\x1b[35m%s\x1b[0m", "fallback: express is listening on port 3000")
  }
  else {
    console.log("\x1b[35m%s\x1b[0m", `express is listening on port ${ process.env.PORT }!`)
  }
})
