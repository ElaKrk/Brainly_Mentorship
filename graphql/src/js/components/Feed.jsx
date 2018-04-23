import React from 'react';
import { Query } from 'react-apollo';
import ApolloClient from "apollo-boost";

import gql from "graphql-tag";

const query = gql`  
  query feed($subjectIds: [Int]) {
    feed(subjectIds: $subjectIds) {
      edges {
        node {
          ... on Question {
            id, content, subject {
              id, name, databaseId
            }
          }
        }
      }
    }
  }
`;
const Feed = () => {
  const first = 1;

  return (
    <Query query={query} variables={{ subjectIds: this.state.selectedSubjectIds }} errorPolicy="all">
      {({ loading, error, data, fetchMore}) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{JSON.stringify(error)} Error :(</p>;

        return (
          <React.Fragment>
          <div>
            {JSON.stringify(data)}
          </div>
          <div>
            <button onClick={() => fetchMore({
              variables: {
                before: data.pageInfo.endCursor
              },
              updateQuery: (prevStore, newData) => {
                const {feed} = newData.fetchMoreResult;

                return {
                  ...prevStore, 
                  feed: {
                    ...prevStore.feed,
                    edges: [...prevStore.feed.edges, ...feed.edges]
                  }
                }
              }})
            }>
              Doładuj wiecej
            </button>
          </div>
          </React.Fragment>

        )
      }}
    </Query>
  );
}
// class Feed extends React.Component {
//     state = {data : {}}

//     componentDidMount() {
//         this.fetchData();
//     }

//     onSuccess(data) {
//         this.setState(() => ({data}))
//     }

//     fetchData = () => {
//        client.query({query})
//             .then(data => this.onSuccess(data));
//     };

//     render() {
//         return (
//             <div>
//                 {JSON.stringify(this.state.data)}
//             </div>
//         )
//     }
// }

export default Feed;