import axios from "axios";

export const fetchRegionData = async (regionId) => {
    if (regionId === "gyeonggi") {
        const API_URL = "https://openapi.gg.go.kr/AbdmAnimalProtect";
        const API_KEY = "83bf0ac4c32a47ba80ff7914a7ec4a5e";
        const PAGE_SIZE = 100;

        let allData = [];
        let pageIndex = 1;

        while (true) {
            try {
                const response = await axios.get(API_URL, {
                    params: {
                        KEY: API_KEY,
                        Type: "json",
                        pIndex: pageIndex,
                        pSize: PAGE_SIZE,
                    },
                });

                const AbdmAnimalProtect = response.data?.AbdmAnimalProtect;
                const data = Array.isArray(AbdmAnimalProtect) &&
                    AbdmAnimalProtect.length > 1 &&
                    AbdmAnimalProtect[1]?.row
                    ? AbdmAnimalProtect[1].row
                    : [];

                if (!data.length) break;

                allData = allData.concat(data);
                pageIndex++;
            } catch (error) {
                console.error("API 요청 실패:", error);
                break;
            }
        }

        return allData;
    }

    return [];
};

/**
 * 전체 지역 데이터를 불러오는 함수 (현재는 경기도만 대상)
 */
export const fetchAllRegionsData = async () => {
    const regionIds = ["gyeonggi"]; // 추후에 다른 지역 ID 추가 가능
    const result = {};

    for (const id of regionIds) {
        const data = await fetchRegionData(id);
        result[id] = data;
    }

    return result;
};
