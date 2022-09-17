import {ApiNotFoundResponse, ApiOkResponse,} from "@nestjs/swagger";

export function CustomOkResponse(config: { status?: number; description?: string; exampleData: any }) {
    const { status = 200, exampleData, description } = config;
    return ApiOkResponse({
        status,
        description,
        schema: {
            type: 'object',
            example: exampleData,
        }
    })
}

export function CustomNotFoundResponse(config: { status?: number; description?: string; exampleData: any }) {
    const { status = 404, exampleData, description } = config;
    return ApiNotFoundResponse({
        status,
        description,
        schema: {
            type: 'object',
            example: exampleData,
        }
    })
}
