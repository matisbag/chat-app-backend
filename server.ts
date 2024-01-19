import { Application, load } from "./deps.ts";

await load({
  export: true,
});

const port = Number(Deno.env.get("PORT"));
const hostname = Deno.env.get("HOSTNAME");
const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ?? "localhost"
    }:${port}`,
  );
});

await app.listen({ hostname, port });
