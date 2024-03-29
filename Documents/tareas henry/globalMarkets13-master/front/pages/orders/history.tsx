import NextLink from 'next/link';
import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ShopLayout } from '../../components/layouts';
import {AuthContext} from "../../context/auth/AuthContext"
import React,{useContext} from "react"

import {useState, useEffect} from "react"



const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'firtsName', headerName: 'Nombre ', width: 300 },
    { field: 'lastName', headerName: 'apellido', width: 300 },

    {
        field: 'isPaid',
        headerName: 'Pagada',
        description: 'Muestra información si está pagada la orden o no',
        width: 200,
        renderCell: (params: GridValueGetterParams) => {
            return (
                params.row.isPaid
                    ? <Chip color="success" label="Pagada" variant='outlined' />
                    : <Chip color="error" label="No pagada" variant='outlined' />
            )
        }
    },
    {
        field: 'orden',
        headerName: 'Ver orden',
        width: 200,
        sortable: false,
        renderCell: (params: GridValueGetterParams) => {
            return (
                <>
               <NextLink href={`/orders/${ params.row.id }`} passHref>
                    <Link underline='always'>
                        Ver orden
                    </Link>
               </NextLink>
               </>
            )
        }
    }
];

var inicio:any[] = []

const HistoryPage =  () => {
    const{user,isLoggedIn}=useContext(AuthContext)
        
        const userId= user?.email


    const [orders, setOrders]= useState(inicio)
    

    useEffect(()=>{
        async function fetchData(){
            try {
                const t= await fetch(`http://localhost:9000/orders/getAll`,{
                    method:"POST",
                    headers:{
                        "Content-type":"application/json"
                    },
                    body:JSON.stringify({userId:userId})
                })
                const enviar= await t.json()
                setOrders(enviar)
                console.log("orders",enviar) 

            } catch (err) {
                console.log(err);
            }
            
        }
        fetchData();
    },[orders])

//    console.log("orders",orders)
  
    const rows = orders.map(p=>{
        return{
            id:p._id,
            firtsName:p.shippingAddress.firstName,
            lastName:p.shippingAddress.lastName,
            isPaid:p.isPaid
        }
    })
   
    

    const result = orders.filter(p=> p.paypalId);

    result.map(async p =>{
        try{ 
            const r= await fetch(`http://localhost:9000/paypal/getDataOrderById/${p.paypalId}`,{
                method:"GET",
                headers:{
                    "Content-type":"application/json"
                }
            })
            const r2= await r.json()

            if(r2.status==="COMPLETED"){
                try{
                    const q= await fetch(`http://localhost:9000/orders/${p._id}`,{
                        method:"PUT",
                        headers:{
                            "Content-type":"application/json"
                        },
                        body: JSON.stringify({isPaid:true})

                    })
                }
                catch(err) {
                    console.log(err)

                }

            }
                    
        }
        catch(err) {
            console.log(err)

        }
    })
    

    
        
   
  return (
    <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>
        <Typography variant='h1' component='h1'>Historial de ordenes</Typography>
        


        <Grid container>
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [10] }
                />

            </Grid>
        </Grid>

    </ShopLayout>
  )
}


export const datoss= async(userId)=>{

   

    const datos= await fetch(`http://localhost:9000/orders/getAll  `,{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify({userId:userId})
        
    })
    const date= await datos.json()
    
    
    
//   return date.map((order:any,i)=>{
//       <li key={i} className="list-group-item">{order.userId}</li>
//   })

    

}





export default HistoryPage