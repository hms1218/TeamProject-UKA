// src/components/Panel/OverviewPanel.js
import { useMemo } from "react";
import StatusCard from "./StatusCard";
import useRegionData from "../../hook/useRegionData";

export default function OverviewPanel({ regionInfo }) {
  const { allRegionData = [], loading, error } = useRegionData();

  // 전체 집계
  const overallData = useMemo(() => {
    return allRegionData.reduce(
      (acc, item) => {
        acc.centerCount  += item.centerCount   ?? 0;
        acc.animalCount  += item.animalCount   ?? 0;
        acc.dogs         += item.dogsCount     ?? 0;
        acc.cats         += item.catsCount     ?? 0;
        acc.others       += item.otherCount    ?? 0;
        return acc;
      },
      { centerCount: 0, animalCount: 0, dogs: 0, cats: 0, others: 0 }
    );
  }, [allRegionData]);

  // 차트용 데이터
  const today = new Date().toISOString().split("T")[0];
  const chartData = useMemo(() => [
    {
      name: "전체",
      전체: overallData.animalCount,
      개: overallData.dogs,
      고양이: overallData.cats,
      기타: overallData.others,
    },
    {
      name: regionInfo.name || "선택된 지역",
      전체: regionInfo.animalCount   ?? 0,
      개: regionInfo.dogsCount       ?? 0,
      고양이: regionInfo.catsCount   ?? 0,
      기타: regionInfo.otherCount    ?? 0,
    },
  ], [overallData, regionInfo]);

  if (loading) return <p>Loading…</p>;
  if (error?.type === "empty") return <p>데이터가 없습니다.</p>;
  if (error) return <p>Error: {error.detail || error.message}</p>;

  return (
    <div className="info-panel">
        <div className="info-top">
            {/* 전체 현황판 */}
            <StatusCard title="전체 현황판" date={today} data={overallData} />
            {/* 지역 현황판 */}
            <StatusCard title="지역 현황판" date={today} region={regionInfo.name || "지역을 선택하세요"} data={{
                    centerCount: regionInfo.centerCount ?? 0,
                    animalCount: regionInfo.animalCount ?? 0,
                    dogs:        regionInfo.dogsCount   ?? 0,
                    cats:        regionInfo.catsCount   ?? 0,
                    others:      regionInfo.otherCount  ?? 0,
                }}
            />
        </div>
        <div className="info-bottom">
            {/* 혹시 더 넣으실 다른 컴포넌트가 있다면 */}
        </div>
        </div>
    );
}
