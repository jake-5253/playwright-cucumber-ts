import axios from "axios";
import { AuthenticateRequest } from "./xrayRequest";

export class XrayClient {

    async authenticate(request: AuthenticateRequest) {

        const response = await axios.post(
            "https://xray.cloud.getxray.app/api/v2/authenticate",
            request
        );

        return response.data;
    }
}