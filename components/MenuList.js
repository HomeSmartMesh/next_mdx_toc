import {Toolbar, Divider, List, ListItem, 
    ListItemText, Drawer } from '@mui/material';
import Link from 'next/link'


export default function MenuList({entries}){
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
          {entries.map((entry, index) => (
              <Link href={`#${entry.href}`} key={index}>
                <ListItem button key={entry.text}>
                <ListItemText primary={entry.text} />
                </ListItem>
              </Link>
          ))}
        </List>
      </Drawer>
)
}
