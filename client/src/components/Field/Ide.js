import React from 'react'
import AceEditor from 'react-ace'

import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'

const FieldIde = ({ label, placeholder, input, height, width }) => {
  const id = `ide-${Math.random()}`

  const onChange = (data) => {
    input.onChange(data)
  }

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <AceEditor
        placeholder={placeholder}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
        wrapEnabled
        height={height || '500px'}
        width={width || '100%'}
        value={input.value}
        mode="javascript"
        theme="monokai"
        onChange={onChange}
        name={id}
        highlightActiveLine={true}
        editorProps={{
          $blockScrolling: true
        }}
      />
    </div>
  )
}

export default FieldIde
