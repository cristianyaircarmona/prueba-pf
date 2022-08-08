import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useDispatch,useSelector } from 'react-redux';
import {GETSEARCHBYNAME,LOGOUT} from  '../../actions'
import { AppDispatch, RootState } from '../../store';
import { CardMedia, Icon} from '@mui/material';
import { AttachMoney, Wallpaper } from '@mui/icons-material';
import { useState } from 'react';
import { Link,NavLink } from 'react-router-dom';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import FilterMenu from './FilterMenu'
import { useNavigate,useLocation } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import { CartContext } from '../cart/CartContext';
import KeyIcon from '@mui/icons-material/Key';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Button from '@mui/material/Button'
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

const logo=require('./Mundo-Market2.png')

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

 const mic: any =new SpeechRecognition()

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'es-ES';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const verifyAdmin=(user:any)=>{
  if(!user.roles){
    return false
  }
  else{
    if(user.roles[0].name==='admin')return true;
    else return false
  }
}
export default function PrimarySearchAppBar() {
  const { numberOfItems } = React.useContext( CartContext );
  const isLogged=useSelector((state:RootState)=>state.rootReducer.isLogged)
  const user=useSelector((state:RootState)=>state.rootReducer.user)
  const isAdmin=verifyAdmin(user)
  const [listen,setListen]=useState(false)

  const handleVoiceClick=()=>{
    setListen(prevState=>!prevState)
  }
  const location=useLocation().pathname
  const navigate=useNavigate()
  const useAppDispatch = () => useDispatch<AppDispatch>();
  const dispatch=useAppDispatch()
  const [barValue,setBarValue]=useState('')

  const handleListen=()=>{
    if(listen){
      mic.start();

      mic.onend=()=>{
        console.log("continue...");
        mic.start();
      }


    }else{
      mic.stop();
      mic.onend=()=>{
        console.log("Se le paró el micrófono");

      }
      setBarValue("")
    }
    mic.onstart=()=>{
      console.log("Micrófono encendido...");

    }
    mic.onresult=(event:any)=>{

      const transcript=Array.from(event.results)
         .map((result:any)=>result[0])
        .map((result:any)=>result.transcript).join("");
        console.log(transcript)
        setBarValue(transcript)
        mic.onerror=(event:any)=>console.log(event.error)
    }
  }

  React.useEffect(()=>{
    handleListen();
  },[listen])

  React.useEffect(()=>{
    dispatch(GETSEARCHBYNAME(barValue))
  },[barValue])
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 60,
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!isLogged && <MenuItem onClick={()=>navigate('/')}>Iniciar Sesión</MenuItem>}
      {isAdmin && <MenuItem onClick={()=>navigate('/admin/dashboard')}>Dashboard</MenuItem>}
      {isLogged && <MenuItem onClick={()=>navigate('/profile')}>Mi Perfil</MenuItem>}
      <MenuItem onClick={()=>navigate(`${isLogged? '/crearproducto':'/'}`)}>Vender</MenuItem>
      {isLogged && <MenuItem onClick={()=>{dispatch(LOGOUT())
      navigate('/')}}>Cerrar Sesión</MenuItem>}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 70,
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {!isLogged && <MenuItem onClick={()=>navigate('/')}>
      <IconButton size="large" color="inherit">
            <KeyIcon/>
        </IconButton>
        <p>Iniciar Sesión</p>
        </MenuItem>}
        {isAdmin && <MenuItem onClick={()=>navigate('/admin/dashboard')}>
      <IconButton size="large" color="inherit">
            <DashboardIcon/>
        </IconButton>
        <p>Dashboard</p>
        </MenuItem>}
      <MenuItem onClick={()=>navigate('/cart')}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={0} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Carrito</p>
      </MenuItem>
      {/* <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={0} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      {isLogged && <MenuItem onClick={()=>navigate('/profile')}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>}
      {isLogged && <MenuItem onClick={()=>navigate('/crearproducto')}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AttachMoney />
        </IconButton>
        <p>Vender</p>
      </MenuItem>}
      {isLogged && <MenuItem onClick={()=>{dispatch(LOGOUT())
      navigate('/')}}>
        <IconButton
          size="large"
          color="inherit"
        >
          <KeyIcon />
        </IconButton>
        <p>Cerrar Sesión</p>
        </MenuItem>}
    </Menu>
  );

  return (
    <Box  position='fixed' width='100%' z-index='10000' top='0px' sx={{ zIndex: 'tooltip'}} >
      <AppBar position="static" sx={{ bgcolor: "#232324" }} >
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={(e)=>{}}
          >
            <MenuIcon />
          </IconButton> */}
          {location==='/home'?<FilterMenu/>:null}
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: `${location==='/home'?'none':'block'}`, sm: 'block' } }}
            className='LinkedWhite'
          >
            <NavLink to='/home'
            style={isActive => ({
              color: isActive ? "white" : "white"
            })}
            >
            MundoMarket
            </NavLink>
          </Typography> */}
          <NavLink to='/home'>
          <Box sx={{width:200,height:100,display:{xs:'none',sm:'block'}}}>
          <img
              src={logo}
              alt='logo'
              width={'100%'}
              height={'100%'}
                            />
          </Box>
          </NavLink>
          <Box sx={{ flexGrow: 1 }} />
          {location==='/home'?<Search>
          <SearchIconWrapper>


          </SearchIconWrapper>
          <Button onClick={handleVoiceClick}>
            {listen?<MicIcon/>:<MicOffIcon/>}
            {/* <img className={"micro-off"} src={listen ? micon :micoff } alt="micro"/> */}
          </Button>

          <StyledInputBase
            placeholder={listen ? "Escuchando..." : "Buscar Productos…"}
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e)=>setBarValue(()=>e.target.value)}

          />
          </Search>:null}
          <Box sx={{ display: { xs: 'none', md: 'flex' },alignItems:'flex-start' }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={numberOfItems} color="error">

                {/*<Link to={`/user/${user._id}`}>*/}
                
                <NavLink to='/cart' style={isActive => ({color: isActive ? "white" : "white"})}>
                  <ShoppingCart />
                </NavLink>
              </Badge>
            </IconButton>
            {/* <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >

                <Badge badgeContent={0} color="error">
                  <NotificationsIcon />
                </Badge>
            

            </IconButton> */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}