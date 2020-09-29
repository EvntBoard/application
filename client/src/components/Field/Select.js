import React, {useMemo} from 'react'
import { Button, MenuItem, Label } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { find } from "lodash";

const filter = (query, item) => {
  return item.label.toLowerCase().indexOf(query.toLowerCase()) >= 0
}

const render = (item, { handleClick, modifiers }) => {
  if (!modifiers.matchesPredicate) {
    return null
  }

  if (item.label && item.value) {
    return (
      <MenuItem
        active={modifiers.active}
        key={item.value}
        label={item.label}
        onClick={handleClick}
        text={item.label}
      />
    )
  }
}

export default ({ label, placeholder, input, meta: { touched, error }, options }) => {
  const innerOnChange = ({ value }) => {
    input.onChange(value)
  }

  const currentItem = useMemo(() => {
    if (input.value) {
      const item = find(options, {value: input.value})
      if (item && item.label) {
        return item.label
      }
    }
    return 'Selectionnez quelque chose !'
  }, [options, input.value])

  return (
    <Label>
      {label}
      <Select
        fill
        label={label}
        placeholder={placeholder}
        items={options}
        itemPredicate={filter}
        itemRenderer={render}
        onItemSelect={innerOnChange}
      >
        <Button text={currentItem} rightIcon="double-caret-vertical" />
      </Select>
    </Label>
  )
}
