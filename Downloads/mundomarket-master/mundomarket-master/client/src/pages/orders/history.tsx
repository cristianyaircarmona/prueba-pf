import { Typography, Grid, Chip, Link, Button } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
//import { ShopLayout } from "../../components/layouts"
//import NextLink from 'next/link';
import NavBar from '../../components/NavBar/NavBar'
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { GETORDERS,GETORDER } from '../../actions';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch,RootState } from '../../store/index';

const moment=require('moment')




const useAppDispatch=()=>useDispatch<AppDispatch>();

/*
const rows=[
    {id: 1, paid:true, fullname: 'Gabriel Goliger'},
    {id: 2, paid:false, fullname: 'Jaime Gomez'},
    {id: 3, paid:true, fullname: 'Pepe Goliger'},
    {id: 4, paid:false, fullname: 'Daniel Gonzales'},
    {id: 5, paid:false, fullname: 'Caro Bercolini'},
    {id: 6, paid:true, fullname: 'Ines Beckamp'},
 
]
*/
const HistoryPage= () => {
    const dispatch=useAppDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
        dispatch(GETORDERS())
    },[dispatch])

    const orders=useSelector((State:RootState) => State.rootReducer.ordenes);

    const verOrden=async (id:string)=>{
        await dispatch(GETORDER(id))
        navigate(`/order/${id}`)
    }
    const rows=orders.map((order:any)=>({id: order._id, paid:order.isPaid, fullname: order.user?.name,date:moment(order.updatedAt).format('YYYY-MM-DD, h:mm:ss a')
}))

    const columns: GridColDef[]= [
        {field: 'id', headerName: 'ID', width:300},
        {field: 'fullname', headerName: 'Nombre Completo', width:300},
    
        {
            field:'paid',
            headerName:'Pagada',
            description: 'Muestra si esta pagada la orden o no',
            width: 200,
            renderCell: (params: GridValueGetterParams)=>{
                return (
                    params.row.paid
                    ? <Chip color="success" label="Pagado" variant="outlined"/>
                    :  <Chip color="error" label="Pago pendiente" variant="outlined" />
                )
                
            }
        },

        {
            field:'fecha',
            headerName:'Fecha',
            description: 'muestra la fecha de que se realizo la orden',
            width: 200,
            sortable:false,
            renderCell: (params: GridValueGetterParams)=>{
                return (
                    params.row.date
                )
                
            }
        },
    
        {
            field:'orden',
            headerName:'Ver orden',
            width: 200,
            sortable: false,
            renderCell: (params: GridValueGetterParams)=>{
                return (
                
                    // <NavLink to={`/order/${params.row.id}`}>
                    //     <Link underline='always'>
                            <Button onClick={()=>verOrden(params.row.id)}>
                                Ver Orden
                            </Button>
                    //     </Link>
                    // </NavLink>
    
                )
                
            }
        }
    
    
    ];

    return (
        <>
            <NavBar/>
            <Typography variant='h1'> Historial de ordenes</Typography>

            <Grid container>
                <Grid item xs={12} sx = {{height:650, width: '100%'}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={20}
                        rowsPerPageOptions={[20]}
                    />

                </Grid>

            </Grid>

            </>

    )
}

export default HistoryPage;

