import gql from "graphql-tag";

const getElementsQuery = gql`
  query {
    elements{
      id
      name
    }
  }
`

const signInMutation = gql`
  mutation($email: String!, $password: String!) {
    signInUser(email:$email, password: $password){
      token
      user {
        id
        fullname
      }
    }
  }
`

const siteStatusQuery = gql`
  query($date: String!) {
    site {
      time
      status(date: $date) {
        id
        name
        setup
        takedown
      }
    }
  }
`

export { getElementsQuery, signInMutation, siteStatusQuery }