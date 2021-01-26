import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import IdeaForm from '../components/IdeaForm';
import IdeaList from '../components/IdeaList';

const AWS = require("aws-sdk");
const awsConfig = {
    region: "us-east-2",
    endpoint: "http://localhost:8000",
};

AWS.config.update(awsConfig);

const Profile = props => {
    //Acess the username from the URL parameter.
    const { username: userParam } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [ideas, setIdeas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/users/${userParam}`);
                const data = await res.json();
                console.log(data);
                setIdeas([...data]);
                //Confirm that we are no longer loading the page.
                setIsLoaded(true);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    //When the userParam changes, we know we want to get a different unique set of ideas (different user).
    }, [userParam]);

    return (
        <div>
            <div className="flex-row mb-3">
                <h2 className="bg-dark text-secondary p-3 display-inline-block">
                    Viewing {userParam ? `${userParam}'s` : 'your'} profile.
                </h2>
            </div>

            <div className="flex-row justify-space-between mb-3">
                <div className="col-12 mb-3 col-lg-8">
                {!isLoaded ? (
                        <div>Loading...</div>
                    ) : (
                        <IdeaList ideas={ideas} title={`${userParam}'s ideas...`}/>
                    )}
                </div>
            </div>
            <div className="mb-3"> <IdeaForm name={userParam} /></div>
        </div>
    );
};

export default Profile;


