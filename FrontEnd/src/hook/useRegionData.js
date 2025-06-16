import { useState, useEffect, useMemo } from "react";
import { fetchSavedAnimals } from "../api/AnimalApiData";
import { MainMockData } from "../data/MainMockData";

export default function useRegionData() {
    const [rawData, setRawData] = useState([]); // API에서 파싱해온 객체 배열
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                // const allData = await fetchSavedAnimals();
                const allData = MainMockData;
                setRawData(allData);
                
                if (!allData || Object.keys(allData).length === 0) {
                    setError({ type: "empty" });
                }
            } catch (e) {
                setError({ type: "server", detail: e.message });
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

  // rawData를 “전체/지역별 집계용” allRegionData로 변환
  const allRegionData = useMemo(() => {
    const map = {};

    rawData.forEach(item => {
      // 1) 지역 키: 예시로 orgNm(“경상남도 창원시 의창성산구”)를 사용
      const regionCode = item.orgNm;
      if (!map[regionCode]) {
        map[regionCode] = {
          regionCode,
          regionName: regionCode,
          centerSet: new Set(),  // 보호소 개수
          animalCount: 0,        // 동물 총합
          dogsCount: 0,          // 개
          catsCount: 0,          // 고양이
          othersCount: 0,        // 그 외
        };
      }

      const r = map[regionCode];
      // 보호소 고유번호(careRegNo)별로 하나만 세기 위해 Set 사용
      r.centerSet.add(item.careRegNo);

      // 동물 한 마리 추가
      r.animalCount += 1;

      // 종류별 집계
      switch (item.upKindNm) {
        case "개":
          r.dogsCount += 1;
          break;
        case "고양이":
          r.catsCount += 1;
          break;
        default:
          r.othersCount += 1;
      }
    });

    // Set → 숫자로 변환하고, Plain Object 배열로 리턴
    return Object.values(map).map(r => ({
      regionCode:   r.regionCode,
      regionName:   r.regionName,
      centerCount:  r.centerSet.size,
      animalCount:  r.animalCount,
      dogsCount:    r.dogsCount,
      catsCount:    r.catsCount,
      otherCount:   r.othersCount,
    }));
  }, [rawData]);

  return { allRegionData, loading, error };
}