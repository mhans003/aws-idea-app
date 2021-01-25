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
            <h3>{title}</h3>
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
                </div>
            ))}
        </div>
    );
};

export default IdeaList;