import React, {ChangeEvent} from 'react';
import {Box, TextField} from "@mui/material";
import {debounce} from "lodash"

interface SearchProps {
    onSearch: (search: string) => void
    defaultValue: string
}

const Search = ({onSearch, defaultValue}: SearchProps) => {
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value)
    }

    return (
        <Box>
            <TextField id="standard-search" defaultValue={defaultValue} variant="standard" label="Search field" type="search" onChange={debounce(handleSearch, 750)} />
        </Box>
    );
};

export default Search;
