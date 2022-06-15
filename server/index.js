const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const cors = require("cors");

const uploadPath = path.join(__dirname, "files");
const LIMIT_FILE = 100 * 1024 * 1024;
const PORT = process.env.PORT ?? 4202;

const http = require("http");
const app = express();
const server = http.createServer(app);

const { Server } = require("socket.io");
const EventEmitter = require("events");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }, 
});

app.use(
  fileUpload({
    limits: { fileSize: LIMIT_FILE },
  })
);
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
const circularEvent = new EventEmitter();
circularEvent.setMaxListeners(1000);

function processUploadFile(f) {
  console.log("[>] upload file: check file size");
  if (f.size >= LIMIT_FILE) throw new Error("Too large file");
  console.log("[>] upload file: file size is valid");
  return new Promise((res, rej) => {
    const randomID = Math.round(Math.random() * 99999999).toString(32);
    fs.mkdirSync(uploadPath, { recursive: true });
    console.log("[>] upload file: dir is created");
    let itemFile = {
      id: randomID,
      name: randomID + path.extname(f.name),
      size: f.size,
      type: f.mimetype,
      md5: f.md5,
      ttl: 1000 * 60 * 60 * 8,
      create_at: +new Date(),
      path: uploadPath + "/" + randomID + path.extname(f.name),
    };
    f.mv(itemFile.path, (err) => {
      if (err) {
        console.log("[X] upload file:", err);
        rej(err);
      } else {
        // fileRepository.add(itemFile);
        res(itemFile);
      }
    });
  });
}
app.get("/avatar/:name", (req, res) => {
  fs.createReadStream(`./files/${req.params.name}`).pipe(res);
});
app.get("/api/ping", async (req, res) => {
  res.status(400).send("pong");
});

const initStateUser = JSON.parse(fs.readFileSync("./user.json", "utf8"));
function save() {
  const content = JSON.stringify(initStateUser);
  fs.writeFileSync("./user.json", content, "utf8");
}
let maxId = initStateUser
  .map((u) => u.id)
  .reduce((acc, prev) => (prev < acc ? acc : prev), 0);
console.log("Max user id", maxId);
app.get("/api/users", async (req, res) => {
  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify(initStateUser));
});

app.put("/api/users", async (req, res) => {
  const user = req.body;
  user["id"] = ++maxId;
  initStateUser.push(user);
  save();
  res.setHeader("content-type", "application/json");
  circularEvent.emit("user", {
    type: "[Example User] User Added",
    payload: user,
  });
  res.send(JSON.stringify(user));
});
app.patch("/api/users/:id", async (req, res) => {
  const userId = +req.params.id;
  const userChange = req.body;
  const userIndex = initStateUser.findIndex((u) => u.id === userId);
  const user = initStateUser[userIndex];
  const userNext = Object.assign(user, userChange);
  initStateUser.splice(userIndex, 1, userNext);
  save();
  circularEvent.emit("user", {
    type: "[Example User] Users updated",
    payload: user,
  });
  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify(userNext));
});
app.delete("/api/users/:id/avatar", async (req, res) => {
  const userId = +req.params.id;
  const userIndex = initStateUser.findIndex((u) => u.id === userId);
  const user = initStateUser[userIndex];
  const userNext = Object.assign(user, { avatar: undefined });
  initStateUser.splice(userIndex, 1, userNext);
  save();
  circularEvent.emit("user", {
    type: "[Example User] User avatar Clered Success",
    id: userId,
  });
  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify(true));
});

app.delete("/api/users/:id", async (req, res) => {
  const userId = +req.params.id;
  const userIndex = initStateUser.findIndex((u) => u.id === userId);
  initStateUser.splice(userIndex, 1);
  save();
  circularEvent.emit("user", {
    type: "[Example User] User Deleted Success",
    id: userId,
  });
  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify(true));
});

app.post("/api/files", async (req, res) => {
  try {
    console.log("[>] upload file");
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send("No files were uploaded.");
    }
    console.log("[>] upload file: have file");

    res.setHeader("Content-Type", "application/json");
    if (req.files["file"].constructor.name == "Array") {
      console.log("[>] upload file: Multyfile upload");
      let allFiles = await Promise.all(
        req.files["file"].map((r) => processUploadFile(r))
      );
      res.send(JSON.stringify(allFiles));
    } else {
      console.log("[>] upload file: Single upload");
      const fileRef = await processUploadFile(req.files["file"]);
      res.send(JSON.stringify([fileRef]));
    }
  } catch (ex) {
    res.status(400).send(ex.message);
  }
});

app.use("/", express.static(path.join(__dirname, "../dist/poc")));
app.use(
  "/webfonts",
  express.static(path.join(__dirname, "../dist/poc/assets/webfonts"))
);

io.on("connection", (socket) => {
  console.log("a user connected");
  const clb = (action) => {
    socket.emit("user", action);
    console.log("[>] Send message", action.type);
  };
  circularEvent.addListener("user", clb);
  socket.on("disconnect", () => {
    console.log("user disconnected");
    circularEvent.removeListener("user", clb);
  });
});

server.listen(PORT, () => {
  console.log(`Node Express server listening on piew.ru:${PORT}`);
});
