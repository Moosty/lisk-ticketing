import React, { useEffect, useState } from 'react';
import TextField from "@material-ui/core/TextField";

export const FormField = ({className, label, type, variant, path, onChange, changeError, errors, value, limit, id, ticketType, min, numberType, disabled = false}) => {

  const [error, setError] = useState(null);

  const changeValue = (e) => {
    if (ticketType) {
      onChange(path, id, e.target.value);
    } else {
      onChange(path, e.target.value);
    }
  }

  useEffect(() => {
    if (type === 'text') {
      if (min && value?.length < min && value?.length > 0) {
        setError(`${label} requires an minimum length of ${min}`);
        changeError([...errors, path])
      } else if (limit && value?.length > limit) {
        setError(`${label} is to long it should be max ${limit} characters long`);
        changeError([...errors, path])
      } else if (value?.length === 0) {
        console.log(123123, [...errors, path])
        setError(null);
        changeError([...errors, path])
      } else {
        setError(null);
        changeError(errors?.filter(e => e !== path))
      }
    } else if (type === 'number') {
      const integerOnly = /^\d+$/;
      const isFloat = /^[0-9,.]*$/;
      if (numberType) {
        if (numberType === "float" && !isFloat.test(value)) {
          setError(`${label} only allows numbers and a comma`);
          changeError([...errors, path])
        } else if (numberType === "integer" && !integerOnly.test(value)) {
          setError(`${label} requires to be an integer`);
          changeError([...errors, path])
        } else {
          setError(null);
          changeError(errors?.filter(e => e !== path))
        }
      }
    } else if (type === "date") {
      if (value?.length === 0) {
        setError("This field is required");
        changeError([...errors, path])
      } else {
        setError(null);
        changeError(errors?.filter(e => e !== path))
      }
    } else if (type === "time") {
      if (value?.length === 0) {
        setError("This field is required");
        changeError([...errors, path])
      } else {
        setError(null);
        changeError(errors?.filter(e => e !== path))
      }
    } else if (type === "checkbox") {

    }
  }, [value]);

  return <TextField
    className={className ? className : "bg-white rounded"}
    id="outlined-basic"
    label={label}
    variant={variant ? `${variant}` : "outlined"}
    value={value}
    onChange={(e) => changeValue(e)}
    helperText={error ? error : limit ? `(${value.length}/${limit})` : ''}
    fullWidth
    error={!!error}
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
