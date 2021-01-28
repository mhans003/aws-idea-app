import React from 'react';
import { Link } from 'react-router-dom';

const IdeaList = ({ ideas, title }) => {
    //If there are no ideas, return h3.
    if (!ideas.length) {
        return <h3>No Ideas Yet</h3>;
    }

    //Otherwise, render the list of ideas posted.
    return (
        <div>
            <h3>{title} <i className='fas fa-dumpster'></i></h3>
            {ideas &&
            ideas.map((idea) => (
                <div key={idea.createdAt} className="card mb-3">
                    <p className="card-header">
                        <Link
                            to={`/profile/${idea.username}`}
                            style={{ fontWeight: 700 }}
                            className="text-light"
                        >
                            {idea.username}'s idea on {new Date(parseInt(idea.createdAt)).toString()}
                        </Link>{' '}
                    </p>
                    <p className="px-2">
                        {idea.idea}
                    </p>
                    {idea.image &&
                        <div className="px-2">
                            <img
                                className="mt-3 idea-img"
                                src={idea.image} alt="Image for Idea"
                            />
                        </div>
                    }
                </div>
            ))}
        </div>
    );
};

export default IdeaList;