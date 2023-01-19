import http from "http";
import app from "./app";
import WebSocket from "ws";
import url from "url";
import UserService from "../user/user.services";
import UserModel from "../model/user.model";
import socketService from "../utils/SocketService";

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on("connection", async (ws, request: any) => {

  const { userid } = url.parse(request.url, true).query;

  if (!userid) {
    return;
  }

  const userService = new UserService(UserModel);
  const user = await userService.getUser(userid?.toString());

  if (!user) {
    return;
  }

  if (user.userid) socketService.insertClient(user?.userid.toString(), ws);

  ws.on("message", (message) => {});

  // const data=socketService.getClient(user.userid)
  // console.log(data);

  // ws.send(JSON.stringify(messageObj))

  ws.on("close", () => {});
});

export default server;
