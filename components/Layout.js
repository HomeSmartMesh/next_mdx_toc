import Nav from './Nav'
import {Link, Toolbar, Divider, Box, Drawer } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <main >
        <Box mx={1} mt={9}>
          {children}
        </Box>
      </main>
    </>
  )
}

export default Layout
