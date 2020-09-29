import React, {useEffect, useMemo, useState} from 'react'
import { Spinner, Icon, Menu, MenuItem, Popover, Position } from '@blueprintjs/core'
import intl from 'react-intl-universal'
import { find, first, remove } from 'lodash'

import Grid from './Grid'
import Preview from './Preview'
import ModalBoardSettings from '../../components/Modal/ModalBoardSettings'
import { useAppContext } from '../../context/app'

import './assets/style.scss'

const SAMPLE_BOARD = {
  id: null,
  name: 'Another board',
  description: '',
  width: 5,
  height: 5
}

const GridManager = () => {
  const { cacheBoard, setCacheBoard } = useAppContext()
  const [ currentBoard, setCurrentBoard ] = useState(cacheBoard)
  const [ boards, setBoards ] = useState(null)
  const [ buttons, setButtons ] = useState(null)
  const [ open, setOpen ] = useState(false)

  const [ loadingBoards, setLoadingBoards ] = useState(false)
  const [ loadingButtons, setLoadingButtons ] = useState(false)

  useEffect(() => {
    setLoadingBoards(true)

    window.app.board.read().then((data) => {
      setBoards(data)

      if (cacheBoard) {
        setCurrentBoard(cacheBoard)
      } else {
        const defaultBoard = find(boards, {default: true})
        if (defaultBoard && defaultBoard.id) {
          setCurrentBoard(defaultBoard.id)
        } else {
          const firstBoard = first(data)
          if (firstBoard && firstBoard.id) {
            setCurrentBoard(firstBoard.id)
          }
        }
      }
      setLoadingBoards(false)
    })
  }, [])

  useEffect(() => {
    setCacheBoard(currentBoard)
    setLoadingButtons(true)

    window.app.button.readForBoard({ id_board: currentBoard }).then((data) => {
      setButtons(data)
      setLoadingButtons(false)
    })
  }, [currentBoard])

  const board = useMemo(() => find(boards, { id: currentBoard }), [currentBoard, boards])

  const onSubmit = async (data) => {
    window.app.board.update({ ...SAMPLE_BOARD, ...data }).then((result) => {
      const refresh = remove(boards, (i) => i.id !== result.id)
      setBoards([
        ...refresh,
        result
      ])
      setOpen(false)
    })
    return true
  }

  const onReset = () => {
    setOpen(false)
  }

  const onClickAdd = () => {
    window.app.board.create({ ...SAMPLE_BOARD }).then((result) => {
      setBoards([
        ...boards,
        result
      ])
      setCurrentBoard(result.id)
    })
  }
  const onClickEdit = () => {
    setOpen(true)
  }

  if (loadingBoards || loadingButtons) {
    return <Spinner />
  }

  if (!board) {
    return null
  }

  return (
    <>
      <ModalBoardSettings open={open} setOpen={setOpen} onSubmit={onSubmit} onReset={onReset} current={board} />
      <div className='app-content grid-manager'>
        <div className='grid-heading'>
          <h3 className="bp3-heading">
            <Popover
              content={(
                <Menu>
                  {boards.map(i => {
                    const innerOnClick = () => {
                      setCurrentBoard(i.id)
                    }
                    return <MenuItem key={i.id} active={i.id === currentBoard } onClick={innerOnClick} text={i.name} />
                  })}
                  <Menu.Divider />
                  <MenuItem onClick={onClickAdd} icon="add" text="Add" />
                  <MenuItem onClick={onClickEdit} icon="edit" text="Edit" />
                </Menu>
              )}
              captureDismiss
              position={Position.BOTTOM}
              className='ml-8'
            >
              <div className='flex'>
                {intl.get('app.grid.board_label')} {board.name}
                <Icon style={{ cursor: "pointer" }} className='mt-6 ml-8' icon="chevron-down" />
              </div>
            </Popover>
          </h3>
        </div>
        <div className='grid-main'>
          <Grid
            width={board.width}
            height={board.height}
          />
          <Preview
            boardId={board.id}
            width={board.width}
            height={board.height}
            buttons={buttons}
            setButtons={setButtons}
          />
        </div>
      </div>
    </>
  )
}

export default GridManager
