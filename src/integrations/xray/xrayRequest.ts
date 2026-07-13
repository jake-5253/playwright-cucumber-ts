export interface AuthenticateRequest {

    client_id: string;
    client_secret: string;

}

export interface ImportExecutionRequest {

    executionKey?: string;
    testPlanKey?: string;

}