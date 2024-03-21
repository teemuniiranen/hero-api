import { Context } from "@aws-appsync/utils";
import * as ddb from "@aws-appsync/utils/dynamodb";
import { ListHeroesQueryVariables, HeroIterator } from "../../API";

export function request(ctx: Context<ListHeroesQueryVariables>) {
  const { region = "", limit, nextToken } = ctx.args;
  return ddb.query({
    query: {
      GSI1PK: { eq: "PROFILE#" },
      GSI1SK: { beginsWith: `REGION#${region}` },
    },
    index: "GSI1",
    limit: limit || undefined,
    nextToken: nextToken || undefined,
  });
}

export function response(ctx: Context) {
  return {
    heroes: ctx.result.items || [],
    nextToken: ctx.result.nextToken,
  } as HeroIterator;
}
