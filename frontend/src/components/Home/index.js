import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ReactJson from 'react-json-view';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

import './home.scss';

function Home() {
    const [category, setCategory] = useState("");
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState({});

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
        const selectedCategory = document.getElementById("category").value;
        if (selectedCategory.length > 0) {
            setCategory(selectedCategory);
        } else {
            setCategory('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formdata = new FormData();
        formdata.append("image", file);
        
        const requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        let path = '';
        if(category === 'toonify_image') {
            path = '/toonifyImage'
        } else {
            path = '/nsfwDetector'
        }

        fetch(`https://toonify.partypalace-stage.in/api${path}`, requestOptions)
          .then(response => response.json())
          .then(result => {
              if(result.status) {
                setResponse(result);
              } else {
                setResponse({ message: result.message.message, status: result.status })
              }
          })
          .catch(error => console.log('error', error));
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
                    >
                        <form onSubmit={(e) => handleSubmit(e)}>
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
                        <label>Response from API</label>
                        <div className="ouput">
                            <ReactJson src={response} theme="monokai" style={{ width: '650px' }} />
                        </div>
                    </div>
                </Grid>
            </Container>
        </>
    );
}

export default Home;