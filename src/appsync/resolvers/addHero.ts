import { Context, util } from "@aws-appsync/utils";
import { AddHeroMutationVariables, Hero } from "../../API";

export function request(ctx: Context<AddHeroMutationVariables>) {
  const heroId = util.autoId();
  return {
    operation: "PutItem",
    key: util.dynamodb.toMapValues({ PK: `HERO_ID#${heroId}`, SK: "PROFILE#" }),
    attributeValues: util.dynamodb.toMapValues({
      heroId,
      ...ctx.args,
      GSI1PK: "PROFILE#",
      GSI1SK: `REGION#${ctx.args.region}`,
    }),
  };
}

export function response(ctx: Context) {
  return ctx.result as Hero;
}
