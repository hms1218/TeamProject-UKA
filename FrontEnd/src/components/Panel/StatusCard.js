const StatusCard = ({ title, date, region, data, children }) => (
    <div>
        <div className="card-box">
            <h2>{title}</h2>
        </div>
        <p>{date} 기준</p>
        {region && <p>📍 {region}</p>}
        <p>센터 수: {data.centerCount ?? "-"}</p>
        <p>전체 동물 수: {data.animalCount ?? "-"}</p>
        <p>강아지: {data.dogs ?? "-"}</p>
        <p>고양이: {data.cats ?? "-"}</p>
        <p>기타: {data.others ?? "-"}</p>
        {children}
    </div>
);

export default StatusCard;
