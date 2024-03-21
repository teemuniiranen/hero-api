/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const addHero = /* GraphQL */ `mutation AddHero($name: String!, $region: REGION!, $alias: String!) {
  addHero(name: $name, region: $region, alias: $alias) {
    heroId
    region
    name
    alias
    __typename
  }
}
` as GeneratedMutation<
  APITypes.AddHeroMutationVariables,
  APITypes.AddHeroMutation
>;
