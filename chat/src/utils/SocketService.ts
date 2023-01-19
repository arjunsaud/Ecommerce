import { WebSocket } from "ws";

export interface IClient {
  userid: string;
  socket: WebSocket;
}

export interface ISocketService { 
    insertClient(userid:string, ws: WebSocket):void,
    getClient(userid: string): IClient | undefined,
    removeClient(userid: string) : IClient[]
}
class SocketService implements ISocketService {
  private clients: IClient[] = [];

  insertClient(userid: string, ws: WebSocket): WebSocket {
    //Check if the client exists;
    const client = this.getClient(userid);
    if (client) {      
      const newClients = this.removeClient(userid);
      this.clients = [...newClients];
    }
    this.clients = [...this.clients, { userid, socket: ws }];
    return ws;
  }

  getClient(userid: string): IClient | undefined {
    const client = this.clients.find((client) => client.userid.toString() === userid);
    return client;
  }

  removeClient(userid: string) : IClient[] {
    return this.clients.filter((client) => client.userid !== userid);
  }


  
}

const socketService  = new SocketService();
export default socketService;
