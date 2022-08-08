import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Divider, TextField,Rating,FormControlLabel,Switch } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useDispatch } from 'react-redux';
import {GETORDENAMIENTOS} from  '../../../actions'
import { AppDispatch } from '../../../store';

const regexnumbers=/^[0-9]+$/

 export interface Orders{
  catg:string,
  preciomin:number,
  preciomax:number,
  rating:number
}

const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink[600],
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink[600],
  },
}));

export default function DialogSelect() {
  const useAppDispatch = () => useDispatch<AppDispatch>();
  const dispatch=useAppDispatch()
  const [open, setOpen] = React.useState(false);
  const [catg, setCatg] = React.useState<string>('');
  const [preciomin, setPrecioMin] = React.useState<string>('');
  const [preciomax, setPrecioMax] = React.useState<string>('');
  const [rating, setRating] = React.useState<number>(0);
  const [input,setInput] = React.useState<Orders>({catg:'',preciomin:0,preciomax:0,rating:0});
  const [error,setError] = React.useState<boolean>(false);

  React.useEffect(()=>{
    setInput(()=>({catg:catg,preciomin:parseInt(preciomin),preciomax:parseInt(preciomax),rating:rating}))
  },[catg,preciomin,preciomax,rating])

  React.useEffect(()=>{
    setError(()=>false)
    if(preciomin!=='' && preciomax!==''){
      if(parseInt(preciomin)>parseInt(preciomax))setError(()=>true)
    }
  },[preciomin,preciomax])

  const handleChange = (e:any) => {
    if(e.target.name==='selectcatg'){
      setCatg(()=>e.target.value)
    }
    if(e.target.name==='preciomin'){
      if(regexnumbers.test(e.target.value)){setPrecioMin(()=>e.target.value)}
      else if(e.target.value===''){setPrecioMin(()=>'')}
    }
    if(e.target.name==='preciomax'){
      if(regexnumbers.test(e.target.value)){setPrecioMax(()=>e.target.value)}
      else if(e.target.value===''){setPrecioMax(()=>'')}
    }
    if(e.target.name==='rating')setRating(()=>parseInt(e.target.value))
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };
  const handleSubmit=(event: React.SyntheticEvent<unknown>, reason?: string)=>{
    dispatch(GETORDENAMIENTOS(input))
    setCatg('')
    setPrecioMin('')
    setPrecioMax('')
    setRating(0)
    handleClose(event)
  }
  return (
    <div>
      <Button sx={{color:'white',bgcolor:'transparent'}}onClick={handleClickOpen}><FilterListIcon sx={{color:'white',m:1}}/>Filtrar</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Filtros</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, width:'100%' }}>
              <InputLabel htmlFor="demo-dialog-native">Categorias</InputLabel>
              <Select
                native
                value={catg}
                name='selectcatg'
                onChange={(e)=>handleChange(e)}
                input={<OutlinedInput label="Categorias" id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                <option value='tecnologia'>Tecnologia</option>
                <option value='ropa'>Ropa</option>
                <option value='deporte'>Deportes</option>
                <option value='cuidado personal'>Cuidado Personal</option>
              </Select>
            </FormControl>
          </Box>
          <Divider/>
          <Box sx={{display:'flex'}}>
            <TextField error={error} sx={{m:1, minWidth:20, width:'auto'}} name='preciomin' onChange={(e)=>handleChange(e)} value={preciomin} placeholder='Precio Minimo' autoComplete='false'/>
            <TextField error={error} sx={{m:1, minWidth:20, width:'auto'}} name='preciomax' onChange={(e)=>handleChange(e)} value={preciomax} placeholder='Precio Maximo' autoComplete='false'/>
          </Box>

          <Divider/>
          {/* <Box sx={{display:'flex',justifyContent:'space-around'}}>
            <Rating sx={{m:1}} value={rating} name='rating' onChange={(e)=>handleChange(e)} size="large" />
          </Box> */}

          {/* <Divider/>
          <Box sx={{display:'flex',justifyContent:'space-around'}}>
                <FormControlLabel control={<GreenSwitch/>} label="Con Envío" />
                <FormControlLabel control={<GreenSwitch/>} label="En Cuotas" />
          </Box> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={(e)=>handleClose(e)}>Cancel</Button>
          <Button disabled={error} onClick={(e)=>handleSubmit(e)}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
