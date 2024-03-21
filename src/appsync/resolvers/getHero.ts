import { Context } from "@aws-appsync/utils";
import * as ddb from "@aws-appsync/utils/dynamodb";
import { GetHeroQueryVariables, Hero } from "../../API";

export function request(ctx: Context<GetHeroQueryVariables>) {
  const { heroId } = ctx.args;
  return ddb.get({
    key: {
      PK: `HERO_ID#${heroId}`,
      SK: "PROFILE#",
    },
  });
}

export function response(ctx: Context) {
  return ctx.result as Hero;
}
