import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {Button,CssBaseline,Tooltip} from '@mui/material';
import {Slide, useScrollTrigger} from "@material-ui/core";
import Typography from '@mui/material/Typography';
import Link from 'next/link'
import GitHubIcon from '@mui/icons-material/GitHub';

const pages = [
    {'name':'Remote'    ,'href':''},
    {'name':'Toc Tree'    ,'href':'toc_tree'},
    {'name':'Toc List'    ,'href':'toc_list'},
    {'name':'remark Toc'    ,'href':'remtoc'},
    {'name':'Static'    ,'href':'static'},
]

export default function Nav() {
    const trigger = useScrollTrigger();
    return (
    <Box sx={{ display:'flex' }}>
        <CssBaseline/>
        <Slide appear={false} direction="down" in={!trigger}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar >
                    {pages.map((page,index)=>(
                        <Box sx={{ flexGrow: 0, display: { xs: 'flex'} }} key={index}>
                            <Link href={`/${page.href}`} >
                                <Button sx={{ color: 'white', display: 'block' }}>
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
                            <Button sx={{ color: 'white', display: 'block' }}>
                                <GitHubIcon/>
                            </Button>
                        </a>
                    </Tooltip>
                </Box>
                </Toolbar>
            </AppBar>
        </Slide>
        <Toolbar />
    </Box>
  );
}

