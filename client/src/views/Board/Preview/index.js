import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { debounce, find, filter } from 'lodash'
import { area, template } from 'grid-template-parser'

import Track from './Track'
import ModalButton from '../../../components/Modal/ModalButton'
import ModalButtonDelete from '../../../components/Modal/ModalButtonDelete'
import { clamp, generateColor, newToOld } from '../utils'
import { useEventListener } from '../../../utils/hooks'
import { buttonCreate, buttonDelete, buttonUpdate } from '../../../store/button'

const SAMPLE_BUTTON = {
  id: null,
  idBoard: null,
  idTrigger: null,
  text: null,
  image: null,
  color: null,
  columnStart: null,
  columnEnd: null,
  rowStart: null,
  rowEnd: null,
  createdAt: null,
  updatedAt: null
}

const Preview = ({ buttons: boardButtons, board }) => {
  const ref = useRef()
  const dispatch = useDispatch()

  const [ buttons, setButtons ] = useState(boardButtons)
  const [dx, setDx] = useState(0)
  const [dy, setDy] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [draggedArea, setDraggedArea] = useState(null)
  const [draggedPosition, setDraggedPosition] = useState(null)
  const [current, setCurrent] = useState(null)
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  useEffect(() => {
    setButtons(boardButtons)
  }, [boardButtons])

  const width = useMemo(() => {
    if (board) {
      return board.width
    }
    return 0
  }, [board])

  const height = useMemo(() => {
    if (board) {
      return board.height
    }
    return 0
  }, [board])

  const tpl = useMemo(() => template({ width, height, areas: buttons.reduce((acc, i) => ({ ...acc, [i.id]: newToOld(i) }), {}) }), [width, height, buttons])

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false)
      setDraggedArea(null)
      setDraggedPosition(null)
    }
  }

  const handleMouseMove = evt => {
    if (isDragging) {
      const rect = ref.current.getBoundingClientRect();
      const x = Math.round((evt.clientX - rect.left) / rect.width * width);
      const y = Math.round((evt.clientY - rect.top) / rect.height * height);

      switch (true) {
        case typeof draggedPosition === 'string':
          return moveHandler(x, y);
        case typeof draggedArea === 'string':
          return moveTrack(x, y);
        default:
          return null
      }
    }
  }

  useEventListener('mouseup', handleMouseUp)
  useEventListener('mousemove', handleMouseMove)

  const moveTrack = (x, y) => {
    const button = find(buttons, { id: draggedArea });

    const buttonTop = findAdjacentArea(button, 'top');
    const buttonRight = findAdjacentArea(button, 'right');
    const buttonBottom = findAdjacentArea(button, 'bottom');
    const buttonLeft = findAdjacentArea(button, 'left');

    const columnStart = clamp(
      x - dx + 1,
      buttonLeft ? buttonLeft.columnEnd : 1,
      (buttonRight ? buttonRight.columnStart : width + 1) - (button.columnEnd - button.columnStart),
    );

    const rowStart = clamp(
      y - dy + 1,
      buttonTop ? buttonTop.rowEnd : 1,
      (buttonBottom ? buttonBottom.rowStart : height + 1) - (button.rowEnd - button.rowStart),
    );

    if (columnStart !== button.columnStart || rowStart !== button.rowStart) {
      const columnEnd = columnStart + (button.columnEnd - button.columnStart);
      const rowEnd = rowStart + (button.rowEnd - button.rowStart);

      return moveArea({
        ...button,
        columnStart: columnStart,
        columnEnd: columnEnd,
        rowStart: rowStart,
        rowEnd: rowEnd
      });
    }
  };

  const makeTrackMouseDown = button => evt => {
    evt.preventDefault();
    const rect = ref.current.getBoundingClientRect();
    const x = Math.round((evt.clientX - rect.left) / rect.width * width);
    const y = Math.round((evt.clientY - rect.top) / rect.height * height);

    setDx( x - button.columnStart + 1)
    setDy(y - button.rowStart + 1)

    setIsDragging(true)
    setDraggedArea(button.id)
  }

  const makeHandlerMouseDown = button => draggedPosition => evt => {
    evt.preventDefault();
    setIsDragging(true)
    setDraggedArea(button.id)
    setDraggedPosition(draggedPosition)
  }

  const moveHandler = (x, y) => {
    let start
    let end

    const button = find(buttons, { id: draggedArea });
    const adjTrigger = findAdjacentArea(button, draggedPosition);

    switch (draggedPosition) {
      case 'top':
        start = clamp(
          y + 1,
          adjTrigger ? adjTrigger.rowEnd : 1,
          button.rowEnd - 1,
        );
        return moveArea({ ...button, rowStart: start });
      case 'right':
        end = clamp(
          x + 1,
          button.columnStart + 1,
          adjTrigger ? adjTrigger.columnStart : width + 1,
        );
        return moveArea({ ...button, columnEnd: end });
      case 'bottom':
        end = clamp(
          y + 1,
          button.rowStart + 1,
          adjTrigger ? adjTrigger.rowStart : height + 1,
        );
        return moveArea({ ...button, rowEnd: end });
      case 'left':
        start = clamp(
          x + 1,
          adjTrigger ? adjTrigger.columnEnd : 1,
          button.columnEnd - 1,
        );
        return moveArea({ ...button, columnStart: start });
      default:
        throw new Error('WTF ?!?')
    }
  }

  const onClickAdd = (event) => {
    event.preventDefault()
    if (isDragging) {
      return
    }
    const rectGrid = event.currentTarget.getBoundingClientRect()

    const gridHeight = rectGrid.bottom - rectGrid.top
    const gridWidth = rectGrid.right - rectGrid.left

    const mouseX = event.clientX - rectGrid.left
    const mouseY = event.clientY - rectGrid.top

    const colWidth = gridWidth / width
    const colHeight = gridHeight / height

    const x = Math.trunc(mouseX / colWidth)
    const y = Math.trunc(mouseY / colHeight)

    const newArea = area({ x, y, width: 1, height: 1 });

    setCurrent({
      ...SAMPLE_BUTTON,
      color: generateColor(),
      idBoard: board.id,
      columnStart: newArea.column.start,
      columnEnd: newArea.column.end,
      rowStart: newArea.row.start,
      rowEnd: newArea.row.end,
    })
    setOpen(true)
  }

  const onlyUpdate = useCallback(debounce((button) => {
    dispatch(buttonUpdate(button))
  }, 500), [])

  const moveArea = (button) => {
    setButtons([...filter(buttons, i => i.id !== button.id), button ])
    onlyUpdate(button)
  }

  const findAdjacentArea = (button, direction) => {
    const { columnStart, columnEnd, rowStart, rowEnd } = button;

    switch (direction) {
      case 'top':
        return find(buttons, i =>
          i.rowEnd === rowStart &&
          i.columnStart < columnEnd &&
          i.columnEnd > columnStart
        )
      case 'right':
        return find(buttons, i =>
          i.columnStart === columnEnd &&
          i.rowStart < rowEnd &&
          i.rowEnd > rowStart
        )
      case 'bottom':
        return find(buttons, i =>
          i.rowStart === rowEnd &&
          i.columnStart < columnEnd &&
          i.columnEnd > columnStart
        )
      case 'left':
        return find(buttons, i =>
          i.columnEnd === columnStart &&
          i.rowStart < rowEnd &&
          i.rowEnd > rowStart
        )
      default:
        throw new Error('WTF !?')
    }
  }

  const onCreate = (button) => {
    dispatch(buttonCreate({ ...SAMPLE_BUTTON, ...button }))
    setCurrent(null)
    setOpen(false)
  }

  const onUpdate = (button) => {
    dispatch(buttonUpdate({ ...SAMPLE_BUTTON, ...button }))
    setCurrent(null)
    setOpen(false)
  }

  const onDelete = async (button) => {
    dispatch(buttonDelete(button))
    setCurrent(null)
    setOpenDelete(false)
  }

  const onCreateOrUpdate = async (button) => {
    if (button.id) {
      onUpdate(button)
    } else {
      onCreate(button)
    }
    return true
  }

  const onReset = () => {
    setCurrent(null)
    setOpen(false)
    setOpenDelete(false)
  }

  const onClickDelete = (button) => {
    setCurrent(button)
    setOpenDelete(true)
  }

  const onClickUpdate = (button) => {
    setCurrent(button)
    setOpen(true)
  }

  if (!tpl) {
    return null
  }

  return (
    <>
      <ModalButton open={open} setOpen={setOpen} onSubmit={onCreateOrUpdate} onReset={onReset} current={current} />
      <ModalButtonDelete open={openDelete} setOpen={setOpenDelete} onSubmit={onDelete} onReset={onReset} current={current} />
      <div
        id='preview'
        className='preview'
        ref={ref}
        style={{
          gridTemplateColumns: `repeat(${width}, ${100 / width}%)`,
          gridTemplateRows: `repeat(${height}, ${100 / height}%)`,
          gridTemplateAreas: `${tpl}`,
        }}
        onMouseUp={onClickAdd}
      >
        {buttons.map(button => (
          <Track
            key={button.id}
            button={button}
            grabbing={isDragging && draggedArea === button.id && typeof draggedPosition !== 'string'}
            onMouseDown={makeTrackMouseDown(button)}
            onHandlerMouseDown={makeHandlerMouseDown(button)}
            onClickUpdate={onClickUpdate}
            onClickDelete={onClickDelete}
          />
        ))}
      </div>
    </>
  );
}
export default Preview
