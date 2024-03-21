/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getHero = /* GraphQL */ `query GetHero($heroId: ID!) {
  getHero(heroId: $heroId) {
    heroId
    region
    name
    alias
    __typename
  }
}
` as GeneratedQuery<APITypes.GetHeroQueryVariables, APITypes.GetHeroQuery>;
export const listHeroes = /* GraphQL */ `query ListHeroes($region: REGION, $limit: Int, $nextToken: String) {
  listHeroes(region: $region, limit: $limit, nextToken: $nextToken) {
    heroes {
      heroId
      region
      name
      alias
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListHeroesQueryVariables,
  APITypes.ListHeroesQuery
>;
