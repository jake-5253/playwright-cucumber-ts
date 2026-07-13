import { framework } from "../../config/framework";

export class AllureService {

    attachScreenshot(
        attach: Function,
        buffer: Buffer
    ) {

        if (!framework.allure)
            return;

        attach(
            buffer,
            "image/png"
        );
    }
}