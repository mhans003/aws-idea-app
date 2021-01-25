import gql from 'graphql-tag';

export const QUERY_IDEAS = gql`
  query ideas($username: String) {
    ideas(username: $username) {
      _id
      ideaText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;