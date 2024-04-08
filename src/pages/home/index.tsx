import {Box} from "@mui/material";
import {TableComponent} from "../../components/table-component/TableComponent";

const Home = () => {
    return (
        <Box sx={{padding: 6}}>
            <Box sx={{marginTop:4}}>
                <TableComponent/>
            </Box>
        </Box>
    )
}

export default Home
