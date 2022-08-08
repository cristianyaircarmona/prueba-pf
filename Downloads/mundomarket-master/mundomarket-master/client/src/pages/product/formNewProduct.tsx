import * as React from 'react';
import { TextField, Box, InputLabel, OutlinedInput, InputAdornment, MenuItem, Typography, Button, FormLabel, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import { POSTPRODUCT } from '../../actions/index';
import { useDispatch , useSelector } from "react-redux"
import { Link ,  useNavigate } from "react-router-dom"
import { AppDispatch } from '../../store';
import NavBar from '../../components/NavBar/NavBar'


const regex=/^[0-9]+$/


export default function FormP() {

    const [formData,SetFormData]=useState({})//almacena el formulario para luego ser enviado al servidor

    const[images,setImages]=useState(["http://inversionesumbrias.com.ve/static/images/productos/producto-sin-imagen.jpg"]);//array de strings de url de imagenes 

    const[upLoading,setUpLoading]=useState(false)

    

    const handleDelete=(e:any,image:string)=>{
      e.preventDefault()
      setImages(images.filter(element=>{//deja afuera el elemento que tenga la url a eliminar
        return element!==image;
      }))
    //eliminar el elemento que tenga la misma url 
    }
    
    const handleUpload= async (e:any)=>{
      
      const pic = e.target.files[0];
      console.log("valor buscado*",pic);
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
          setImages(images=>[...images,res.url]);
          console.log("respuesta",res)
          //setInput((input)=>({...input,imageProduct:[res.secure_url]}))
          setUpLoading(false);
        })
        .catch(error=>console.log(error));
    };





    const useAppDispatch = () => useDispatch<AppDispatch>()

    const dispatch = useAppDispatch()

    const navegar = useNavigate()

    const currencies = [
    {
      value: 'tecnologia',
      label: 'Tecnologia',
    },
    {
      value: 'ropa',
      label: 'Ropa',
    },
    {
      value: 'cuidado personal',
      label: 'Cuidado Personal',
    },
    {
      value: 'deporte',
      label: 'Deportes',
    },
  ];

  const [input,setInput]=useState({name:'',price:'',category:'Select',description:'',stock:1,imageProduct:[""],review:0,rating:0,envio:'coordinar'})

  const validate=(e:any)=>{
    //aca se hacen 2 cosas, se actualiza el valor actual de los inputs y se almacena su valor en formdata
    if(e.target.name==='title'){
      setInput((input)=>({...input,name:e.target.value}))
      e.target.id="name"
    }
    if(e.target.name==='precio'){
      if(regex.test(e.target.value))setInput((input)=>({...input,price:e.target.value}))
      e.target.id="price"
    }
    if(e.target.name==='stock'){
      setInput((input)=>({...input,stock:e.target.value}))
      e.target.id="stock"
    }
    if(e.target.name==='description'){
      setInput((input)=>({...input,description:e.target.value}))
      e.target.id="description"
    }
    if(e.target.name==='category'){
      setInput((input)=>({...input,category:e.target.value}))
      e.target.id="category"
    }
  
  //aqui se almacena el valor en formdata, el target.id es el nombre del campo y value es su valor obtenido del event  
    SetFormData({...formData,[e.target.id]:e.target.value})
  }

  function handleSubmit(e:any){
    e.preventDefault()
    /*if(!input.name){
        return alert("El Producto necesita un nombre")
    } else if(!input.){
        e.preventDefault()
       return alert("Necesitas agregar por lo menos 1 tipo al Pokemon")
    }
     */
/*
     if(images.length===1){
        //setInput((images)=>({...images,images:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9nzwwI9EeHkX1U4vQ5LRx2yefOZ-WhOD_tQ&usqp=CAU"]}))
        setImages(images=>[...images,"http://inversionesumbrias.com.ve/static/images/productos/producto-sin-imagen.jpg"]);
        //setImages(["http://inversionesumbrias.com.ve/static/images/productos/producto-sin-imagen.jpg"]);
    
      }
        //console.log("ver imagenes",images);
*/
        //const newPost=input
        if(images.length>1)images.shift() //elimino el primer valor, que es la foto por defecto
      
        
        const newPost={...formData,imageProduct:images} // se prepara un objeto con los campos del fomrulario y sus imagenes
        dispatch(POSTPRODUCT(newPost))

        alert("Se creo el Producto exitosamente!")

        navegar("/home")//se accede al home
        window.location.reload();//se refresca para activar el dispatch de GETPRODUCTS()
        
}


  return (

<div>
    <NavBar/>

    <Box display='flex' justifyContent='center'>
      <div id='formnuevo'>

        <Typography mt={10}>PUBLICAR ARTICULO</Typography>

          <Box
            display='flex' 
            flexDirection='column'
            margin='auto'
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '50ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="formtitle" label="Nombre" variant="outlined" name='title' value={input.name}
            onChange={(e)=>validate(e)}/>

            <TextField id="formprecio" label="Precio" variant="outlined" 
                InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                name='precio' value={input.price}
                onChange={(e)=>validate(e)}
            />
            
            
            
            <label>Cantidad:</label>
            <input id="productStock" name='stock' value={input.stock}
                onChange={(e)=>validate(e)}
              min="1" max="100" type="number"/>


            <TextField
              id="formcats"
              select
              label="Categorias"
              value={input.category}
              onChange={(e)=>validate(e)}
              name='category'
            >
              <MenuItem key='select' value='Select'>
                  Select
                </MenuItem>
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField id="formdesc" label="Descripcion" variant="outlined" name='description' value={input.description}
            onChange={(e)=>validate(e)}/>
            
            
            {<input aria-label="Archivo" type="file" name="imagen" onChange={handleUpload} />}

              <Box display='flex' flexDirection='row' justifyContent='center'  >
                
                {images[1]?images.map(image=> {
                  return image!=="http://inversionesumbrias.com.ve/static/images/productos/producto-sin-imagen.jpg"?
                  <Box sx={{ paddingX: 2 }}>
                    <img src={image} alt="" width="250px" height ="150px" />
                    <button onClick={(e)=>{handleDelete(e,image)}}>X</button>
                  </Box>
                  :<></>
                }
              ):<></>}
              </Box>
              {upLoading && <p>Subiendo Foto...</p> }

             <div>
            <button disabled={input.name===""||input.category==="Select"?true:false||input.description===""||input.price===""}  type="submit" onClick={(e) => handleSubmit(e)}>Crear Pubicación</button>
            </div>   

          </Box>



        </div>
    </Box>
    </div>
      
  );

}
