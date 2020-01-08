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
query($date: String!) {
  site {
      status(date: $date) {
          id
          name
          setup
          takedown
      }
  }
}
`

const getPreuseInspectionQuery = gql`
query($elemId: Int!, $date: String) {
  element(id:$elemId) {
      preuseInspection(date:$date) {
          setup{
              sections{
                  complete
              }
          }
          takedown{
              sections {
                  complete
              }
          }
      }
  }
}
`

const getPeriodicInspectionQuery = gql`
query($elemId: Int!, $date: String!) {
  element(id:$elemId) {
    id
    periodicElementInstructions
    periodicEquipmentInstructions
    periodicEnvironmentInstructions
    periodicInspection(date:$date){
      id
      users {
        fullname
      }
      sections{
        title
        complete
        comments {
          id
          content
          user {
            fullname
          }
        }
      }
    }
  }
}
`

export {getElementsQuery, signInMutation, siteStatusQuery, getPreuseInspectionQuery, getPeriodicInspectionQuery}