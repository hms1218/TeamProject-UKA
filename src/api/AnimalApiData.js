import axios from "axios";

export const fetchRegionData = async () => {
        const API_URL = process.env.REACT_APP_ALL_ANIMAL_API_URL;
        const API_KEY = process.env.REACT_APP_ALL_ANIMAL_API_KEY;
        
        let pageIndex = 1;
        const PAGE_SIZE = 1000;
        
        let allData = [];

        while (true) {
            try {
                const params = {
                    serviceKey: API_KEY,
                    pageNo: pageIndex,
                    numOfRows: PAGE_SIZE,
                };
                const response = await fetch (
                    `${API_URL}?serviceKey=${params.serviceKey}&pageNo=${params.pageNo}&numOfRows=${params.numOfRows}&_type=json`
                );

                const json = await response.json();

                // 구조 분해로 item 배열 추출
                // const items = json?.response?.body?.items?.item;
                const AnimalProtect = json?.response?.body?.items.item;

                const data = Array.isArray(AnimalProtect) &&
                    AnimalProtect.length > 1 &&
                    AnimalProtect ? AnimalProtect : [];

                console.log("보호 동물 리스트:", data);

                if (!data.length) break;

                allData = allData.concat(data);
                pageIndex++;
                
            } catch (error) {
                console.error("API 요청 실패:", error);
                break;
            }
        }
        console.log(allData);

        return allData;
};

/**
 * 전체 지역 데이터를 불러오는 함수 (현재는 경기도만 대상)
 */
// export const fetchAllRegionsData = async () => {
//     const regionIds = ["gyeonggi"]; // 추후에 다른 지역 ID 추가 가능
//     const result = {};

//     for (const id of regionIds) {
//         const data = await fetchRegionData(id);
//         result[id] = data;
//     }

//     return result;
// };
