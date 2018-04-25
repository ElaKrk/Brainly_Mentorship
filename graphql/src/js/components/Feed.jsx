import React from 'react';
import { Query } from 'react-apollo';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import feed from "../Queries/query.gql"

console.log({...feed.feed.loc.source}.body);

const query = gql({...feed.feed.loc.source}.body);
//   query feed($subjectIds: [Int], $before: ID, $first: Int) {
//     feed(subjectIds: $subjectIds, before: $before, first: $first) {
//       edges{
//         node {
//           ... on Question {
//             id
//             content
//             subject {
//               id
//               name
//               databaseId
//             }
//             author {
//               rank {
//                 name
//               }
//             }
//           }
//         }
//       }
//       pageInfo {
//         endCursor
//         hasNextPage
//       }
//     }
//   }
// `;

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSubjectIds: null,
    };
  }

  render() {
    return (
      <React.Fragment>
      <Query query={query} variables={{ first: 500 }}>
      {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>{JSON.stringify(error)} Error</p>;

          const questions = data.feed.edges;
          const subjectNameArray = [];
          const options = questions.map(node => {
            const subjectName = node.node.subject.name
            if (subjectNameArray.indexOf(subjectName) < 0) {
              subjectNameArray.push(subjectName);
              return (
                <option value={subjectName} key={node.node.subject.id}>{subjectName}
                </option>
              )
            }
          })
          return (
            <React.Fragment>
              <select onChange={(event) => {
                const subjectName = event.target.value;
                data.feed.edges.map(node => {
                  if (node.node.subject.name === subjectName) {
                    this.setState((prevState) => {
                      return {selectedSubjectIds: node.node.subject.databaseId};
                    })
                  }
                })
              }}>
                {options}
              </select>
            </React.Fragment>
          )
        }}
      </Query>
      <Query query={query} variables={{ subjectIds: this.state.selectedSubjectIds }}>
        {({ loading, error, data, fetchMore }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>{JSON.stringify(error)} Error</p>;

          const questions = data.feed.edges;
          const questionContent = questions.map(node => {
            console.log(node.node.subject.name)
            return (
              <div className="container">
                <div className="image-round" key={node.node.author.id}>{node.node.author.rank.name}
                </div>
                <div className="content" key={node.node.id}>
                  {node.node.content}
                </div>
              </div>
            )
          })

          return (
            <React.Fragment>
              <div>
                {questionContent}
              </div>
              <div>
                <button onClick={() => {
                  if (data.feed.pageInfo.hasNextPage) {
                    fetchMore({
                      variables: {
                        before: data.feed.pageInfo.endCursor
                      },
                      updateQuery: (prevStore, newData) => {
                        const { feed } = newData.fetchMoreResult;
                        return {
                          ...prevStore,
                          feed: {
                            ...prevStore.feed,
                            edges: [...prevStore.feed.edges, ...feed.edges],
                            pageInfo: { ...prevStore.feed.pageInfo, ...feed.pageInfo }
                          }
                        }
                      }
                    })
                  }
                }}>
                  Doładuj wiecej
                </button>
              </div>
            </React.Fragment>
          )
        }}
      </Query>
      </React.Fragment>
    )
  }
}

export default Feed;