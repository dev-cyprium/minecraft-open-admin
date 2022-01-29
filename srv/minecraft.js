import { spawn } from "child_process";
import readlastlines from "read-last-lines";

let minecraftProcess = null;
let shutDown = false;
const clients = [];

const mcPath = process.env.MINECRAFT_SERVER_PATH;
const scriptName = process.env.SCRIPT_NAME;

const addClient = client => {
  clients.push(client);
};

const initialLogs = async n => {
  return readlastlines.read(mcPath + "/logs/latest.log", n);
};

const start = io => {
  if (minecraftProcess) {
    return;
  }

  const minecraftStartScript = mcPath + "/" + scriptName;
  const mcProcess = spawn(minecraftStartScript, {
    cwd: mcPath + "/"
  });
  minecraftProcess = mcProcess;

  const sendLogs = isError => data => {
    let suffix = "";

    if (shutDown) {
      suffix = "-sd";
    }

    if (isError) {
      io.emit("server-output-stderr" + suffix, {
        message: data.toString("utf8")
      });
    } else {
      io.emit("server-output-stdout" + suffix, {
        message: data.toString("utf8")
      });
    }
  };

  mcProcess.stdout.on("data", sendLogs(false));
  mcProcess.stderr.on("data", sendLogs(true));
  mcProcess.on("exit", code => {
    io.emit("server-output-exit", { message: `Exited with code: ${code}` });
    minecraftProcess = null;
    shutDown = false;
  });
};

const sendMessage = message => {
  console.log("Is mc process null: ", minecraftProcess === null);
  if (minecraftProcess) {
    minecraftProcess.stdin.write(message);
  }
};

const stop = () => {
  if (!minecraftProcess) return;
  shutDown = true;

  minecraftProcess.stdin.setEncoding("utf8");
  minecraftProcess.stdin.write("stop\n");
};

const kill = () => {};

const status = () => {
  return minecraftProcess !== null;
};

export default {
  start,
  stop,
  kill,
  status,
  addClient,
  initialLogs,
  sendMessage
};
