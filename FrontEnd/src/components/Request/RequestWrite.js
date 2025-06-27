import DatePicker from 'react-datepicker';
import defimg from '../../assets/default.jpg'
import './RequestWrite.css'
import { Button, Switch} from "@mui/material";
import { forwardRef, useState } from "react";
import { useAlert } from '../Customers/Context/AlertContext';

export const RequestWrite = () => {

    const [image,setImage] = useState('');
    const [preview,setPreview] = useState(defimg);

    const [kind,setKind] = useState('');
    const [sex,setSex] = useState('');
    const [age,setAge] = useState('');
    const [name,setName] = useState('');

    const [selectedDate,setSelectedDate] = useState('');
    const [local,setLocal] = useState('');
    const [phone,setPhone] = useState('');
    const [descripsion,setDescripsion] = useState('');

    const { showAlert } = useAlert();

    //이미지 등록
    const handleImgChange = (e) => {
        try {
            const selectFile = e.target.files[0];
            //받은 이미지 저장
            setImage(selectFile);
            //받은 이미지로 프리뷰에 쓸 임시 URL 만들고 세팅.
            setPreview(URL.createObjectURL(selectFile));    
        } catch (error) {
            
        }
    }

    // 간접 클릭
    const handleOnClick = () => {
        document.querySelector('.RWimageinput').click();
    }

    // 완료 눌렀을 시 동작
    const handleSuccess = async () => {
        const result = await showAlert({
            title:'작성하시겠습니까?',
            showCancelButton : true,
            confirmButtonText: '네',
            cancelButtonText:'아니요',
        })

        if(result.isConfirmed){
            const data = {
                find : false,

                name : '',
                kind : '',
                user_no : '',
                sex : '',              // 
                detail:'',             // 특징
                age:'',                // 나이
                lostLocation: '',      // 실종 장소
                lostTime: '',          // 실종 시간  
                contactNumber: '',     // 연락수단
                characteristics: ''    // 특징
            }

            const option = {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body : JSON.stringify(data)
            }

            const response = fetch('http://www.localhost:8888/request',option)

        }
    }

      const [profileData, setProfileData] = useState({
        lostLocation: '',      // 실종 장소
        lostTime: '',          // 실종 시간  
        contactNumber: '',     // 연락수단
        characteristics: ''    // 특징
      });
    
      // 입력 필드 값 변경 핸들러
      // 이벤트 객체에서 name과 value를 구조분해할당으로 추출하여 해당 필드만 업데이트합니다
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProfileData(prevData => ({
          ...prevData,
          [name]: value
        }));
      };

        //공고날짜 커스텀 버튼
        const CustomButton = forwardRef(({ value, onClick }, ref) => (
            <Button variant="outlined" onClick={onClick} ref={ref} sx={{width:'400px'}}>
                {selectedDate===""?"날짜 선택":value+' ~'}
            </Button>
        ));


    return(
        <div className="RWmaincontainer">
            {/* 규격화된 신청서 작성하기 */}
            <div className='RWtop'>
                 {/* <RequestCardComponent/> */}
                <div className="RWex"
                    onDrop={(e)=>{
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        setImage(file)
                        setPreview(URL.createObjectURL(file))
                    }}
                    onDragOver={(e)=>{
                        e.preventDefault()
                    }}
                >
                    <div className="RWcontainer">
                            {/* 메인 카드 컴포넌트 */}
                            <div className="RWcard">
                                
                                {/* 카드 내부 콘텐츠 영역 */}
                                <div className="RWcardContent">

                                {/* 좌측 프로필 이미지 섹션 */}
                                <div className="RWleftSection">
                                    
                                    <img style={{height:'400px',borderRadius: '10px'}} src={preview} />

                                </div>


                                
                                {/* 우측 정보 입력 섹션 */}


                                <div className='RWbottom'>
                                {/* 빨간색 바 */}
                                <div className="RWbottomBar">
                                    <span className="RWbottomBarText">
                                        🐾<input
                                            placeholder='종류'
                                            value={kind}
                                            onChange={(e)=>{setKind(e.target.value)}}
                                            className='RWinput_main'
                                        />
                                        | 🧸
                                        {/* <input
                                            placeholder='성별'
                                            value={sex}
                                            onChange={(e)=>{setSex(e.target.value)}}
                                            className='RWinput_main'
                                        /> */}<small>수컷</small>
                                        <Switch defaultChecked color="default" /><small>암컷</small>
                                        | 🕒
                                        <input
                                            placeholder='나이'
                                            value={age}
                                            onChange={(e)=>{setAge(e.target.value)}}
                                            className='RWinput_main'
                                        />
                                        | 🏷️
                                        <input
                                            placeholder='이름'
                                            value={name}
                                            onChange={(e)=>{setName(e.target.value)}}
                                            className='RWinput_main'
                                        />
                                        </span>
                                </div>

                                {/* 작성내용 */}
                                <div className="RWrightSection">
                                    {/* 각 입력 필드를 개별 그룹으로 구성 */}
                                    <div className="RWinputRow">
                                    <label className="RWlabel">실종 장소:</label>
                                    <input
                                        type="text"
                                        name="lostLocation"
                                        value={profileData.lostLocation}
                                        onChange={handleInputChange}
                                        className="RWinput"
                                        placeholder="실종된 장소를 입력하세요"
                                    />
                                    </div>

                                    <div className="RWinputRow">
                                    <label className="RWlabel">실종 시간:</label>
                                    {/* 달력 */}
                                    <DatePicker
                                        showIcon
                                        closeOnScroll={true}
                                        selected={selectedDate}
                                        dateFormat="YYYY/MM/dd"
                                        className='RWinput'
                                        customInput={
                                        <CustomButton
                                            variant="contained"
                                        >{selectedDate}</CustomButton>
                                        }
                                        onChange={(date)=>setSelectedDate(date)}
                                    />


                                    </div>

                                    <div className="RWinputRow">
                                    <label className="RWlabel">연락수단:</label>
                                    <input
                                        type="tel"
                                        name="contactNumber"
                                        value={profileData.contactNumber}
                                        onChange={handleInputChange}
                                        className="RWinput"
                                        placeholder="연락 가능한 전화번호"
                                    />
                                    </div>

                                    <div className="RWinputRow">
                                    <label className="RWlabel">특징:</label>
                                    <textarea
                                        name="characteristics"
                                        value={profileData.characteristics}
                                        onChange={handleInputChange}
                                        className="RWtextarea"
                                        placeholder="외모나 특이사항을 입력하세요"
                                        rows={3}
                                    />
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
               </div>{/* end ex */}
                    <Button 
                        variant="contained"
                        className="DBButton"
                        color="primary"
                        sx={{marginLeft:'auto', marginTop:'20px'}}
                        onClick={()=>{
                            handleSuccess();
                        }}>완료
                    </Button>
            </div>{/* end top */}
        </div>//end container
        )
}
