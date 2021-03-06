import React, { useState, useRef, useEffect } from 'react';

const IdeaForm = () => {
    //Set up state for an idea and the username of the poster.
    const [formState, setFormState] = useState({ username: '', idea: '' });
    const [characterCount, setCharacterCount] = useState(0);
    const [chosenPhrase, setChosenPhrase] = useState("");
    const fileInput = useRef(null);

    //Get random phrase for input field.
    let randomPhrases = [
        "Here's a new one...",
        "Hey, I got an idea...",
        "Just gonna dump this idea here...",
        "How's this for an idea...",
        "I'm gonna dump my idea right here...",
    ];

    useEffect(() => {
        setChosenPhrase(randomPhrases[Math.floor(Math.random() * randomPhrases.length)]);
    }, [])
    
    //Update state based on form input changes.
    const handleChange = event => {
        if (event.target.value.length <= 500) {
            setFormState({ ...formState, [event.target.name]: event.target.value });
            setCharacterCount(event.target.value.length);
        }
    };

    //Upload the image being uploaded.
    const handleImageUpload = event => {
        event.preventDefault();
        const data = new FormData();
        //Add the file currently selected to the data object created with the FormData class.
        //data will now hold 'image' as a name and the file as the value.
        data.append('image', fileInput.current.files[0]);
        //Send image file to endpoint with the postImage function
        const postImage = async () => {
            try {
                //Try sending the image to be uploaded.
                const res = await fetch('/api/image-upload', {
                    mode: 'cors',
                    method: 'POST',
                    body: data
                })
                if (!res.ok) throw new Error(res.statusText);

                //Wait for the image metadata to be returned back from a successful server call.
                const postResponse = await res.json();
                //Add the image URL (returned back in the Location property of the response) to the form state to be sent.
                //This will provide reference to the actual uploaded file in the s3 bucket.
                setFormState({...formState, image: postResponse.Location})
                
                return postResponse.Location;
            } catch (error) {
                console.log(error);
            }
        };
        postImage();
    };

    //Handle form submit.
    const handleFormSubmit = event => {
        event.preventDefault();
        //POST method with formState
        const postData = async () => {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formState)
            })
            const data = await res.json();
            console.log(data);
        }
        postData();
        //Clear form value and state.
        setFormState({ username: '', idea: '' });
        setCharacterCount(0);
    };

    return (
        <div>
            <p className={`m-0 ${characterCount === 500 ? 'text-error' : ''}`}>
                Dump Space Left: {characterCount}/500
                {/* {error && <span className="ml-2">Something went wrong...</span>} */}
            </p>
            <form
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <input
                    placeholder="Name"
                    name="username"
                    value={formState.username}
                    className="form-input col-12"
                    onChange={handleChange}
                ></input>
                <textarea
                    placeholder={chosenPhrase}
                    name="idea"
                    value={formState.idea}
                    className="form-input col-12"
                    onChange={handleChange}
                    rows="4"
                ></textarea>
                <label className="form-input col-12 p-1">
                    Include Image: 
                    <input
                        type="file"
                        ref={fileInput}
                        className="form-input p-2 my-3"
                    />
                    <div className="image-btn-wrapper">
                        <button 
                            className="btn upload-img-btn" 
                            onClick={handleImageUpload} 
                            type="submit"
                        >
                            Upload Image <i className="fad fa-camera-retro"></i>
                        </button>
                    </div>
                    
                </label>
                <button className="btn col-12 submit-btn" type="submit">
                    Submit <i className="fas fa-paper-plane"></i>
                </button>
            </form>
        </div>
    );
};

export default IdeaForm;