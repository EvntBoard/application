import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

import './tree-node-renderer.scss';

const FileThemeTreeNodeRenderer = ({
                                     children,
                                     listIndex,
                                     swapFrom,
                                     swapLength,
                                     swapDepth,
                                     scaffoldBlockPxWidth,
                                     lowerSiblingCounts,
                                     connectDropTarget,
                                     isOver,
                                     draggedNode,
                                     canDrop,
                                     treeIndex,
                                     treeId, // Delete from otherProps
                                     getPrevRow, // Delete from otherProps
                                     node, // Delete from otherProps
                                     path, // Delete from otherProps
                                     rowDirection,
                                     ...otherProps
                                   }) => {
  return connectDropTarget(
    <div {...otherProps} className='node'>
      {Children.map(children, child =>
          cloneElement(child, {
            isOver,
            canDrop,
            draggedNode,
            lowerSiblingCounts,
            listIndex,
            swapFrom,
            swapLength,
            swapDepth,
          })
      )}
    </div>
  );
}

FileThemeTreeNodeRenderer.defaultProps = {
  swapFrom: null,
  swapDepth: null,
  swapLength: null,
  canDrop: false,
  draggedNode: null,
};

FileThemeTreeNodeRenderer.propTypes = {
  treeIndex: PropTypes.number.isRequired,
  treeId: PropTypes.string.isRequired,
  swapFrom: PropTypes.number,
  swapDepth: PropTypes.number,
  swapLength: PropTypes.number,
  scaffoldBlockPxWidth: PropTypes.number.isRequired,
  lowerSiblingCounts: PropTypes.arrayOf(PropTypes.number).isRequired,

  listIndex: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,

  // Drop target
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool,
  draggedNode: PropTypes.shape({}),

  // used in dndManager
  getPrevRow: PropTypes.func.isRequired,
  node: PropTypes.shape({}).isRequired,
  path: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  rowDirection: PropTypes.string.isRequired,
};

export default FileThemeTreeNodeRenderer;
