import defimg from '../../assets/default.jpg'
import './RequestWrite.css'
import { Input, selectClasses, TextField } from "@mui/material";
import { RequestComponent } from './RequestComponent'
import { useState } from "react";

export const RequestWrite = () => {

    const [image,setImage] = useState('');
    const [preview,setPreview] = useState(defimg);

    const [kind,setKind] = useState('');
    const [sex,setSex] = useState('');
    const [age,setAge] = useState('');
    const [name,setName] = useState('');

    const [time,setTime] = useState('');
    const [local,setLocal] = useState('');
    const [phone,setPhone] = useState('');
    const [descripsion,setDescripsion] = useState('');

    const handleImgChange = (e) => {
        const selectFile = e.target.files[0];
        //받은 이미지 저장
        setImage(selectFile);
        //받은 이미지로 프리뷰에 쓸 임시 URL 만들고 세팅.
        setPreview(URL.createObjectURL(selectFile));
    }

    return(
        <div className="RWcontainer">
            {/* 규격화된 신청서 작성하기 */}
            {/* 내용
                div 회색배경 사진아래 -> 견종/성별/나이/이름
                card 내용 -> 실종장소/ 실종 시간 / 특징 / 연락수단(연락처)
                ( 찾기 성공되면 모든 내용 못 알아보게
                    opacity 처리와 함께 그 위에 '완료' 글자 )
            */}
            <div className='RWtop'>
                
                {/* <ReactQuill
                    style={{
                    height: '200px',
                    marginBottom: '24px',
                    background: '#fff',
                    borderRadius: '8px'
                    }} 
                /> */}
                <div className="RWex">
                    <RequestComponent 
                        img={preview}
                        name={name}
                        time={time}
                        local={local}
                        descripsion={descripsion}
                        age={age}
                        kind={kind}
                        phone={phone}
                        sex={sex}
                    />
                </div>
            </div>



            <div>
                
                <div className="RWwrite">
                    <input type="file"
                        onChange={(e)=>{
                            handleImgChange(e)   
                        }}
                    />
                    
                    <div className="RWwrite">
                        <TextField className="RWinput" label="종류" 
                        value={kind}
                        placeholder="종류"
                        onChange={(e)=>{
                            setKind(e.target.value)
                        }}
                        variant="outlined" />
                        <TextField className="RWinput" label="성별" 
                        value={sex}
                        placeholder="성별"
                        onChange={(e)=>{
                            setSex(e.target.value)
                        }}
                        variant="outlined" />
                        <TextField className="RWinput" label="나이" 
                        value={age}
                        placeholder="나이"
                        onChange={(e)=>{
                            setAge(e.target.value)
                        }}
                        variant="outlined" />
                        <TextField className="RWinput" label="이름" 
                        value={name}
                        placeholder="이름"
                        onChange={(e)=>{
                            setName(e.target.value)
                        }}                    
                        variant="outlined" />


                        <TextField className="RWinput" label="실종 장소" 
                        value={local}
                        placeholder="실종 장소"
                        onChange={(e)=>{
                            setLocal(e.target.value)
                        }}
                        variant="outlined" />
                        <TextField className="RWinput" label="실종 시간" 
                        value={time}
                        placeholder="실종 시간"
                        onChange={(e)=>{
                            setTime(e.target.value)
                        }}
                        variant="outlined" />
                        <TextField className="RWinput" label="연락수단(연락처)" 
                        value={phone}
                        placeholder="연락처"
                        onChange={(e)=>{
                            setPhone(e.target.value)
                        }}
                        variant="outlined" />
                        <TextField className="RWinput" multiline rows={4} label="특징" 
                        value={descripsion}
                        placeholder="특징"
                        onChange={(e)=>{
                            setDescripsion(e.target.value)
                        }}
                        variant="outlined" />
                    </div>
                </div>
            </div>
        </div>
    )
}