import defimg from '../../assets/default.jpg'
import './RequestWrite.css'
import { Button, Card, CardActionArea, CardContent, CardMedia, Input, selectClasses, TextField, Typography } from "@mui/material";
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

    const handleSuccess =() => {

    }


    return(
        <div className="RWcontainer">
            {/* 규격화된 신청서 작성하기 */}
            <div className='RWtop'>
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
                    <Card sx={{ flex:'0 0 90%',height:'100%'}} raised={true} >
                        <CardActionArea
                            sx={{ display: 'flex',height:'100%'}} // 가로 정렬
                            onClick={handleOnClick}
                        >
                            <div style={{display:'flex', flexDirection:'column',width:'60%',height:'100%'}}>
                            {/* 카드 핵심 내용 */}
                                <CardMedia
                                component="img"
                                height="auto"
                                image={preview}
                                sx={{height:'100%'}}
                                />
                                <Typography
                                sx={{backgroundColor:'red', color:'white', textAlign:'center' }}
                                variant="h5" component="div" >
                                    {kind} / {sex} / {age} / {name}
                                </Typography>
                            </div>
                            {/* 카드 상세 내용 */}
                            <div style={{display:'flex', flexDirection:'column',width:'40%',height:'100%'}}>
                                <CardContent
                                    sx={{height:'100%'}}
                                >
                                    <Typography sx={{fontSize:'20px'}}
                                    gutterBottom variant="h5" component="div">
                                    실종 장소: {local}
                                    </Typography>
                                    <Typography sx={{fontSize:'20px'}}
                                    gutterBottom variant="h5" component="div">
                                    실종 시간: {time}
                                    </Typography>
                                    <Typography sx={{fontSize:'20px'}}
                                    gutterBottom variant="h5" component="div">
                                    연락수단: {phone}
                                    </Typography>
                                    <Typography sx={{fontSize:'20px', whiteSpace:'pre-line' }} 
                                    gutterBottom variant="h5" component="div">
                                    특징: {`${descripsion}`}
                                    </Typography>
                                </CardContent>
                            </div>
                        </CardActionArea>
                    </Card>
                </div>
            </div>{/* end top */}
            {/* 완료 버튼 */}
            <div style={{display:'flex',justifyContent:'flex-end'}}>
                <Button 
                    onClick={()=>{handleSuccess()}}
                    variant='contained'>
                    완료
                </Button>
            </div>
                


            <div>
                <div className="RWwrite">
                    <input className='RWimageinput'
                        type="file" 
                        style={{display:'none'}}
                        onChange={(e)=>{
                            handleImgChange(e)   
                        }}
                    />
                    
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
    )
}