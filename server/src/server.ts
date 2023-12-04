import { app } from "./app";

export const server = app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Node Express Server listening on SERVER_PORT:${process.env.SERVER_PORT}`
  );
});
