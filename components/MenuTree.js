import {forwardRef,useState, useEffect} from 'react';
import {Link, Toolbar, Divider, Box, Drawer,Typography,Slider } from '@mui/material';
import {TreeView } from '@mui/lab';
import TreeItem, { useTreeItem } from '@mui/lab/TreeItem';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

//section from https://mui.com/material-ui/react-tree-view/#contentcomponent-prop
  const CustomContent = forwardRef(function CustomContent(props, ref) {
    const {
      classes,
      className,
      label,
      nodeId,
      icon: iconProp,
      expansionIcon,
      displayIcon,
    } = props;

    const {
      disabled,
      expanded,
      selected,
      focused,
      handleExpansion,
      handleSelection,
      preventSelection,
    } = useTreeItem(nodeId);

    const icon = iconProp || expansionIcon || displayIcon;

    const handleMouseDown = (event) => {
      preventSelection(event);
    };

    const handleExpansionClick = (event) => {
      handleExpansion(event);
    };

    const handleSelectionClick = (event) => {
      handleSelection(event);
    };

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={clsx(className, classes.root, {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
          [classes.disabled]: disabled,
        })}
        onMouseDown={handleMouseDown}
        ref={ref}
      >
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div onClick={handleExpansionClick} className={classes.iconContainer}>
          {icon}
        </div>
        <Typography
          onClick={handleSelectionClick}
          component="div"
          className={classes.label}
        >
          {label}
        </Typography>
      </div>
    );
  });

  CustomContent.propTypes = {
    /**
     * Override or extend the styles applied to the component.
     */
    classes: PropTypes.object.isRequired,
    /**
     * className applied to the root element.
     */
    className: PropTypes.string,
    /**
     * The icon to display next to the tree node's label. Either a parent or end icon.
     */
    displayIcon: PropTypes.node,
    /**
     * The icon to display next to the tree node's label. Either an expansion or collapse icon.
     */
    expansionIcon: PropTypes.node,
    /**
     * The icon to display next to the tree node's label.
     */
    icon: PropTypes.node,
    /**
     * The tree node label.
     */
    label: PropTypes.node,
    /**
     * The id of the node.
     */
    nodeId: PropTypes.string.isRequired,
  };

  const CustomTreeItem = (props) => (
    <TreeItem ContentComponent={CustomContent} {...props} />
  );
//end of custom tree component--------------------------------------

function headings_tree_to_list(nodes){
  let headings = []
  function get_descendence(node){
    let res_list = []
    if(node.children){
      for(const child of node.children){
        res_list.push(child)
        res_list.push(...get_descendence(child))
      }
      return res_list
    }else{
      return []
    }
  }

  for(const node of nodes){
    headings.push(node)
    headings.push(...get_descendence(node))
  }
  return headings
}

export default function MenuTree({nodes,expand_to_level=2}){

  const list_nodes = headings_tree_to_list(nodes)

  function expanded_list_from_level(level){
    return list_nodes.filter(node=>((node.level<level)&&node.children)).map(node=>node.id)
  }


  const expanded_list_ids = expanded_list_from_level(expand_to_level)

  const [expanded,setExpanded] = useState(expanded_list_ids)
  //const max_Level = Math.max(list_nodes.map(node=>node.level))
  const max_Level = Math.max(...list_nodes.map(node=>node.level))

  const drawerWidthMin = 300
  const drawerWidthMax = 500

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };  

  const renderTree = (nodes) => (
    nodes.map((node,index) => (
      <CustomTreeItem 
        key={index}
        nodeId={node.id}
        label={<Link href={`#${node.href}`} style={{ textDecoration: 'none' }}>{node.text}</Link>}
      >
        {Array.isArray(node.children)
        ? renderTree(node.children)
        : null}
      </CustomTreeItem>
    ))
  )

  return(
    
    <Drawer
        sx={{
          maxWidth: drawerWidthMax,
          minWidth: drawerWidthMin,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            maxWidth: drawerWidthMax,
            minWidth: drawerWidthMin,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Toolbar />
        <Divider/>
        <Toolbar>
        <Slider
          aria-label="Small steps"
          defaultValue={expand_to_level}
          step={1}
          marks
          min={1}
          max={max_Level}
          valueLabelDisplay="off"
          onChange={(e,newValue)=>{setExpanded(expanded_list_from_level(newValue))}}
        />
        </Toolbar>
        <Divider/>
        <Box sx={{overflow:'auto', mt:1,mr:1}}>
        <TreeView
          aria-label="rich object"
          defaultCollapseIcon={<ExpandMoreIcon />}
          expanded={expanded}
          onNodeToggle={handleToggle}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ flexGrow: 1, maxWidth: drawerWidthMax, overflowY: 'auto' }}
        >
          {renderTree(nodes)}
        </TreeView>
        </Box>
      </Drawer>
  )
}
