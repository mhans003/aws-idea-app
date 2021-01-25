import React from 'react';

const SingleIdea = props => {
    return (
        <div>
            <div className="card mb-3">
                <p className="card-header">
                    <span style={{ fontWeight: 700 }} className="text-light">
                        Username
                    </span>{' '}
                    idea on createdAt
                </p>
                <div className="card-body">
                    <p>Idea Text</p>
                </div>
            </div>
        </div>
    );
};

export default SingleIdea;