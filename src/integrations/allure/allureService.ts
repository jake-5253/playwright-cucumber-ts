import { framework } from "../../config/framework";

export class AllureService {

    async attachScreenshot(
        attach: (content: any, mimeType: string) => Promise<unknown>,
        buffer: Buffer
    ) {

        if (!framework.allure)
            return;

        await attach(
            buffer,
            "image/png"
        );
    }
}