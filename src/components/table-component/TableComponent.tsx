import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useSearch} from "../../handlers/useSearch";
import {Box, FormControl, InputLabel, Link, MenuItem, Pagination, PaginationItem, Select, Stack} from "@mui/material";
import React, {useEffect, useState} from "react";
import Search from "../search/Search";
import {useSearchParams} from "react-router-dom";

export const TableComponent = () => {
    const [searchParams] = useSearchParams()
    const [year, setYear] = useState<number | undefined>(Number(searchParams.get('year')))
    const [type, setType] = useState<'movie' | 'series' | 'episode' | undefined>(searchParams.get('type') as any)
    const [search, setSearch] = useState(searchParams.get('search')?.toString())
    const [page, setPage] = useState(Number(searchParams.get('page')))
    const {data, isLoading} = useSearch({search, page, year, type});

    const totalPages: number = Math.ceil((data?.totalResults || 0) / 10);

    useEffect(() => {
        const url = new URL(window.location.protocol + '//' + window.location.host + window.location.pathname);
        if (year) {
            url.searchParams.set('year', year.toString())
        }
        if (type) {
            url.searchParams.set('type', type.toString())
        }
        if (search) {
            url.searchParams.set('search', search)
        }
        if (page) {
            url.searchParams.set('page', page.toString())
        }
        window.history.pushState({path: url.toString()}, '', url.toString())
    }, [year, search, type, page])

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Poster</TableCell>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">Type</TableCell>
                            <TableCell align="right">Year</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>
                                <Search defaultValue={search ?? ''} onSearch={(_search) => {
                                    setSearch(_search)
                                    setPage(1)
                                }}/>
                            </TableCell>
                            <TableCell align={"left"}>
                                <FormControl style={{width:200}}>
                                    <InputLabel id="type">Type</InputLabel>
                                    <Select
                                        labelId="type"
                                        value={type}
                                        label="Type"
                                        onChange={(e) => {
                                            setType(e.target.value as any)
                                            setPage(1);
                                        }}
                                    >
                                        <MenuItem value={undefined}>Not Specified</MenuItem>
                                        <MenuItem value="movie">Movie</MenuItem>
                                        <MenuItem value="series">TV Series</MenuItem>
                                        <MenuItem value="episode">Episode</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align={"right"}>
                                <FormControl style={{width:200}}>
                                    <InputLabel id="year">Year</InputLabel>
                                    <Select
                                        labelId="year"
                                        value={year}
                                        label="Year"
                                        onChange={(e) => {
                                            setYear(e.target.value ? Number(e.target.value) : undefined)
                                            setPage(1);
                                        }}
                                    >
                                        <MenuItem value={undefined}>Not Specified</MenuItem>
                                        {Array.from({length: 100}).map((_, index) => {
                                            const date = new Date();
                                            date.setFullYear(date.getFullYear() - index)
                                            const targetYear = date.getFullYear()
                                            return <MenuItem value={targetYear} key={targetYear}>{targetYear}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.Search?.map(movie => (
                            <TableRow key={movie.imdbID}>
                                <TableCell><img alt={movie.Title} height={100}
                                                src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : '/nophoto.jpg'}/></TableCell>
                                <TableCell align="left">
                                    <Link sx={{textDecoration: 'none', color: '#9c27b0'}} href={`/pages/detail/${movie.imdbID}`}>{movie.Title}</Link>
                                </TableCell>
                                <TableCell align="left">{movie.Type}</TableCell>
                                <TableCell align="right">{movie.Year}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack sx={{display: "flex", alignItems: "center", marginTop: 2}}>
                <Pagination
                    page={page}
                    count={totalPages}
                    color="secondary"
                    onChange={(_, _page) => setPage(_page)}
                    renderItem={(item) => (
                        <PaginationItem
                            {...item}
                        />
                    )}
                />
            </Stack>
        </Box>
    )
}
