const API_URL = process.env.REACT_APP_ALL_SIDO_API_URL;
const API_KEY = process.env.REACT_APP_ALL_ANIMAL_API_KEY;
const PAGE_SIZE = 50;

// 	시도 API 호출
export const SidoApiData = async () => {
    let pageIndex = 1;

    try {
        const params = {
            serviceKey: API_KEY,
            numOfRows: PAGE_SIZE,
            pageNo: pageIndex,
        };
        const response = await fetch (
            `${API_URL}?serviceKey=${params.serviceKey}&pageNo=${params.pageNo}&numOfRows=${params.numOfRows}&_type=json`
        );

        const json = await response.json();
        const SidoData = json?.response?.body?.items.item;

        return SidoData;
    } catch (error) {
        return console.error("API 요청 실패:", error);
    }
};