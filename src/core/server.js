const routes = require("../api/router");

const app = express();

app.enable("trust proxy");

app.use(cors());

app.use(require("method-override")());

app.use(`${config.api.prefix}`, routes());

module.exports = app;
