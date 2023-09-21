import React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SelectItems from '../types/SelectItems';
import { SelectProps } from '@mui/material';

interface ISelectFieldProps extends SelectProps {
    data: SelectItems[];
    label?: string;
}

function SelectField({ data, label }: ISelectFieldProps) {
    return (
        <Select label={label}>
            {data.map((item: SelectItems) => (
                <MenuItem key={item.id} value={item.id}>
                    {item.value}
                </MenuItem>
            ))}
        </Select>
    );
}

export default SelectField;
