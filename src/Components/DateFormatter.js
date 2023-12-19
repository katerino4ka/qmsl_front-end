import { Typography } from "@mui/material";

function DateFormatter({ date }) {
    const formatDate = () => {
        const dateObj = new Date(date);
        return `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()} ${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`;
    }
    return (
        <Typography variant="h8" sx={{color:'grey'}}>{formatDate()}</Typography>
    )

}
export default DateFormatter;