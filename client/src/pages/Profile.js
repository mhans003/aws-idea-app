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
    const { username: userParam } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [ideas, setIdeas] = useState([{
        username: userParam,
        createdAt: '', 
        idea: ''
    }]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/users/${userParam}`);
            const data = await res.json();
            //Sort the array by createdAt property ordered by descending values.
            // const orderData = data.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1);
            console.log(data);
            setIdeas(data);
            setIsLoaded(true);
        }
        fetchData();
    }, []);

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
                        <IdeaList ideas={ideas} title={`${userParam}'s ideas...`} />
                    )}
                </div>
            </div>
            <div className="mb-3"> <IdeaForm name={userParam} /></div>
        </div>
    );
};

export default Profile;


