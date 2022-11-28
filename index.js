import fastify from "fastify";
import got from "got";

const app = fastify();
const { HOST: host = "localhost", PORT: port = 6000 } = process.env;
const interval = 60 * 1000;

app.listen({ host, port }, (err, address) => {
  err && (console.log(err) || process.exit(1));
  console.log(`Server listening on ${address}`);
  refresh();
});

app.post("/assets", async (req, reply) => {
  reply.send(req.body.reduce((a, b) => ({ ...a, [b]: assets[b] }), {}));
});

app.post("/icons", async (req, reply) => {
  reply.send(req.body.reduce((a, b) => ({ ...a, [b]: icons[b] }), {}));
});

let icons = {};
let assets = {};

let refresh = async () => {
  console.log(new Date(), "refreshing assets");

  try {
    assets = await got(
      "https://raw.githubusercontent.com/Blockstream/asset_registry_db/master/index.json"
    ).json();

    icons = await got(
      "https://raw.githubusercontent.com/Blockstream/asset_registry_db/master/icons.json"
    ).json();

    console.log(new Date(), "done");
  } catch (e) {
    console.log("failed", e);
  }

  setTimeout(refresh, interval);
};
