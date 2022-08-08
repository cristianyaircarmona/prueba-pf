import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { AttachMoneyOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, CategoryOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, AccessTimeOutlined, AddShoppingCart } from '@mui/icons-material';

import { AdminLayout } from './AdminLayout'
import { Grid, Typography } from '@mui/material'
import { SummaryTile } from './SummaryTitle'
//import { DashboardSummaryResponse } from './interfaceDashborad';
import { useDispatch, useSelector } from 'react-redux';
import {GETUSERS, GETORDERS} from '../../actions'
import { AppDispatch,RootState } from '../../store/index'
import { GETPRODUCTS } from '../../actions/index';
import { Link } from 'react-router-dom';

const useAppDispatch = () => useDispatch<AppDispatch>();

const DashboardPage = () => {

    const products=useSelector((State:RootState) => State.rootReducer.productos);
    const users=useSelector((State:RootState) => State.rootReducer.usuarios);
    const orders=useSelector((State:RootState) => State.rootReducer.ordenes);
    let ordenesPagas = orders.filter((order:any)=>order.isPaid===true)

    const dispatch=useAppDispatch()

    const [refreshIn, setRefreshIn] = useState(25);

    useEffect(()=>{
      dispatch(GETUSERS())
      dispatch(GETORDERS())
      dispatch(GETPRODUCTS())
    },[dispatch,refreshIn===0])


    useEffect(() => {
      const interval = setInterval(()=>{ //set interval es una funcion de js
        setRefreshIn( refreshIn => refreshIn > 0 ? refreshIn - 1: 25 );
      }, 1000 );
    
      return () => clearInterval(interval)
    }, []);


    let hightInventory = products.filter((p:any)=> p.stock>10)
    let productsWithNoInventory = products.filter((p:any)=> p.stock===0)

  return (
    <AdminLayout
        title='Dashboard'
        subTitle='Estadisticas generales'
        icon={ <DashboardOutlined /> }
    >
        
        <Grid container spacing={2}>
            
            <SummaryTile 
                title={ orders.length }
                subTitle="Ordenes totales"
                icon={ <CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
            
                title={ ordenesPagas.length }
                //title={ 2 }
                subTitle="Ordenes pagadas"
                icon={ <AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} /> }
            />
            
            <SummaryTile 
               // onClick={()=>alert("hola")}

                title={ orders.length-ordenesPagas.length }
                subTitle="Ordenes sin pagar"
                icon={ <CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} /> }
            />

        
            <SummaryTile 
               title={ users.length }
                subTitle="Usuarios"
                icon={ <GroupOutlined color="primary" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={products.length }
                subTitle="Publicaciones"
                icon={ <CategoryOutlined color="warning" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
              
               title={ productsWithNoInventory.length }
                subTitle="Sin inventario"
                icon={ <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
              
               title={ hightInventory.length }
                subTitle="Alto inventario"
                icon={ <AddShoppingCart color="success" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
               
               title={ refreshIn }
                subTitle="Actualización en:"
                icon={ <AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} /> }
            />

        </Grid>


    </AdminLayout>
  )
}

export default DashboardPage