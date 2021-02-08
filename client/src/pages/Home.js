import React, { useState, useEffect } from 'react';
import IdeaList from '../components/IdeaList';
import IdeaForm from '../components/IdeaForm';

const Home = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [ideas, setIdeas] = useState([]);

    // const loggedIn = Auth.loggedIn();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/users');
                const jsonData = await res.json();
                //Sort the array by createdAt property ordered by descending values.
                const data = jsonData.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1);
                setIdeas([...data]);
                //Confirm that we are no longer loading the page.
                setIsLoaded(true);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [ideas]);

    return (
        <main>
            <div className="flex-row justify-space-between">
                <div className="col-12 mb-3">
                    <IdeaForm />
                </div>
                <div className={`col-12 my-5 `}>
                    {!isLoaded ? (
                        <div>Loading...</div>
                    ) : (
                        <IdeaList ideas={ideas}/>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Home;