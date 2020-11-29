import React, { useEffect, useState } from 'react';
import SortableTree, { addNodeUnderParent, removeNodeAtPath } from 'react-sortable-tree';
import {IconButton, Menu, MenuItem} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import MyTheme from '../../utils/theme-react-sortable';
import AddIcon from '@material-ui/icons/Add'
import M from '../../messages/constants'

export default () => {
  const [treeData, setTreeData] = useState([{ title: 'Peter Olofsson' }, { title: 'Karl Johansson' }])
  const [anchorEl, setAnchorEl] = useState(null);

  const getNodeKey = ({ treeIndex }) => treeIndex;

  const addNewTrigger = () => {
    setTreeData(treeData.concat({ title: `${Math.random()}` }))
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log(treeData)
  }, [treeData])

  return (
    <div>
      <SortableTree
        isVirtualized={false}
        treeData={treeData}
        onChange={setTreeData}
        theme={MyTheme}
        generateNodeProps={({ node, path }) => ({
          buttons: [
            <>
              <IconButton size='small' aria-controls="menu" aria-haspopup="true" onClick={handleClick}>
                <MoreHorizIcon fontSize='small' />
              </IconButton>
              <Menu
                id="menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() =>
                  setTreeData(addNodeUnderParent({
                      treeData,
                      parentKey: path[path.length - 1],
                      expandParent: true,
                      getNodeKey,
                      newNode: {
                        title: `${Math.random()}`,
                      }
                    }).treeData
                  )
                }>
                  <EditIcon fontSize='small' /> Add child
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    setTreeData(removeNodeAtPath({
                        treeData,
                        path,
                        getNodeKey,
                      }
                    ))
                  }
                >
                  <DeleteIcon fontSize='small' /> Remove
                </MenuItem>
              </Menu>
            </>
          ],
        })}
      />
      <button onClick={addNewTrigger}>
        Add more
      </button>
    </div>
  );
}
