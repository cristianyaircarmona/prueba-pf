import Link from "next/link";
import { useState } from "react";


let inicio:String[] = []
let otro:any[] = []

function FormDeportes() {
  const [input, setInput]= useState({
      title:"",
      description:"",
      images:otro,
      price:"",
      inStock:"",
      caterogiras:[]
  })

  const [image,setImage]= useState(inicio);
  const [loading,setLoading]= useState(false)
  

  const subirImagen= async (e:any) =>{
      
      const files= e.target.files;
      const data= new FormData();
      data.append("file",files[0]);
      data.append("upload_preset","wpcczfle");
      
      setLoading(true);
      const res = await fetch("https://api.cloudinary.com/v1_1/dlbvte7sp/image/upload",
                              {
                                method:"POST",
                                body:data,  
                              })
                  const file= await res.json();
                  let prueba:String[] = [];
                  prueba.push(file.secure_url);
                  setInput(prev=>{
                    return {
                        ...prev,
                        images: prueba
                    }
                    });
  } 


  const handleChange= (e:any)=>{
      const {value, name}= e.target
      setInput({
          ...input,
          [name]: value

      })
  }
  const handleSubmit= (e:any)=>{
      e.preventDefault();
      if(!input.title||
          !input.description||
          !input.caterogiras||
          !input.price||
          !input.inStock){
          alert("* parametro requerido")
      }else{postData(input)}
      
  }
  const postData= async(input:any)=>{
      try{
          console.log("esto es el input",input);
          console.log("esto es image",image);
          
          const res= await fetch("http://localhost:9000/products",{
              method:"POST",
              headers:{
                  "Content-type":"application/json"
              },
              body: JSON.stringify(input)
          })
          const data= await res.json()
          console.log(data,"data de deporte")

      } catch(error){
          console.log(error)
      }


  }
 
    


return (
  <div>
      <div>
          <h1>
              Bienvenidos a la seccion de Deportes
          </h1>
      </div>
      <form onSubmit={handleSubmit} >
      <div>
              <label > * Nombre</label>
              <input type="text" name='title' defaultValue={input.title} onChange={(e)=> handleChange(e)} ></input>
         </div>
         <div>
             <label> * Categoria </label>
             <select onChange={(e)=> handleChange(e)} name="caterogiras"  >
                 <option>Todas las categorias </option>
                 <option> Pelota </option>
                 <option> Raquetas </option>
                 <option> Redes</option>
                 <option> Guantes</option>
             </select>
         </div>
         <div>
             <label > Descripcion</label>
             <input type="text" name='description' defaultValue={input.description} onChange={(e)=> handleChange(e)} />
         </div>
         <div>
             <label> *Precio</label>
             <input type="text" name='price' defaultValue={input.price} onChange={(e)=> handleChange(e)} />
         </div>
         <div>
              <label>Stock</label>
              <input type="number" min="1" name='inStock' defaultValue={input.inStock} onChange={(e)=> handleChange(e)} />
         </div>
         <div>
             <label> imagen: </label>
             
             <input type="file" name='images' defaultValue={input.images}  onChange={(e)=>subirImagen(e)} />
         </div>
         <div>
             <button onClick={handleSubmit} > Crear</button>
         </div>
         <div>
             <Link href="/home">
                 <button> HOME </button>
             </Link>

         </div>
      </form>
  </div>
)
}

export default FormDeportes

function secure_url(secure_url: any): React.SetStateAction<any[]> {
  throw new Error('Function not implemented.');
}