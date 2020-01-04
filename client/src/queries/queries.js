import {gql} from 'apollo-boost';


const getElementsQuery = gql`
  query {
    elements(siteId:1){
      id
      name
    }
  }
`

const signInMutation = gql`
  mutation {
    signInUser(email:"", password: ""){
      token
      user {
        id
        fullname
      }
    }
  }
`
export {getElementsQuery, signInMutation}