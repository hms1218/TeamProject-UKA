import { useNavigate, useParams } from 'react-router-dom'
import './DetailSelect.css'
import { useEffect } from 'react';
import {Badge, Button,Carousel,Container} from 'react-bootstrap'
import img1 from "../../assets/test1.jpg"
import img2 from "../../assets/test2.jpg"
import img3 from "../../assets/test3.jpg"

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


    //서브이미지 클릭 효과
    const handleImageClick = (slideNumber) => {
        const selector = `button[aria-label="Slide ${slideNumber}"]`;
        const targetBtn = document.querySelector(selector);
        if (targetBtn) {
        targetBtn.click(); // 버튼 강제 클릭
        }
    };
    

    return(
        <div className="container">

            <div className='top'>
                {/* 슬라이더 */}

                <div className='carousel'>
                    <Carousel interval={null}>
                    <Carousel.Item>
                        <img
                        style={{borderRadius:10}}
                        className="d-block w-100"
                        src={img1}
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h5>First slide label</h5>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={img2}
                        alt="Second slide"
                        />
                        <Carousel.Caption>
                        <h5>Second slide label</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={img3}
                        alt="Third slide"
                        />
                        <Carousel.Caption>
                        <h5>Third slide label</h5>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                    </Carousel.Item>
                    </Carousel>

                  
                </div>

                  {/* 캐러셀 아래에 들어갈 서브 이미지 */}
                    <div className='subimg'>
                        <img src={img1} onClick={()=>handleImageClick(1)}/>
                        <img src={img2} onClick={()=>handleImageClick(2)}/>
                        <img src={img3} onClick={()=>handleImageClick(3)}/>
                    </div>
            
            </div>{/* end top */}   

            <div className='bottom'>
                {/* 가져온 정보로 상세 정보 표시 */}
                <h2>센터 정보</h2>
                <div className='info-box'>
                    <div className='info'>
                        <h3><Badge pill bg="info">갱신 일자</Badge></h3>
                        <p>{data.updTm}</p>
                    </div>

                    <div className='info'>
                        <h3><Badge pill bg="info">유기 번호</Badge></h3>
                        <p>{data.desertionNo}</p>
                    </div>

                    <div className='info'>
                        <h3><Badge pill bg="info">공고 번호</Badge></h3>
                        <p>{data.noticeNo}</p>
                    </div>

                    <div className='info'>
                        <h3><Badge pill bg="info">공고 날짜</Badge></h3>
                        <p>{data.noticeSdt}~{data.noticeEdt}</p>
                    </div>

                    <div className='info'>
                        <h3><Badge pill bg="info">보호센터이름</Badge></h3>
                        <p>{data.careNm}</p>
                    </div>

                    <div className='info'>
                        <h3><Badge pill bg="info">보호센터전화번호</Badge></h3>
                        <p>{data.careTel}</p>
                    </div>


                    <div className='info'>
                        <h3><Badge pill bg="info">보호자닉네임</Badge></h3>
                        <p>{data.careOwnerNm}</p>
                    </div>

                    <div className='info'>
                        <h3><Badge pill bg="info">보호번호</Badge></h3>
                        <p>{data.careRegNo}</p>
                    </div>

                    <div className='info'>
                        <h3><Badge pill bg="info">발견일자</Badge></h3>
                        <p>{data.happenDt}</p>
                    </div>

                    <div className='info'>
                        <h3><Badge pill bg="info">발견장소</Badge></h3>
                        <p>{data.happenPlace}</p>
                    </div>

                    <div className='info'>
                        <h3><Badge pill bg="info">센터 주소</Badge></h3>
                        <p>{data.careAddr}</p>
                    </div>

                    
                </div>



                {/* 가져온 정보로 상세 정보 표시 */}
                <h2>동물정보</h2>
                <div className='info-box'>
                    <div className='info'>
                        <h3><Badge pill bg="info">종류</Badge></h3>
                        <p>{data.upKindNm}({data.upKindCd})</p>
                    </div>

                    <div className='info'>
                        <h3><Badge pill bg="info">품종</Badge></h3>
                        <p>{data.kindNm}({data.kindCd})</p>
                    </div>

                    <div className='info'>
                        <h3><Badge pill bg="info">털색</Badge></h3>
                        <p>{data.colorCd}</p>
                    </div>

                    <div className='info'>
                        <h3><Badge pill bg="info">나이</Badge></h3>
                        <p>{data.age}</p>
                    </div>

                    <div className='info'>
                        <h3><Badge pill bg="info">몸무게</Badge></h3>
                        <p>{data.weight}</p>
                    </div>

                    <div className='info'>
                        <h3><Badge pill bg="info">성별</Badge></h3>
                        <p>{data.sexCd==='M'?'수컷':'암컷'}</p>
                    </div>

                    <div className='info'>
                        <h3><Badge pill bg="info">보호 상태</Badge></h3>
                        <p>{data.processState}</p>
                    </div>

                    <div className='info'>
                        <h3><Badge pill bg="info">특징</Badge></h3>
                        <p>{data.specialMark}</p>
                    </div>

                    
                </div>





                {/* 고객센터로 값과 함께 전달할 버튼 */}
                <div className='button'>
                    <Button style={{color:'white'}} onClick={()=>navigate('/customer/adoption')} variant="info">입양 문의</Button>
                </div>
            </div>{/* ent bottom */}
        </div>//end container
    )
}

