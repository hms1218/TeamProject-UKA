import { useNavigate, useParams } from 'react-router-dom'
import './DetailSelect.css'
import { useEffect } from 'react';
import img1 from "../../assets/test1.jpg"
import img2 from "../../assets/test2.jpg"
import img3 from "../../assets/test3.jpg"
import {Button, Chip} from '@mui/material'

const data = {
          "desertionNo" : "448567202500980",
          "happenDt" : "20250613",
          "happenPlace" : "진해구 명동방파제",
          "kindFullNm" : "[개] 믹스견",
          "upKindCd" : "417000",
          "upKindNm" : "개",
          "kindCd" : "000114",
          "kindNm" : "믹스견",
          "colorCd" : "흰색",
          "age" : "2023(년생)",
          "weight" : "15(Kg)",
          "noticeNo" : "경남-창원1-2025-00377",
          "noticeSdt" : "20250613",
          "noticeEdt" : "20250623",
          "popfile1" : "http://openapi.animal.go.kr/openapi/service/rest/fileDownloadSrvc/files/shelter/2025/06/202506130706422.jpg",
          "popfile2" : "http://openapi.animal.go.kr/openapi/service/rest/fileDownloadSrvc/files/shelter/2025/06/202506130706903.jpg",
          "processState" : "보호중",
          "sexCd" : "M",
          "neuterYn" : "N",
          "specialMark" : "진트리버처럼 생긴 순딩순딩 똥꼬발랄한 아이~키트검사 지알디아양성. 원충약투여.",
          "careRegNo" : "348527200900001",
          "careNm" : "창원동물보호센터",
          "careTel" : "055-225-5701",
          "careAddr" : "경상남도 창원시 성산구 공단로474번길 117 (상복동) 창원동물보호센터",
          "careOwnerNm" : "창원시장",
          "orgNm" : "경상남도 창원시 의창성산구",
          "updTm" : "2025-06-13 07:40:54.0"
        }





export const DetailSelect = () => {

    // Params를 사용해서 선택한 정보 전달
    const {id} = useParams();

    const navigate = useNavigate()

    // 백엔드에서 id(혹은 더 자세한 정보)로 조회해서 단건 정보 받아올 예정.
    useEffect(()=>{
        // fetch

    },[])


    
    

    return(
        <div className="DScontainer">

            <div className='DStop'>
                {/* 이미지 */} 
                <img src={data.popfile1} />
            
            
            </div>{/* end top */}   

            <div className='DSbottom'>
                {/* 가져온 정보로 상세 정보 표시 */}
                <h2>센터 정보</h2>
                <div className='DSinfo-box'>
                    <div className='DSinfo'>
                        <h3><Chip label="유기 번호" className='DSinfo-text' color="primary" /></h3>
                        <p>{data.desertionNo}</p>
                    </div>

                    <div className='DSinfo'>
                        <h3><Chip label="공고 번호" className='DSinfo-text' color="primary" /></h3>
                        <p>{data.noticeNo}</p>
                    </div>

                    <div className='DSinfo'>
                        <h3><Chip label="공고 날짜" className='DSinfo-text' color="primary" /></h3>
                        <p>{data.noticeSdt}~{data.noticeEdt}</p>
                    </div>

                    <div className='DSinfo'>
                        <h3><Chip label="보호센터이름" className='DSinfo-text' color="primary"/></h3>
                        <p>{data.careNm}</p>
                    </div>

                    <div className='DSinfo'>
                        <h3><Chip label="보호센터전화번호" className='DSinfo-text' color="primary"/></h3>
                        <p>{data.careTel}</p>
                    </div>


                    <div className='DSinfo'>
                        <h3><Chip label="보호자닉네임" className='DSinfo-text' color="primary"/></h3>
                        <p>{data.careOwnerNm}</p>
                    </div>

                    <div className='DSinfo'>
                        <h3><Chip label="보호번호" className='DSinfo-text' color="primary"/></h3>
                        <p>{data.careRegNo}</p>
                    </div>

                    <div className='DSinfo'>
                        <h3><Chip label="발견일자" className='DSinfo-text' color="primary"/></h3>
                        <p>{data.happenDt}</p>
                    </div>

                    <div className='DSinfo'>
                        <h3><Chip label="발견장소" className='DSinfo-text' color="primary"/></h3>
                        <p>{data.happenPlace}</p>
                    </div>

                    <div className='DSinfo'>
                        <h3><Chip label="센터주소" className='DSinfo-text' color="primary"/></h3>
                        <p>{data.careAddr}</p>
                    </div>

                    
                </div>



                {/* 가져온 정보로 상세 정보 표시 */}
                <h2>동물정보</h2>
                <div className='DSinfo-box'>
                    <div className='DSinfo'>
                        <h3><Chip label="종류" className='DSinfo-text' color="success"/></h3>
                        <p>{data.upKindNm}</p>
                    </div>

                    <div className='DSinfo'>
                        <h3><Chip label="품종" className='DSinfo-text' color="success"/></h3>
                        <p>{data.kindNm}</p>
                    </div>

                    <div className='DSinfo'>
                        <h3><Chip label="털색" className='DSinfo-text' color="success"/></h3>
                        <p>{data.colorCd}</p>
                    </div>

                    <div className='DSinfo'>
                        <h3><Chip label="출생년도" className='DSinfo-text' color="success"/></h3>
                        <p>{data.age}</p>
                    </div>

                    <div className='DSinfo'>
                        <h3><Chip label="몸무게" className='DSinfo-text' color="success"/></h3>
                        <p>{data.weight}</p>
                    </div>

                    <div className='DSinfo'>
                        <h3><Chip label="성별" className='DSinfo-text' color="success"/></h3>
                        <p>{data.sexCd==='M'?'수컷':'암컷'}</p>
                    </div>

                    <div className='DSinfo'>
                        <h3><Chip label="보호상태" className='DSinfo-text' color="success"/></h3>
                        <p>{data.processState}</p>
                    </div>

                    <div className='DSinfo'>
                        <h3><Chip label="특징" className='DSinfo-text' color="success"/></h3>
                        <p>{data.specialMark}</p>
                    </div>

                    
                </div>

            </div>{/* ent bottom */}
            {/* 고객센터로 값과 함께 전달할 버튼 */}
                <div className='DSbutton'>
                    <Button variant="contained" onClick={()=>navigate('/customer/adoption')} >이전 동물</Button>
                    <Button variant="contained" onClick={()=>navigate('/customer/adoption')} >입양 문의</Button>
                    <Button variant="contained" onClick={()=>navigate('/customer/adoption')} >다음 동물</Button>
                </div>
        </div>//end container
    )
}

