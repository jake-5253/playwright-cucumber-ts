import fs from "fs";
import axios from "axios";
import { framework } from "../../config/framework";
import { xrayConfig } from "../../integrations/xray/xray.config";
import { XrayClient } from "./xrayClient";

export class XrayService {

    private client = new XrayClient();

    async uploadResults() {

        if (!framework.xray)
            return;

        const token =
            await this.client.authenticate({

                client_id: xrayConfig.clientId,
                client_secret: xrayConfig.clientSecret
            });

        const report =
            fs.readFileSync(
                "./reports/cucumber-report.json");

        await axios.post(
            "https://xray.cloud.getxray.app/api/v2/import/execution/cucumber",
            report,

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"

                }
            }
        );
    }
}