import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import {
  CopilotRuntime,
  OpenAIAdapter,
  copilotRuntimeNodeHttpEndpoint,
} from "@copilotkit/runtime";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey:
    "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",
});
const serviceAdapter = new OpenAIAdapter({ openai });

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/copilotkit", (req, res, next) => {
  const runtime = new CopilotRuntime();
  const handler = copilotRuntimeNodeHttpEndpoint({
    endpoint: "/copilotkit",
    runtime,
    serviceAdapter,
  });

  return handler(req, res, next);
});

app.post("/create", (req, res, next) => {
  console.log("req=", req.body);
  const { path, name, ext, code } = req.body;
  try {
    const outputFile = `${path}/${name}.${ext}`;

    if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
    fs.writeFileSync(outputFile, code);
    res.status(200).send("file created successfully");
  } catch (e) {
    res.status(500).send(e.message);
    console.log("error=", e.message);
  }
});

app.listen(4000, () => {
  console.log("Listening at http://localhost:4000");
});
