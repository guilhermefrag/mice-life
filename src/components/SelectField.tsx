import React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type MenuItemProps = {
    id: number;
    value: string;
};

interface ISelectFieldProps {
    data: MenuItemProps[];
    label: string;
}

function SelectField({ data, label }: ISelectFieldProps) {
    const [value, setValue] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
    };

    return (
        <Select value={value} onChange={handleChange} label={label}>
            {data.map((item: MenuItemProps) => (
                <MenuItem key={item.id} value={item.id}>
                    {item.value}
                </MenuItem>
            ))}
        </Select>
    );
}

export default SelectField;
