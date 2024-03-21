import { AppSyncAuthorizerEvent, AppSyncAuthorizerResult } from "aws-lambda";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import log from "../../common/logger";
import {
  VerifiedPermissionsClient,
  BatchIsAuthorizedCommand,
} from "@aws-sdk/client-verifiedpermissions";
import {
  CustomResolverContext,
  buildBatchIsAuthorizedInput,
  mapAuthorizationResponse,
} from "./permissions";
import { buildActionToGraphQlMap } from "./entity-types";

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID || "",
  tokenUse: "access",
  clientId: process.env.COGNITO_CLIENT_ID || "",
});

const client = new VerifiedPermissionsClient();

export const handler = async (
  event: AppSyncAuthorizerEvent
): Promise<AppSyncAuthorizerResult<CustomResolverContext>> => {
  log.debug("Event", { event });
  const {
    authorizationToken,
    requestContext: { apiId, accountId },
  } = event;

  try {
    const token = await verifier.verify(authorizationToken);
    log.debug("Token", token);

    const actionToGraphQlMap = buildActionToGraphQlMap(accountId, apiId);
    log.debug("Actions map", Object.fromEntries(actionToGraphQlMap.entries()));

    const input = buildBatchIsAuthorizedInput(token, actionToGraphQlMap);
    log.debug("BatchIsAuthorizedRequest", input);

    const command = new BatchIsAuthorizedCommand(input);
    const authorizationResponse = await client.send(command);
    log.debug("BatchIsAuthorizedResponse", authorizationResponse);

    const response = mapAuthorizationResponse(
      token,
      authorizationResponse,
      actionToGraphQlMap
    );
    log.debug("Returning authorizer response", response);

    return response;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    log.error(message);
  }

  const deniedResponse = {
    isAuthorized: false,
    resolverContext: {},
  };

  log.debug("Returning denied response", deniedResponse);
  return deniedResponse;
};
