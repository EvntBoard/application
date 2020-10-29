import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useIntl } from 'react-intl'

import M from '../../context/lang/messages/constants'

export default ({ label, input, meta: { touched, error }, acceptedFormat = [] }) => {
  const intl = useIntl()
  const [file, setFile] = useState(null)

  const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop: acceptedFiles => {
      input.onChange( acceptedFiles[0].path)
      setFile(URL.createObjectURL(acceptedFiles[0]))
  } })

  useEffect(() => () => {
    URL.revokeObjectURL(file)
  }, [file]);

  return (
    <div className='flex'>
      <div>
        <label className='block mb-1' htmlFor="color-picker">
          { label }
        </label>
        <div {...getRootProps()}>
          <input
            {...getInputProps()}
            accept={acceptedFormat.join(', ')}
          />
          {
            isDragActive ? <p>{intl.formatMessage({ id: M.FieldDropzoneDropHere })}</p> : <p>{intl.formatMessage({ id: M.FieldDropzoneDragOrClick })}</p>
          }
        </div>
      </div>
      <div>
        {file && (<img src={file} height={150} alt='preview' />)}
      </div>
    </div>
  )
}
