import fs from "fs";
import path from "path";
import yaml from "yaml";
import { swaggerSpec } from "../src/swagger";

const yamlDoc = yaml.stringify(swaggerSpec);

const outputPath = path.join(
  __dirname,
  "../docs/openapi.yaml"
);

fs.writeFileSync(outputPath, yamlDoc, "utf8");

console.log("OpenAPI YAML generated at docs/openapi.yaml");
