import {
  BatchIsAuthorizedCommandInput,
  BatchIsAuthorizedCommandOutput,
  BatchIsAuthorizedInputItem,
  EntityIdentifier,
} from "@aws-sdk/client-verifiedpermissions";
import { CognitoAccessTokenPayload } from "aws-jwt-verify/jwt-model";
import {
  ACTION_ENTITY_TYPE,
  GROUP_ENTITY_TYPE,
  USER_ENTITY_TYPE,
} from "./entity-types";
import log from "../../common/logger";
import { AppSyncAuthorizerResult } from "aws-lambda";

export interface CustomResolverContext {
  sub?: String;
}

export const mapAuthorizationRequests = (
  token: CognitoAccessTokenPayload,
  actionToGraphQlMap: Map<string, string>
): BatchIsAuthorizedInputItem[] => {
  return Array.from(actionToGraphQlMap, (entry) => ({
    principal: {
      entityType: USER_ENTITY_TYPE,
      entityId: process.env.COGNITO_USER_POOL_ID + "|" + token.sub,
    },
    action: {
      actionType: ACTION_ENTITY_TYPE,
      actionId: entry[0],
    },
  }));
};

export const mapCognitoGroupsToParentEntities = (
  token: CognitoAccessTokenPayload
): EntityIdentifier[] | undefined => {
  return token["cognito:groups"]?.map((group) => ({
    entityType: GROUP_ENTITY_TYPE,
    entityId: group,
  }));
};

export const buildBatchIsAuthorizedInput = (
  token: CognitoAccessTokenPayload,
  actionToGraphQlMap: Map<string, string>
): BatchIsAuthorizedCommandInput => {
  return {
    policyStoreId: process.env.POLICY_STORE_ID,
    requests: mapAuthorizationRequests(token, actionToGraphQlMap),
    entities: {
      entityList: [
        {
          identifier: {
            entityType: USER_ENTITY_TYPE,
            entityId: process.env.COGNITO_USER_POOL_ID + "|" + token.sub,
          },
          parents: mapCognitoGroupsToParentEntities(token),
        },
      ],
    },
  };
};

const mapDeniedFields = (
  authorizationResponse: BatchIsAuthorizedCommandOutput,
  actionToGraphQlMap: Map<string, string>
): string[] => {
  if (!authorizationResponse.results)
    throw new Error("Undefined authorization results");

  return authorizationResponse.results.reduce((arr, result) => {
    if (
      !result.request ||
      !result.request.action ||
      !result.request.action.actionId
    )
      throw new Error("Undefined request or action in authorization result");

    if (result.decision === "DENY") {
      const mappedField = actionToGraphQlMap.get(
        result.request.action.actionId
      );
      if (!mappedField)
        throw new Error(
          `Unkown action "${result.request.action.actionId}" in authorization decision`
        );

      arr.push(mappedField);
    }

    return arr;
  }, [] as string[]);
};

export const mapAuthorizationResponse = (
  token: CognitoAccessTokenPayload,
  authorizationResponse: BatchIsAuthorizedCommandOutput,
  actionToGraphQlMap: Map<string, string>
): AppSyncAuthorizerResult<CustomResolverContext> => {
  return {
    isAuthorized: true,
    deniedFields: mapDeniedFields(authorizationResponse, actionToGraphQlMap),
    resolverContext: {
      sub: token.sub,
    },
  };
};
