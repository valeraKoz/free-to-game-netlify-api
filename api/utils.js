import {FREE_TO_PLAY_PAGE_LIMIT} from "./api-constants.js";

/**
 * Проверка запроса на успешность
 * @param response
 * @returns boolean
 */
export const isResponseSuccess = (response) => {
    return response.status === 200 && response.data;
};


/**
 *  Возвращает нужные параметры для запроса
 *  ключ category меняется на tag (специфика АПИ)
 * @param params
 * @returns {{"sort-by": string, tag: string, platform: string}}
 */
export const getActiveParams = (params) =>{
    const {tag, platform, 'sort-by': sortBy} = params;
    return  {
        "tag": tag,
        "platform": platform,
        'sort-by': sortBy ? sortBy : 'popularity',
    }
}

/**
 *
 * @param page номер страницы
 * @param requestData данные с сервера
 * @returns {{result: *[], length}}
 */
export const getDataFromPage = (page, requestData)=> {
    const data = {
        totalPage: getTotalPageCount(requestData.length),
        dataPerPage: FREE_TO_PLAY_PAGE_LIMIT,
        length: requestData.length,
        result: []
    }
    if (page > data.totalPage) {
        data.result = `There are ${data.totalPage} pages in total, no data for page ${page}`;
    }
    const firstIndexOnPage = page*FREE_TO_PLAY_PAGE_LIMIT - FREE_TO_PLAY_PAGE_LIMIT;
    const lastIndexOnPage = page*FREE_TO_PLAY_PAGE_LIMIT;
    for(let i = firstIndexOnPage; i < lastIndexOnPage; i++){
        requestData[i] && data.result.push(requestData[i]);
    }
    return data
}

/**
 * Сколько страниц с данными всего
 * @param length
 * @returns {number}
 */
const getTotalPageCount = (length) =>{
    return Math.ceil(length / FREE_TO_PLAY_PAGE_LIMIT);
}