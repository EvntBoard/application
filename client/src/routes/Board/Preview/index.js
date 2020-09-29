import React, { useCallback, useMemo, useRef, useState } from 'react'
import { area, template } from 'grid-template-parser'
import { debounce, find, filter } from 'lodash'

import Track from './Track'
import { clamp, generateColor, newToOld } from '../utils'
import { useEventListener } from '../../../utils/hooks'
import ModalButton from '../../../components/Modal/ModalButton'
import ModalDeleteButton from '../../../components/Modal/ModalDeleteButton'

const SAMPLE_BUTTON = {
  id: null,
  id_trigger: null,
  id_board: null,
  text: null,
  image: null,
  color: null,
  column_start: null,
  column_end: null,
  row_start: null,
  row_end: null
}

const Preview = ({ setButtons, buttons, width, height, boardId }) => {
  const ref = useRef()

  const [dx, setDx] = useState(0)
  const [dy, setDy] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [draggedArea, setDraggedArea] = useState(null)
  const [draggedPosition, setDraggedPosition] = useState(null)
  const [current, setCurrent] = useState(null)
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

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
      buttonLeft ? buttonLeft.column_end : 1,
      (buttonRight ? buttonRight.column_start : width + 1) - (button.column_end - button.column_start),
    );

    const rowStart = clamp(
      y - dy + 1,
      buttonTop ? buttonTop.row_end : 1,
      (buttonBottom ? buttonBottom.row_start : height + 1) - (button.row_end - button.row_start),
    );

    if (columnStart !== button.column_start || rowStart !== button.row_start) {
      const columnEnd = columnStart + (button.column_end - button.column_start);
      const rowEnd = rowStart + (button.row_end - button.row_start);

      return moveArea({
        ...button,
        column_start: columnStart,
        column_end: columnEnd,
        row_start: rowStart,
        row_end: rowEnd
      });
    }
  };

  const makeTrackMouseDown = button => evt => {
    evt.preventDefault();
    const rect = ref.current.getBoundingClientRect();
    const x = Math.round((evt.clientX - rect.left) / rect.width * width);
    const y = Math.round((evt.clientY - rect.top) / rect.height * height);

    setDx( x - button.column_start + 1)
    setDy(y - button.row_start + 1)

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
          adjTrigger ? adjTrigger.row_end : 1,
          button.row_end - 1,
        );
        return moveArea({ ...button, row_start: start });
      case 'right':
        end = clamp(
          x + 1,
          button.column_start + 1,
          adjTrigger ? adjTrigger.column_start : width + 1,
        );
        return moveArea({ ...button, column_end: end });
      case 'bottom':
        end = clamp(
          y + 1,
          button.row_start + 1,
          adjTrigger ? adjTrigger.row_start : height + 1,
        );
        return moveArea({ ...button, row_end: end });
      case 'left':
        start = clamp(
          x + 1,
          adjTrigger ? adjTrigger.column_end : 1,
          button.column_end - 1,
        );
        return moveArea({ ...button, column_start: start });
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
      id_board: boardId,
      column_start: newArea.column.start,
      column_end: newArea.column.end,
      row_start: newArea.row.start,
      row_end: newArea.row.end,
    })
    setOpen(true)
  }

  const onlyUpdate = useCallback(debounce((button) => {
    window.app.button.update(button)
  }, 500), [])

  const moveArea = (button) => {
    setButtons([...filter(buttons, i => i.id !== button.id), button ])
    onlyUpdate(button)
  }

  const findAdjacentArea = (button, direction) => {
    const { column_start, column_end, row_start, row_end } = button;

    switch (direction) {
      case 'top':
        return find(buttons, i =>
          i.row_end === row_start &&
          i.column_start < column_end &&
          i.column_end > column_start
        )
      case 'right':
        return find(buttons, i =>
          i.column_start === column_end &&
          i.row_start < row_end &&
          i.row_end > row_start
        )
      case 'bottom':
        return find(buttons, i =>
          i.row_start === row_end &&
          i.column_start < column_end &&
          i.column_end > column_start
        )
      case 'left':
        return find(buttons, i =>
          i.column_end === column_start &&
          i.row_start < row_end &&
          i.row_end > row_start
        )
      default:
        throw new Error('WTF !?')
    }
  }

  const onCreate = (button) => {
    window.app.button.create({ ...SAMPLE_BUTTON, ...button }).then((data) => {
      setButtons([
        ...buttons,
        data
      ])
      setCurrent(null)
      setOpen(false)
    })
  }

  const onUpdate = (button) => {
    window.app.button.update({ ...SAMPLE_BUTTON, ...button }).then((data) => {
      setButtons([
        ...filter(buttons, (i) => i.id !== data.id),
        data
      ])
      setCurrent(null)
      setOpen(false)
    })
  }

  const onDelete = async (button) => {
    window.app.button.delete({ id: button.id }).then((data) => {
      if (data) {
        setCurrent(null)
        setOpenDelete(false)
        setButtons(filter(buttons, i => i.id !== button.id))
      }
    })
    return true
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
      <ModalDeleteButton open={openDelete} setOpen={setOpenDelete} onSubmit={onDelete} onReset={onReset} current={current} />
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
