const OverviewPanel = ({ regionInfo }) => {
    return (
        <div className="info-panel">
            <div className="info-top">
                <div className="card-box">
                    <h2>전체 현황판</h2>
                </div>
                <p>{new Date().toISOString().split("T")[0]} 기준</p>
                {/* <p>📍 {regionInfo.name || "지역을 선택하세요"}</p> */}
                <p>센터 수: {regionInfo.centerCount ?? "-"}</p>
                <p>전체 동물 수: {regionInfo.animalCount ?? "-"}</p>
                <p>강아지: {regionInfo.dogs ?? "-"}</p>
                <p>고양이: {regionInfo.cats ?? "-"}</p>
                <p>기타: {regionInfo.others ?? "-"}</p>

                <div className="card-box">
                    <h2>지역 현황판</h2>
                </div>
                <p>{new Date().toISOString().split("T")[0]} 기준</p>
                <p>📍 {regionInfo.name || "지역을 선택하세요"}</p>
                <p>센터 수: {regionInfo.centerCount ?? "-"}</p>
                <p>전체 동물 수: {regionInfo.animalCount ?? "-"}</p>
                <p>강아지: {regionInfo.dogs ?? "-"}</p>
                <p>고양이: {regionInfo.cats ?? "-"}</p>
                <p>기타: {regionInfo.others ?? "-"}</p>
            </div>
            <div className="info-bottom">
                {/* 추가 정보나 차트를 이곳에 배치 가능 */}
            </div>
        </div>
    );
};

export default OverviewPanel;
