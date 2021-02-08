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
            {title &&
                <h3 className="py-2">{title}</h3>}
            {ideas &&
            ideas.map((idea) => (
                <div key={idea.createdAt} className="card mb-3">
                    <div className="card-header">
                        <Link
                            to={`/profile/${idea.username}`}
                            style={{ fontWeight: 700 }}
                            className="text-light"
                        >
                            <div className="idea-heading flex-row justify-space-between">
                                <span className="idea-heading-name">{idea.username + " "}</span>
                                <span className="idea-heading-date">         
                                    <i>
                                        {
                                            new Date(
                                                parseInt(idea.createdAt)
                                            ).toLocaleString().split(',')[0]
                                        }
                                    </i>
                                </span>
                            </div>
                        </Link>{' '}
                    </div>
                    <p className="px-2 idea-text">
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