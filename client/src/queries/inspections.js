import {gql} from 'apollo-boost';

const getPreuseInspectionQuery = gql`
query($elemId: Int!, $date: String!) {
  element(id:$elemId) {
    id
    setupElementInstructions
    setupEquipmentInstructions
    setupEnvironmentInstructions
    takedownElementInstructions
    takedownEquipmentInstructions
    takedownEnvironmentInstructions
    preuseInspection(date:$date) {
      setupAttributes: setup{
        users {
          fullname
        }
        isComplete
        sectionsAttributes: sections{
          title
          complete
          commentsAttributes: comments {
            id
            content
            user {
              fullname
            }
          }
        }
      }
      takedownAttributes: takedown{
        users {
          fullname
        }
        ropesAttributes: ropes {
          id
          identifier
          climbsAttributes: climbs {
              id
              block1
              block2
              block3
              block4
          }
        }
        sectionsAttributes: sections{
          title
          complete
          commentsAttributes: comments {
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
      sectionsAttributes: sections{
        title
        complete
        commentsAttributes: comments {
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