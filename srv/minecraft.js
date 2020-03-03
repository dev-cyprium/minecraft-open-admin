import { spawn } from "child_process";
let minecraftProcess = null;
let shutDown = false;
const clients = [];

const addClient = client => {
  clients.push(client);
};

const start = io => {
  if (minecraftProcess) {
    return;
  }

  const minecraftStartScript =
    "/Users/stefankupresak/projects/httpstef/minecraft-admin/mc/StartServer.sh";
  const mcProcess = spawn(minecraftStartScript, {
    cwd: "/Users/stefankupresak/projects/httpstef/minecraft-admin/mc/"
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

export default { start, stop, kill, status, addClient };
