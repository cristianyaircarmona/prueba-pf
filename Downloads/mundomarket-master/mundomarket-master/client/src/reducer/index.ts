
import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions/index'
import Cookie from 'js-cookie'
import axios from 'axios'


interface Estado{
  isLogged:boolean,
  productos:any
  producto:any
  usuarios:any
  ordenes:any
  orden:any
  copiaproductos:any
  recommended:any
  user:any
}
const initialState = { productos:[], producto:[], usuarios:[], ordenes:[],orden:[],recommended:[],copiaproductos:[],
  isLogged:Cookie.get('user')?true:false,user:Cookie.get('user')?JSON.parse(Cookie.get('user')!):[] 
} as Estado


const rootReducer = createReducer(initialState, (builder) => {



  builder
    .addCase(actions.GETPRODUCTS.fulfilled, (state, action) => {
      state.productos=action.payload
      state.copiaproductos=action.payload
      state.producto=[]
      
    })

    .addCase(actions.GETUSERS.fulfilled, (state, action) => {
      state.usuarios=action.payload
      
    })

    .addCase(actions.GETORDERS.fulfilled, (state, action) => {
      state.ordenes=action.payload
      
    })

    .addCase(actions.GETORDER.fulfilled, (state, action) => {
      state.orden=action.payload
    })

    .addCase(actions.PAYORDER.fulfilled, (state, action) => {
    })

    .addCase(actions.GETDETAIL.fulfilled, (state, action) => {
      state.producto=action.payload
    })

    .addCase(actions.POSTPRODUCT.fulfilled, (state, action) => {
      state.productos=action.payload
    })

    .addCase(actions.CREATEORDER.fulfilled, (state, action) => {
    })

    .addCase(actions.GETSEARCHBYNAME.fulfilled, (state, action) => {
      state.productos=action.payload
      state.copiaproductos=action.payload
      
    })

    .addCase(actions.GETSEARCHBYCATEGORY.fulfilled, (state, action) => {
      state.productos=action.payload
      
    })

    .addCase(actions.GETRECOMMENDED.fulfilled, (state, action) => {
      state.recommended=action.payload
      
    })

    .addCase(actions.GETORDENAMIENTOS.fulfilled, (state, action) => {
      console.log(action.payload)
      let filtrado=[]
      if(action.payload.catg!==''){filtrado=state.copiaproductos.filter((e:any)=>e.category===action.payload.catg)}
      else{
        filtrado=state.copiaproductos}
      
      if(action.payload.preciomin){filtrado=filtrado.filter((e:any)=>e.price>action.payload.preciomin)}

      if(action.payload.preciomax){filtrado=filtrado.filter((e:any)=>e.price<action.payload.preciomax)}

      if(action.payload.rating!==0){filtrado=filtrado.filter((e:any)=>e.rating===action.payload.rating)}

      state.productos=filtrado
    })

    .addCase(actions.REGISTERUSER.fulfilled, (state, action) => {
      
    })
    .addCase(actions.LOGINUSER.fulfilled, (state, action) => {
        if(action.payload.token){
          state.isLogged=true;
          state.user=action.payload.user
          Cookie.set('x-access-token',JSON.stringify( action.payload.token ),{expires:0.08})
          Cookie.set('user',JSON.stringify( action.payload.user ),{expires:0.08})
        }
    })
    .addCase(actions.LOGOUT,(state)=>{
      Cookie.remove('x-access-token')
      Cookie.remove('token')
      Cookie.remove('user')
      state.isLogged=false;
      state.user=[];
      state.ordenes=[]
    })
    .addCase(actions.MODIFYUSER.fulfilled,(state,action)=>{
      if(state.user._id===action.payload._id){
      Cookie.set('user',JSON.stringify( action.payload ),{expires:0.08})
      state.user=action.payload
      window.location.replace('/')
      }
      else{
        state.user=Cookie.get('user')?JSON.parse(Cookie.get('user')!):[]
      }
    })
    .addCase(actions.LOGINUSERGOOGLESUCCESS.fulfilled, (state, action) => {
      //if(action.payload.message==='successfull'){
        //const userPay=action.payload.user;
        state.isLogged=true;
        state.user=action.payload.user;
        console.log("cokie:",Cookie.get('token'))
        Cookie.set('x-access-token',JSON.stringify( Cookie.get('token')),{expires:0.08})
        Cookie.set('user',JSON.stringify( action.payload.user ),{expires:0.08})
      //}
  })
})



export default rootReducer
