import express from "express";
import minecraft from "./minecraft";
import { Server } from "http";
import socketio from "socket.io";
import cors from "cors";

const app = express();
const server = Server(app);
const io = socketio(server);

app.use(cors());
// io.on("connection", function(socket) {
//   minecraft.addClient(socket);
// });

app.use(express.static("dist"));

app.post("/start", (_, res) => {
  minecraft.start(io);
  res.status(200);
  res.send({ success: true });
});

app.get("/status", (_, res) => {
  res.status(200);
  res.send({ status: minecraft.status() });
});

app.delete("/stop", (req, res) => {
  minecraft.stop();
  res.status(200);
  res.send({ status: "stopped" });
});

app.get("/initial", async (_, res) => {
  res.status(200);
  res.send({ logs: (await minecraft.initialLogs(25)).split("\n") });
});

app.delete("/kill", (req, res) => {});

server.listen(3000, () => {
  console.log("App listening on localhost:3000");
});
