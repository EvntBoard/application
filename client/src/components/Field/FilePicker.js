import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

export default ({ label, input, meta: { touched, error }, acceptedFormat = [] }) => {
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
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </div>
      </div>
      <div>
        {file && (<img src={file} height={150} alt='preview' />)}
      </div>
    </div>
  )
}
