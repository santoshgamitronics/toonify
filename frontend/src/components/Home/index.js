import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import './home.scss';

function Home() {
    const [category, setCategory] = useState("");
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleFileInput = (event) => {
        setFile(event.target.files[0]);
    };

    const clearFileProvided = () => {
        if (file !== null) {
            document.getElementById('uploadedImageFile').value = '';
            setFile(null);
        }
    };

    const selectCategory = () => {
        setResponse({});
        const selectedCategory = document.getElementById("category").value;
        if (selectedCategory.length > 0) {
            setCategory(selectedCategory);
        } else {
            setCategory('');
        }
    };

    const getReponseForEachCategory = () => {
        if (response.status) {
            if (category === 'toonify_image' && response.data) {
                return <img src={response.data.output_url} alt="toonified" width="230px" style={{ padding: '10px' }}/>
            } else if (category === 'nsfw_detector' && response.data) {
                return getNsfwDetectedResult();
            } else {
                return 'No content found';
            }
        } else {
            if (response.status === 0 && category !== '') {
                return 'Issue while fetching the content, please refresh the page & try again...';
            } else {
                return 'Response viewer';
            }
        }
    }

    const handleSubmit = (e) => {

        const formdata = new FormData();
        formdata.append("image", file);
        setSubmitted(current => current = true);

        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        let path = '';
        if (category === 'toonify_image') {
            path = '/toonifyImage'
        } else {
            path = '/nsfwDetector'
        }

        fetch(`https://toonify.partypalace-stage.in/api${path}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setSubmitted(false);
                if (result.status) {
                    setResponse(result);
                } else {
                    setResponse({ message: result.message.message, status: result.status })
                }
            })
            .catch(error => { setSubmitted(false); console.log('error', error) });
    }

    const getNsfwDetectedResult = () => {
        if (response.data.output.detections.length > 0) {
            return (<p className="nsfwContent">
                <strong>{'NSFW content found.'}</strong>
                <span style={{ padding: '25px' }}>
                    <label style={{ fontWeight: '600' }}>{'Response Json:'}</label>
                    {JSON.stringify(response.data.output)}
                </span>
            </p>)
        } else {
            return 'No NSFW content found.'
        }
    }

    return (
        <>
            <Container component="main">
                <Grid container style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    alignItems: "center"
                }}>
                    <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                        marginBottom="20px"
                    >
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e) }}>
                            <div className="fileupload">
                                <label className="required">{'Please upload an image'}</label>
                                <input
                                    className="file"
                                    id="uploadedImageFile" type="file"
                                    onChange={handleFileInput}
                                    accept="image/*"
                                />
                                <span style={{ display: 'inline-flex', cursor: 'pointer' }} onClick={() => clearFileProvided()}>
                                    <HighlightOffRoundedIcon />
                                </span>
                            </div>
                            <div className="category-selector">
                                <label htmlFor="category" className="required">{'Choose a category'}</label>
                                <select
                                    onChange={() => selectCategory()}
                                    name="category"
                                    id="category"
                                    style={{
                                        width: "305px",
                                        height: "30px"
                                    }}>
                                    <option value=""></option>
                                    <option value="toonify_image">Toonify image</option>
                                    <option value="nsfw_detector">Detect image for nsfw</option>
                                </select>
                            </div>
                            <div style={{
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <button disabled={!(file !== null && !!category)} type="submit" className="btn btn-dark">Submit</button>
                            </div>
                        </form>
                    </Stack>
                    <div className="response">
                        <div className="output">
                            {submitted ? <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box> : getReponseForEachCategory()}
                        </div>
                    </div>
                </Grid>
            </Container>
        </>
    );
}

export default Home;