import React, { useState, useEffect } from 'react';
import IdeaList from '../components/IdeaList';
import IdeaForm from '../components/IdeaForm';

const Home = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [ideas, setIdeas] = useState([]);

    // const loggedIn = Auth.loggedIn();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/users');
            const data = await res.json();
            //Sort the array by createdAt property ordered by descending values.
            const orderData = data.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1);
            setIdeas(orderData);
            setIsLoaded(true);
        }
        fetchData();
    }, []);

    return (
        <main>
            <div className="flex-row justify-space-between">
                <div className="col-12 mb-3">
                    <IdeaForm />
                </div>
                <div className={`col-12 mb-3 `}>
                    {!isLoaded ? (
                        <div>Loading...</div>
                    ) : (
                        <IdeaList ideas={ideas} title="Too many ideas? Dump 'em off..." />
                    )}
                </div>
            </div>
        </main>
    );
};

export default Home;