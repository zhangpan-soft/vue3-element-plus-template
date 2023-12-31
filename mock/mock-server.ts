import chokidar from "chokidar";
import bodyParser from "body-parser";
import chalk from "chalk";
import * as path from "path";
import Mock from "mockjs";
import { mocks } from "./index";

const mockDir = path.join(process.cwd(), "mock");

function registerRoutes(app: any) {
  let mockLastIndex;
  const mocksForServer = mocks.map((route) => {
    return responseFake(route.url, route.type, route.response);
  });
  for (const mock of mocksForServer) {
    app[mock.type](mock.url, mock.response);
    mockLastIndex = app._router.stack.length;
  }
  const mockRoutesLength = Object.keys(mocksForServer).length;
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength,
  };
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach((i) => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)];
    }
  });
}

// for mock server
const responseFake = (url: string, type: string, respond: any) => {
  return {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
    type: type || "get",
    response(req: any, res: any) {
      console.log("request invoke:" + req.path);
      res.json(
        Mock.mock(respond instanceof Function ? respond(req, res) : respond)
      );
    },
  };
};

module.exports = (app: any) => {
  // parse app.body
  // https://expressjs.com/en/4x/api.html#req.body
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  const mockRoutes = registerRoutes(app);
  let mockRoutesLength = mockRoutes.mockRoutesLength;
  let mockStartIndex = mockRoutes.mockStartIndex;

  // watch files, hot reload mock server
  chokidar
    .watch(mockDir, {
      ignored: /mock-server/,
      ignoreInitial: true,
    })
    .on("all", (event, path) => {
      if (event === "change" || event === "add") {
        try {
          // remove mock routes stack
          app._router.stack.splice(mockStartIndex, mockRoutesLength);

          // clear routes cache
          unregisterRoutes();

          const mockRoutes = registerRoutes(app);
          mockRoutesLength = mockRoutes.mockRoutesLength;
          mockStartIndex = mockRoutes.mockStartIndex;

          console.log(
            chalk.magentaBright(
              `\n > Mock Server hot reload success! changed  ${path}`
            )
          );
        } catch (error) {
          console.log(chalk.redBright(error));
        }
      }
    });
};
