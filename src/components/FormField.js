import React from 'react';
import TextField from "@material-ui/core/TextField";

export const FormField = ({label, type, path, onChange, value, limit, id, ticketType}) => {
console.log(value, type)
  return <TextField
    id="outlined-basic"
    label={label}
    variant="outlined"
    value={value}
    onChange={(e) => ticketType ? onChange(path, id, e.target.value) : onChange(path, e.target.value)}
    helperText={limit ? `(${value.length}/${limit})` : ''}
    fullWidth
    type={type}
    style={{marginBottom: 12}}
  />;
}
