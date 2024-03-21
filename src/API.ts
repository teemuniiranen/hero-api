/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export enum REGION {
  EMEA = "EMEA",
  NA = "NA",
  LATAM = "LATAM",
  APAC = "APAC",
}


export type Hero = {
  __typename: "Hero",
  heroId?: string | null,
  region?: REGION | null,
  name?: string | null,
  alias?: string | null,
};

export type HeroIterator = {
  __typename: "HeroIterator",
  heroes?:  Array<Hero | null > | null,
  nextToken?: string | null,
};

export type AddHeroMutationVariables = {
  name: string,
  region: REGION,
  alias: string,
};

export type AddHeroMutation = {
  addHero:  {
    __typename: "Hero",
    heroId?: string | null,
    region?: REGION | null,
    name?: string | null,
    alias?: string | null,
  },
};

export type GetHeroQueryVariables = {
  heroId: string,
};

export type GetHeroQuery = {
  getHero?:  {
    __typename: "Hero",
    heroId?: string | null,
    region?: REGION | null,
    name?: string | null,
    alias?: string | null,
  } | null,
};

export type ListHeroesQueryVariables = {
  region?: REGION | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListHeroesQuery = {
  listHeroes:  {
    __typename: "HeroIterator",
    heroes?:  Array< {
      __typename: "Hero",
      heroId?: string | null,
      region?: REGION | null,
      name?: string | null,
      alias?: string | null,
    } | null > | null,
    nextToken?: string | null,
  },
};
