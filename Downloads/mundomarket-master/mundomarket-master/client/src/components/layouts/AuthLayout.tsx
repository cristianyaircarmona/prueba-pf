
import { FC } from "react"
import { Box } from '@mui/material';


interface Props{
    children: any,
    title: string;
}

export const AuthLayout: FC<Props> = ({children, title})=>{
    return(
        <>
        
            <Box>
                <title>{title}</title>
            </Box>

            <main>
                <Box display='flex' justifyContent='center' alignItems='center' height="calc(100vh - 200px)">
                    {children}
                </Box>
            </main>
        
        </>
    )
}