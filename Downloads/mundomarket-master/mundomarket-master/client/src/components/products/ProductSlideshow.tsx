import {FC} from 'react';
import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import styles from './ProductSlideshow.module.css';
import {useLocation} from 'react-router-dom'



interface Props{
    images: string[]
    duration: number
    autoPlay: boolean
}

export const ProductSlideshow: FC<Props>=({images, duration ,autoPlay})=>{
    const location=useLocation().pathname
    let flechas=true
    let swipe=true
    let indicadores=true

    if(images.length>1 && autoPlay===true){autoPlay=true}else{autoPlay=false}

    if(images.length===1){flechas=false;  swipe=false; indicadores=false}

    return(
        <Slide
            easing="ease"
            duration={duration}
            autoplay= {autoPlay}
            indicators= {location==='/'?false:indicadores}
            arrows={location==='/'?false:flechas}
            canSwipe={location==='/'?false:swipe}
        >
            {
                images.map( image=>{
                    const url=`${image}`;
                    return(
                        <div className={styles['each-slide']} key={image}>
                            
                            <div style={{
                                backgroundImage:`url(${url})`,
                                backgroundSize: `${location==='/'?'cover':'contain'}`,
                                backgroundRepeat:'no-repeat',
                                backgroundPositionX: 'center'
                            }}>
                            </div>

                        </div>
                    )
                })
            }
        </Slide>
    )
}