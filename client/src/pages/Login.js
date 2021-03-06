import React, { useState } from 'react';

const Login = props => {
    const [formState, setFormState] = useState({ email: '', password: '' });

    //Update state based on form input changes.
    const handleChange = event => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    //Handle submit.
    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            // Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }
        console.log("formstate", formState.email, formState.password)
        //Clear form values.
        setFormState({
            email: '',
            password: ''
        });
    };

    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-md-6">
                <div className="card">
                    <h4 className="card-header">Sign In</h4>
                    <div className="card-body">
                        <form onSubmit={handleFormSubmit}>
                            <input
                                className="form-input"
                                placeholder="Your email"
                                name="email"
                                type="email"
                                id="email"
                                value={formState.email}
                                onChange={handleChange}
                            />
                            <input
                                className="form-input"
                                placeholder="******"
                                name="password"
                                type="password"
                                id="password"
                                value={formState.password}
                                onChange={handleChange}
                            />
                            <button className="btn d-block w-100" type="submit">
                                Submit
                            </button>
                        </form>
                        {/* {error && <div>Login failed</div>} */}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;