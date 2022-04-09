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
        <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["0","6"]}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 210, flexGrow: 1, maxWidth: drawerWidth, overflowY: 'auto' }}
    >
      {renderTree(nodes)}
      </TreeView>
      </Drawer>
  )
}
