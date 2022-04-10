import Nav from './Nav'
import {Link, Toolbar, Divider, Box, Drawer } from '@mui/material';

//TODO overflow X not working

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <main >
        <Box mx={1} component="div"  sx={{overflow: 'auto'}}>
          {children}
        </Box>
      </main>
    </>
  )
}

export default Layout
