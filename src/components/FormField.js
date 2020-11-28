import React from 'react';
import TextField from "@material-ui/core/TextField";

export const FormField = ({className, label, type, variant, path, onChange, value, limit, id, ticketType, disabled = false}) => {
  return <TextField
    className={className ? className : "bg-white rounded"}
    id="outlined-basic"
    label={label}
    variant={variant ? `${variant}` : "outlined"}
    value={value}
    onChange={(e) => ticketType ? onChange(path, id, e.target.value) : onChange(path, e.target.value)}
    helperText={limit ? `(${value.length}/${limit})` : ''}
    fullWidth
    type={type}
    style={{marginBottom: 12}}
    disabled={disabled}
    inputProps={{
      autocomplete: 'new-password',
      form: {
        autocomplete: 'off',
      },
    }}  />;
}
