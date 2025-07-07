import { useNavigate } from 'react-router-dom';
import defimg from '../../assets/default.jpg';
import { Card, CardContent, CardMedia, Typography, Button, TextField, MenuItem, Dialog, DialogTitle, ListItemButton, ListItem } from '@mui/material';
import { useState } from 'react';
import { useAlert } from '../Customers/Context/AlertContext';
import { animal } from "../DetailPage/DetailBodyData.js";
import Swal from 'sweetalert2';

// const API_BASE_URL = "http://localhost:8888";
const API_BASE_URL = "http://192.168.3.24:8888";

export const RequestComponent = ({
  img = `${defimg}`, kind='', sex = '성별', age = '나이',
  name = '이름', local = '지역', time = '시간', phone,
  detail = '특징', url = '', row = false, no,list,selectedBreed
}) => {

  // 유저 정보
  const loginData = JSON.parse(localStorage.getItem("user"));
  const isAdmin = loginData?.userId?.includes("admin") ? true : false;
  const currentUser = loginData?.nickname;

  // 사진 예시로 보여주기.
  const [preview,setPreview] = useState(img);
  // 사진 세팅
  const [newImg,setNewImg] = useState('')

  const theme={
    '& .MuiFilledInput-root': {
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: '8px',
      overflow: 'hidden',
      width:'98%'
    },
    '& .MuiFilledInput-root:hover': {
      backgroundColor: '#f5f5f5',
    },
    '& .MuiFilledInput-root.Mui-focused': {
      backgroundColor: '#fff',
    }, 
    '& .MuiFilledInput-root::before': {
      borderBottom: 'none',
    },
  }

  const navigate = useNavigate();
  // 고객센터에 만들어진 alert 가져오기
  const { showAlert } = useAlert();
  // 수정모드 상태관리
  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({
    kind, sex, age, name, local, time, phone, detail, no,selectedBreed,img
  });

  const [open,setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedValues(prev => ({
      ...prev,
      [name]: name === 'sex' ? (value === 'true') : value  // sex는 boolean 처리
    }));
  };

  // 수정모드 시작
  const handleUpdate = () => {
    
    if(currentUser===undefined){
      Swal.fire("로그인 필요","로그인 후 이용해주세요.","error")
      return
    }

    if(!isAdmin&&loginData.seq!==list.user_no){
      Swal.fire("수정 실패","작성자만 수정 할 수 있습니다.","error")
      return
    }
    
    setEditedValues(prev=>({...prev,no:no,img:list.img,selectedBreed:list.selectedbreed}))
    setIsEditing(true)
    
  };

  //이미지 등록
    const handleImgChange = (e) => {
        try {
            const file = e.target.files[0];
            if(!file) return;

            setNewImg(file)
            // console.log(file)
            //받은 이미지 저장 (유저아이디+파일명으로 파일 이름 저장.)
            // setFormData(prev=>({...prev,image:localStorage.getItem('userId')+file.name}))
            //받은 이미지로 프리뷰에 쓸 임시 URL 만들고 세팅.
            setPreview(URL.createObjectURL(file));    
        } catch (error) {
            console.error('이미지 변경 중 오류:', error);
        }
    }
    // 간접 클릭
    const handleOnClick = () => {
        document.querySelector('.RWimageinput').click();
    }

  // [PUT]
  const handleSave = async() => {

    // 이미지 파일 백엔드에 저장 후 접근 URL받기
    const imageForm = new FormData();
    imageForm.append("file",newImg);
    imageForm.append("userId",JSON.parse(localStorage.getItem('user')).userId)
    // console.log("img",newImg)
    let imageUrl = null;

    try {
        const uploadImg = await fetch(`${API_BASE_URL}/request/image`,{
        method:"POST",
        body:imageForm
        })
        const result = await uploadImg.json();            
        imageUrl= result.imageUrl;
        } catch (error) {
            console.log(error)                    
    }

    
    setIsEditing(false);

    const newData = {...editedValues,kind:editedValues.kind==='etc'?'기타':editedValues.kind==='cat'?'고양이':'강아지',img:imageUrl}
    setEditedValues(newData)
    console.log("imageUrl",imageUrl)
    console.log('수정된 값:', editedValues);
    // 여기서 서버 저장
    try {
      const result = await fetch(`${API_BASE_URL}/request`,{
          method:'PUT',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify(editedValues)
        })
        await showAlert({title:'수정이 완료 되었습니다.'})
        // 새로고침
        navigate(0)
    } catch (error) {
      console.log("수정하기 연결 실패",error)
    }
  };

  //[Delete]
  const handleDelete = async() => {
    if(currentUser===undefined){
      Swal.fire("로그인 필요","로그인 후 이용해주세요.","error")
      return
    }

    if(!isAdmin&&loginData.seq!==list.user_no){
      Swal.fire("삭제 실패","작성자만 삭제 할 수 있습니다.","error")
      return
    }

    try {
      const result = await showAlert({
          title:'정말 삭제하시겠습니까?',
          showCancelButton : true,
          confirmButtonText: '네',
          cancelButtonText:'아니요',
          icon: 'warning'
      })

      // '네' 버튼 눌렀을 시
      if(result.isConfirmed){
        const result =  await fetch(`${API_BASE_URL}/request/${list.no}`,{
          method:'DELETE'
        })
        await showAlert({title:'삭제가 완료 되었습니다.'})
        // 새로고침
        navigate(0);
      }  
    } catch (error) {
      console.log("삭제 실패")
    } 
  }

  return (
    <Card sx={{ flex: '0 0 90%', display: 'flex', flexDirection: 'row' }} raised={true}>
      <div>
        <CardMedia
          component="img"
          height="auto"
          image={preview}
          onClick={isEditing?()=>{handleOnClick()}:()=>{}}
          sx={{ width: 360, height: 360, objectFit: 'cover' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column'}}>
        {/* 상단 바 */}
        {isEditing ? (
          <div style={{ display: 'flex', gap: '10px',  color: 'white', padding: '10px 15px',width:'92%'}}>
            {/* <TextField sx={theme} variant='filled' label="종류" name="kind" value={editedValues.kind} onChange={handleChange} size="small" /> */}

            {/* 안보이는 input버튼 */}  
            <input className='RWimageinput' type='file' onChange={handleImgChange}/>
            {/* 품종 선택 상자 */}
            <span style={{display:'flex',flexDirection:'row'}}>

              {/* <select value={editedValues.kind} onChange={(e)=>{setEditedValues(prev=>({...prev,kind:e.target.value}))}}>
                  <option value="" disabled selected hidden>종류</option>
                  <option value="dog">강아지</option>
                  <option value="cat" >고양이</option>
              </select> */}

            
            <TextField
              variant='filled'
              select
              label="종류"
              name="kind"
              value={editedValues.kind==='etc'?'기타':editedValues.kind==='고양이'?'cat':'dog'}
              onChange={handleChange}
              size="small"
              sx={{minWidth: 100,marginRight:'10px','& .MuiFilledInput-root': {
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  
                },
                '& .MuiFilledInput-root:hover': {
                  backgroundColor: '#f5f5f5',
                },
                  '& .MuiFilledInput-root::before': {
                    borderBottom: 'none',
                  },
                '& .MuiFilledInput-root.Mui-focused': {
                  backgroundColor: '#fff',
                },  }}
            >
              <MenuItem  value={'dog'}>강아지</MenuItem>
              <MenuItem  value={'cat'}>고양이</MenuItem>
            </TextField>


              <Button variant="contained"
                sx={{minWidth:'80px'}}
               onClick={editedValues.kind===''?(()=>{}):()=>setOpen(true)}
              >
                  {editedValues.selectedBreed}
              </Button>
          
              <Dialog
                  onClose={()=>{setOpen(!open)}}
                  open={open}
              >
                  <DialogTitle
                      sx={{background:'#cceeff'}}
                  >품종을 선택하세요</DialogTitle>
                      {animal[editedValues.kind === 'cat' ? 'cat' : 'dog'].map((animal, index) => (
                          <ListItemButton key={index} 
                          onClick={()=>{
                              setEditedValues(prev=>({...prev,selectedBreed:Object.keys(animal)[0]}))
                              // setSeletedBreed(Object.keys(animal)[0])
                              setOpen(false);
                          }}>
                              <ListItem disablePadding sx={{border:'1px solid #cceeff'}}>
                                  {<img className="DBdialogimg" src={`/img/${editedValues.kind}_picture/${Object.values(animal)[0]}.jpg`} alt="고양이 이미지" />}
                                  {Object.keys(animal)[0]}
                              </ListItem>
                      </ListItemButton>
                      ))}               
              </Dialog>
          </span>

            <TextField
              variant='filled'
              select
              label="성별"
              name="sex"
              value={editedValues.sex}
              onChange={handleChange}
              size="small"
              sx={{minWidth: 80,'& .MuiFilledInput-root': {
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  
                },
                '& .MuiFilledInput-root:hover': {
                  backgroundColor: '#f5f5f5',
                },
                  '& .MuiFilledInput-root::before': {
                    borderBottom: 'none',
                  },
                '& .MuiFilledInput-root.Mui-focused': {
                  backgroundColor: '#fff',
                },  }}
            >
              <MenuItem  value={true}>수컷</MenuItem>
              <MenuItem  value={false}>암컷</MenuItem>
            </TextField>
            <TextField sx={{
              '& .MuiFilledInput-root': {
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '8px',
                overflow: 'hidden',
                width:'130px'
              },
              '& .MuiFilledInput-root:hover': {
                backgroundColor: '#f5f5f5',
              },
              '& .MuiFilledInput-root.Mui-focused': {
                backgroundColor: '#fff',
              }, 
              '& .MuiFilledInput-root::before': {
                borderBottom: 'none',
              },
            }} 
            variant='filled' label="나이" name="age" value={editedValues.age} onChange={handleChange} size="small" />
            <TextField sx={{
              '& .MuiFilledInput-root': {
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '8px',
                overflow: 'hidden',
                width:'130px'
              },
              '& .MuiFilledInput-root:hover': {
                backgroundColor: '#f5f5f5',
              },
              '& .MuiFilledInput-root.Mui-focused': {
                backgroundColor: '#fff',
              }, 
              '& .MuiFilledInput-root::before': {
                borderBottom: 'none',
              },
            }}  
            variant='filled' label="이름" name="name" value={editedValues.name} onChange={handleChange} size="small" />
          </div>
        ) : (
          <Typography
            sx={{ backgroundColor: '#ff6666', color: 'white', textAlign: 'center',padding: '10px 20px' }}
            variant="h5"
            component="div"
          >
            🐾[{editedValues.kind}] {editedValues.selectedBreed} | 🧸{editedValues.sex === true ? '수컷' : '암컷'} | 🕒{editedValues.age} | 🏷️{editedValues.name}
          </Typography>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '700px'}}>
          <CardContent
            sx={{ width: '92%', display: 'flex', flexDirection: 'column', justifyContent: 'center', height:'250px',}}
          >
            {isEditing ? (
              <>
                <TextField sx={theme} variant='filled' label="실종 장소" name="local" value={editedValues.local} onChange={handleChange} />
                <TextField sx={theme} variant='filled' label="실종 시간" name="time" value={editedValues.time} onChange={handleChange} />
                <TextField sx={theme} variant='filled' label="연락수단" name="phone" value={editedValues.phone} onChange={handleChange} />
                <TextField
                  sx={theme}
                  variant='filled'
                  label="특징"
                  name="detail"
                  value={editedValues.detail}
                  onChange={handleChange}
                  multiline
                />
              </>
            ) : (
              <div>
                <Typography sx={{ fontSize: '20px' }} gutterBottom variant="h5" component="div">
                  <b>실종 장소</b>: {editedValues.local}
                </Typography>
                <Typography sx={{ fontSize: '20px' }} gutterBottom variant="h5" component="div">
                  <b>실종 시간</b>: {editedValues.time}
                </Typography>
                <Typography sx={{ fontSize: '20px' }} gutterBottom variant="h5" component="div">
                  <b>연락수단</b>: {editedValues.phone}
                </Typography>
                <Typography
                  sx={{ fontSize: '20px', whiteSpace: 'pre-line', height: '100px' }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  <b>특징</b>: {editedValues.detail}
                </Typography>
              </div>
            )}
            {/* 버튼 쪽 */}
            <div style={{ position:'relative', top:'10px',display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: '10px' }}>
              {isEditing ? (<>
                <Button variant="contained" color="success" onClick={handleSave}>저장</Button>
                <Button variant="contained" color="error" onClick={()=>{setIsEditing(false)}}>취소</Button></>
              ) : (
                <Button variant="outlined" color="primary" onClick={handleUpdate}>수정</Button>
              )}
              <Button sx={{ marginRight: '20px' }} variant="outlined" color="primary" onClick={handleDelete}>
                삭제
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
    )
}