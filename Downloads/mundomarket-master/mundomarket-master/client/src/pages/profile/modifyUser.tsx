import React from "react";
import {useState} from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Box,Typography,Avatar,Divider,IconButton,TextField, Input } from "@mui/material";
import {useSelector,useDispatch} from 'react-redux'
import {RootState,AppDispatch} from '../../store'
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import {MODIFYUSER} from '../../actions'


const ModifyUser=()=>{
    const useAppDispatch = () => useDispatch<AppDispatch>();
    const dispatch=useAppDispatch()
    const user=useSelector((state:RootState)=>state.rootReducer.user)
    const [field,setField]=useState({
        _id:user._id,
        avatar:user.avatar,
        name:user.name,
        email: user.email,
        adress:user.adress,
        city:user.city,
        country:user.country,
        phone:user.phone,
        cuil:user.cuil
    })
    const [editable,setEditable]=useState({
        avatar:false,
        name:false,
        email: false,
        password: false,
        adress:false,
        city:false,
        country:false,
        phone:false,
        cuil:false
    })
    const[images,setImages]=useState('');//array de strings de url de imagenes 
    const[upLoading,setUpLoading]=useState(false)

    const handleChange=(campo:string)=>{
        console.log("campo",campo)
        setEditable((old)=>({...old,[campo]:true}))
    }
    const handleSave=(campo:string)=>{
        console.log("guardado",[campo], "campo", campo)
        setEditable((old)=>({...old,[campo]:false}))
    }
    const Edit=(e:any)=>{
        setField((old)=>({...old,[e.target.name]:e.target.value}))
    }

    const handleDelete=(e:any)=>{
        e.preventDefault()
        setImages('')
        setField((input)=>({...input,avatar:''}))
      //eliminar el elemento que tenga la misma url 
      }
      
      const handleUpload= async (e:any)=>{
        
        const pic = e.target.files[0];
        if (pic===undefined)  return  0
        setUpLoading(true);
        const formData=new FormData();
        formData.append('file',pic);
        formData.append('upload_preset','images');
        
         await fetch('https://api.cloudinary.com/v1_1/dnlooxokf/upload',{
          method: 'POST',
          body: formData,
        })
          .then((res)=>res.json())
          .then((res)=> {
            setImages(()=>res.url);
            setField((input)=>({...input,avatar:res.url}))
            setUpLoading(false);
          })
          .catch(error=>console.log(error));
      };

    return(
        <>
        <NavBar/>
        <Box sx={{marginY:10,marginX:{xs:2,sm:'auto'},bgcolor:'white',boxShadow:2,display:'flex',justifyContent:'space-around',flexDirection:{xs:'column',sm:'row'},borderRadius:3,alignItems:'center',maxWidth:700}}>
            <Box sx={{display:'flex',justifyContent:'center',width:200,height:300,flexDirection:'column'}}>
                <Avatar src={user.avatar} alt={user.name} sx={{width:200,height:200}}/>

                <Box>
                {<Input aria-label="Archivo" type="file" name="imagen" onChange={handleUpload}/>}
                {upLoading && <p>Subiendo Foto...</p> }
                </Box>
            </Box>

            <Box sx={{display:'flex',flexDirection:'column'}}>
                <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Typography sx={{fontSize:'3vh',m:2}}>Nombre: {editable.name?
                    <TextField name='name' variant='standard' size='small' placeholder={field.name} onChange={(e)=>Edit(e)}/>
                    :field.name}
                    </Typography>
                    <IconButton onClick={(e)=>{editable.name?handleSave('name'):handleChange('name')}}>
                        {editable.name?<CheckIcon/>:<EditIcon/>}
                    </IconButton>
                </Box>

                <Divider/>

                <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Typography sx={{fontSize:'3vh',m:2}}>Correo: {editable.email?
                    <TextField name='email' variant='standard' size='small' placeholder={field.email} onChange={(e)=>Edit(e)}/>
                    :field.email}
                    </Typography>
                    <IconButton onClick={(e)=>{editable.email?handleSave('email'):handleChange('email')}}>
                        {editable.email?<CheckIcon/>:<EditIcon/>}
                    </IconButton>
                </Box>
                
                <Divider/>

                <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Typography sx={{fontSize:'3vh',m:2}}>Dirección: {editable.adress?
                    <TextField name='adress' variant='standard' size='small' placeholder={field.adress} onChange={(e)=>Edit(e)}/>
                    :field.adress}
                    </Typography>
                    <IconButton onClick={(e)=>{editable.adress?handleSave('adress'):handleChange('adress')}}>
                        {editable.adress?<CheckIcon/>:<EditIcon/>}
                    </IconButton>
                </Box>

                <Divider/>

                <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Typography sx={{fontSize:'3vh',m:2}}>Ciudad: {editable.city?
                    <TextField name='city' variant='standard' size='small' placeholder={field.city} onChange={(e)=>Edit(e)}/>
                    :field.city}
                    </Typography>
                    <IconButton onClick={(e)=>{editable.city?handleSave('city'):handleChange('city')}}>
                        {editable.city?<CheckIcon/>:<EditIcon/>}
                    </IconButton>
                </Box>

                <Divider/>

                <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Typography sx={{fontSize:'3vh',m:2}}>País: {editable.country?
                    <TextField name='country' variant='standard' size='small' placeholder={field.country} onChange={(e)=>Edit(e)}/>
                    :field.country}
                    </Typography>
                    <IconButton onClick={(e)=>{editable.country?handleSave('country'):handleChange('country')}}>
                        {editable.country?<CheckIcon/>:<EditIcon/>}
                    </IconButton>
                </Box>

                <Divider/>

                <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Typography sx={{fontSize:'3vh',m:2}}>Telefono: {editable.phone?
                    <TextField name='phone' variant='standard' size='small' placeholder={field.phone} onChange={(e)=>Edit(e)}/>
                    :field.phone}
                    </Typography>
                    <IconButton onClick={(e)=>{editable.phone?handleSave('phone'):handleChange('phone')}}>
                        {editable.phone?<CheckIcon/>:<EditIcon/>}
                    </IconButton>
                </Box>

                <Divider/>

                <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Typography sx={{fontSize:'3vh',m:2}}>CUIL: {editable.cuil?
                    <TextField name='cuil' variant='standard' size='small' placeholder={field.cuil} onChange={(e)=>Edit(e)}/>
                    :field.cuil}
                    </Typography>
                    <IconButton onClick={(e)=>{editable.cuil?handleSave('cuil'):handleChange('cuil')}}>
                        {editable.cuil?<CheckIcon/>:<EditIcon/>}
                    </IconButton>
                </Box>

                <IconButton onClick={()=>dispatch(MODIFYUSER(field))}>
                    <SaveIcon/>
                </IconButton>
            </Box>
        </Box>
        </>
    )
}

export default ModifyUser