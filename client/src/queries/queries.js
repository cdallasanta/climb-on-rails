import {gql} from 'apollo-boost';


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
query {
  site {
      status
  }
}
`

export {getElementsQuery, signInMutation, siteStatusQuery}