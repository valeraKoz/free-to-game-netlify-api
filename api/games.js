import { FREE_TO_PLAY_RAPID_API_BASE_URL, FREE_TO_PLAY_RAPID_HEADERS} from "./api-constants.js";
import {BACKEND_ROUTES} from "../constants.js";
import axios from "axios";

import {getActiveParams, getDataFromPage, isResponseSuccess} from "./utils.js";

export const getFilteredGames = async (params)=> {
    const ACTIVE_PARAMS = getActiveParams(params)
    const {page: ACTIVE_PAGE, tag} = params;
    const url = `${FREE_TO_PLAY_RAPID_API_BASE_URL}${BACKEND_ROUTES.FILTER}`;
    console.log('URL: ', url)
    const response = await axios.get(url, {
        params: ACTIVE_PARAMS,
        headers: FREE_TO_PLAY_RAPID_HEADERS
    });

    if (isResponseSuccess(response) && Array.isArray(response.data)) {
        // Если с клиента пришел номер страницы вернуть данные с пагинацией
        // если нет, тогда вернуть все
        if (ACTIVE_PAGE) {
            return getDataFromPage(ACTIVE_PAGE, response.data);
        } else {
            return getDataFromPage(1, response.data);
        }
    }


    return response.statusText;
}



