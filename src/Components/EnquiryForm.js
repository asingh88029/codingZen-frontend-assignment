import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

export default function EnquiryForm() {

    const [fullname, setFullname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');


    const [buttonColor, setButtonColor] = React.useState("info");
    const [buttonStatus, setButtonStatus] = React.useState("Send");


    const sendEnquiry = async () => {

        const dataToSend = {
            "full_name": fullname,
            "email": email,
            "message": message
        }

        const response = await fetch(`http://localhost:8081/enquiry`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        }).then(response => response.json());

        if (response.success === true) {
            setButtonColor("success");
            setButtonStatus("Success!");
        } else {
            setButtonColor("error");
            setButtonStatus("Error!");
        }


    }

    return (
        <Box
            mt={10}
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <Typography variant='h5'>Send your enquiry!</Typography>
                <TextField onChange={(event) => { setFullname(event.target.value) }} value={fullname} id="standard-basic" label="Full Name" variant="standard" />
                <br></br>
                <TextField type="email" onChange={(event) => { setEmail(event.target.value) }} value={email} id="standard-basic" label="Email Id" variant="standard" />
                <br></br>
                <TextField
                    onChange={(event) => { setMessage(event.target.value) }}
                    value={message}
                    id="standard-textarea"
                    label="Message"
                    placeholder="Placeholder"
                    multiline
                    variant="standard"
                />
                <br></br>
                <Button onClick={sendEnquiry} color={buttonColor} variant="outlined">{buttonStatus}</Button>
            </div>
        </Box>
    );
}