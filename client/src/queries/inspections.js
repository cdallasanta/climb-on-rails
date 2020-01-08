import {gql} from 'apollo-boost';

const getPreuseInspectionQuery = gql`
query($elemId: Int!, $date: String) {
  element(id:$elemId) {
    id
    setupElementInstructions
    setupEquipmentInstructions
    setupEnvironmentInstructions
    takedownElementInstructions
    takedownEquipmentInstructions
    takedownEnvironmentInstructions
    preuseInspection(date:$date) {
      setup{
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
      takedown{
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

export { getPreuseInspectionQuery, getPeriodicInspectionQuery }