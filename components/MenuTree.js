import {Link, Toolbar, Divider, Box, Drawer } from '@mui/material';
import {TreeView ,TreeItem} from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function MenuTree({nodes}){
  const drawerWidth = 300

  const renderTree = (nodes) => (
    nodes.map((node,index) => (
      <TreeItem 
        key={index}
        nodeId={node.id}
        label={<Link href={`#${node.href}`} style={{ textDecoration: 'none' }}>{node.text}</Link>}
      >
        {Array.isArray(node.children)
        ? renderTree(node.children)
        : null}
      </TreeItem>
    ))
  )

  return(
    
    <Drawer
        sx={{
          maxWidth: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            maxWidth: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Toolbar />
        <Box sx={{overflow:'auto', mt:1,mr:1}}>
        <TreeView
          aria-label="rich object"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={["0","6"]}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ flexGrow: 1, maxWidth: drawerWidth, overflowY: 'auto' }}
        >
          {renderTree(nodes)}
        </TreeView>
        </Box>
      </Drawer>
  )
}
