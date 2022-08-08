import { Box, Grid, Typography, TextField, Button } from '@mui/material';
import { AuthLayout } from '../../components/layouts';
import {Link} from 'react-router-dom'
import {useDispatch} from "react-redux"
import {REGISTERUSER} from "../../actions/index"
import {useEffect, useState} from "react"
import { AppDispatch,RootState } from '../../store/index';
import { useNavigate } from 'react-router-dom';


const useAppDispatch = () => useDispatch<AppDispatch>();


const RegisterPage = () => {
    const nav=useNavigate()
    const[disabled,setDisabled]=useState(true)
    const [input,setInput]=useState({
        email:"",
        password:"",
        name:"",
        adress:"",
        city:"",
        country:"",
        phone:"",
        avatar:'',
        cuil:""
    })
    const[images,setImages]=useState('');//array de strings de url de imagenes 

    const[upLoading,setUpLoading]=useState(false)

    const [error,setError]=useState({
        email:false,
        password:false,
        name:false,
        adress:false,
        city:false,
        country:false,
        phone:false,
        avatar:false,
        cuil:false
    })

    const handleDelete=(e:any)=>{
        e.preventDefault()
        setImages('')
        setInput((input)=>({...input,avatar:''}))
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
            setInput((input)=>({...input,avatar:res.url}))
            setUpLoading(false);
          })
          .catch(error=>console.log(error));
      };

    const dispatch=useAppDispatch()

    const handleSubmit=(e:any)=>{
        e.preventDefault()
        dispatch(REGISTERUSER(input))
        nav('/')
    }
    const handleChange=(e:any)=>{
        e.preventDefault();
        setError(()=>({
            email:false,
            password:false,
            name:false,
            adress:false,
            city:false,
            country:false,
            phone:false,
            avatar:false,
            cuil:false
        }))
        const rgmail=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        const rgpassword=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        const rgdirec=/^[A-Za-z0-9\s]+$/g
        const rgphone=/^([0-9])*$/
        

        setInput((prev) => ({...prev, [e.target.name]:e.target.value}))
        input.adress && input.phone && input.email && input.city && input.country && input.password?setDisabled(()=>false):setDisabled(()=>true)
        if(e.target.name==='email'){
            if(!rgmail.test(e.target.value)){
                setError((old)=>({...old,email:true}))
                setDisabled(()=>true)
            }
        }
        if(e.target.name==='password'){
            if(!rgpassword.test(e.target.value)){
                setError((old)=>({...old,password:true}))
                setDisabled(()=>true)
            }
        }
        if(e.target.name==='adress'){
            if(!rgdirec.test(e.target.value)){
                setError((old)=>({...old,adress:true}))
                setDisabled(()=>true)
            }
        }
        if(e.target.name==='phone'){
            if(!rgphone.test(e.target.value)){
                setError((old)=>({...old,phone:true}))
                setDisabled(()=>true)
            }
        }
        if(e.target.name==='cuil'){
            if(!rgphone.test(e.target.value)){
                setError((old)=>({...old,cuil:true}))
                setDisabled(()=>true)
            }
        }

    }
    return(
        <Box sx={{display:'flex',justifyContent:'center'}} >
            <Box sx={{width:350, padding:'10px 20px'}} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h3'>Crear Cuenta</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField name='name' label='Nombre y Apellido' value={input.name} onChange={(e)=>handleChange(e)} variant="filled" fullWidth></TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField error={error.email} name='email' label='Correo' value={input.email} onChange={(e)=>handleChange(e)} variant="filled" fullWidth></TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField error={error.password} name='password' label='Contraseña' value={input.password} onChange={(e)=>handleChange(e)} type='password' variant="filled" fullWidth></TextField>
                        {error.password && <Typography sx={{color:"red",fontSize:12}}>Debe contener al menos 8 caracteres</Typography>}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField error={error.adress} name='adress' label='Dirección' value={input.adress} onChange={(e)=>handleChange(e)} variant="filled" fullWidth></TextField>
                        {error.adress && <Typography sx={{color:"red",fontSize:12}}>Debe ser una dirección</Typography>}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField error={error.city} name='city' label='Ciudad' value={input.city} onChange={(e)=>handleChange(e)} variant="filled" fullWidth></TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField error={error.country} name='country' label='Pais' value={input.country} onChange={(e)=>handleChange(e)} variant="filled" fullWidth></TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField error={error.phone} name='phone' label='Teléfono' value={input.phone} onChange={(e)=>handleChange(e)} variant="filled" fullWidth></TextField>
                        {error.phone && <Typography sx={{color:"red",fontSize:12}}>Debe ser un numero de telefono</Typography>}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField error={error.cuil} name='cuil' label='CUIL' value={input.cuil} onChange={(e)=>handleChange(e)} variant="filled" fullWidth></TextField>
                        {error.cuil && <Typography sx={{color:"red",fontSize:12}}>Debe ser un numero de CUIL</Typography>}
                    </Grid>

                    <Box sx={{m:2,display:'flex',flexDirection:'column'}}>
                        <Typography>Foto de perfil</Typography>
                    {<input aria-label="Archivo" type="file" name="imagen" onChange={handleUpload}/>}
                    </Box>

                    <Box display='flex' flexDirection='row' justifyContent='center'  >
                        
                        {images?(
                        <Box sx={{ paddingX: 2 }}>
                            <img src={images} alt="" width="250px" height ="150px" />
                            <button onClick={(e)=>{handleDelete(e)}}>X</button>
                        </Box>)
                        :<></>}
                    </Box>
                    {upLoading && <p>Subiendo Foto...</p> }

                    <Grid xs={12} sx={{mt:3}} >
                        <Button onClick={(e)=>handleSubmit(e)} color = "secondary" className='circular-btn' size='large' fullWidth disabled={disabled}>
                            Crear
                        </Button>
                    </Grid>

                    <Grid item xs={12} display='flex' justifyContent='end'>
                        
                            <Link to='/login'>
                                ¿ya tenes una cuenta?
                            </Link>
                  
                    </Grid>

                    

                </Grid>
                
            </Box>

        </Box>
    )
}

export default RegisterPage