import { AppSync } from "aws-sdk";
import { readFile } from "fs/promises";
const appsync = new AppSync({ region: "eu-north-1" });
const file = "./out/appsync/addHero.js";

test("validate an add hero request", async () => {
  const context = JSON.stringify({
    arguments: { name: "John Doe", region: "EMEA", alias: "Super John" },
  });
  const code = await readFile(file, { encoding: "utf8" });
  const runtime = { name: "APPSYNC_JS", runtimeVersion: "1.0.0" };
  const params = { context, code, runtime, function: "request" };

  const response = await appsync.evaluateCode(params).promise();
  expect(response.error).toBeUndefined();
  expect(response.evaluationResult).toBeDefined();
  const result = JSON.parse(response.evaluationResult || "{}");
  expect(result.operation).toEqual("PutItem");
  expect(result.key.PK.S).toMatch(/^HERO_ID#/);
  expect(result.key.SK.S).toEqual("PROFILE#");
  expect(result.attributeValues.name.S).toEqual("John Doe");
  expect(result.attributeValues.region.S).toEqual("EMEA");
  expect(result.attributeValues.alias.S).toEqual("Super John");
  expect(result.attributeValues).toHaveProperty("heroId");
  expect(result.attributeValues.GSI1PK.S).toEqual("PROFILE#");
  expect(result.attributeValues.GSI1SK.S).toMatch("REGION#EMEA");
});
