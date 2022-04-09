import {Toolbar, Divider, List, ListItem, 
    ListItemText, Drawer } from '@mui/material';
import Link from 'next/link'


export default function MenuList({pages}){
const drawerWidth = 300
return(
    <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Toolbar />
        <Divider />
        <List>
          {pages.map((page, index) => (
              <Link href={`#${page.href}`} key={index}>
                <ListItem button key={page.text}>
                <ListItemText primary={page.text} />
                </ListItem>
              </Link>
          ))}
        </List>
      </Drawer>
)
}
