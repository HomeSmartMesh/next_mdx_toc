import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {Button,Tooltip} from '@mui/material';
import Typography from '@mui/material/Typography';
import Link from 'next/link'
import GitHubIcon from '@mui/icons-material/GitHub';

const pages = [
    {'name':'Remote'    ,'href':''},
    {'name':'Page'    ,'href':'page'},
    {'name':'Toc List'    ,'href':'toc'},
    {'name':'Toc Tree'    ,'href':'tree'},
    {'name':'remToc'    ,'href':'remtoc'},
]


export default function Nav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar >
                {pages.map((page,index)=>(
                    <Box sx={{ flexGrow: 0, display: { xs: 'flex'} }} key={index}>
                        <Link href={`/${page.href}`} >
                            <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    {page.name}
                                </Typography>
                            </Button>
                        </Link>
                    </Box>
            ))}
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open in Github">
                    <a href="https://github.com/HomeSmartMesh/next_mdx_toc" target="_blank" rel="noopener">
                        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                            <GitHubIcon/>
                        </Button>
                    </a>
                </Tooltip>
            </Box>
            </Toolbar>
        </AppBar>
    </Box>
  );
}

