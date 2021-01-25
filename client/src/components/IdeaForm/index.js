import React, { useState } from 'react';

const IdeaForm = () => {
  //Set up state for an idea and the username of the poster.
  const [formState, setFormState] = useState({ username: '', idea: '' });
  const [characterCount, setCharacterCount] = useState(0);

  //Update state based on form input changes.
  const handleChange = event => {
    if (event.target.value.length <= 280) {
      setFormState({ ...formState, [event.target.name]: event.target.value });
      setCharacterCount(event.target.value.length);
    }
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
      <p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
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
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></input>
        <textarea
          placeholder="Here's a new idea..."
          name="idea"
          value={formState.idea}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default IdeaForm;