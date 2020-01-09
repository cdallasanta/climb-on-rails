import { gql } from 'apollo-boost';

const getPreuseInspectionQuery = gql`
query($elementId: Int!, $date: String!) {
  element(id:$elementId) {
    id
    setupElementInstructions
    setupEquipmentInstructions
    setupEnvironmentInstructions
    takedownElementInstructions
    takedownEquipmentInstructions
    takedownEnvironmentInstructions
    preuseInspection(date:$date) {
      id
      setupAttributes: setup{
        id
        users {
          fullname
        }
        isComplete
        sectionsAttributes: sections{
          id
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
        id
        users {
          fullname
        }
        climbsAttributes: climbs {
          id
          block1
          block2
          block3
          block4
          rope {
            id
            identifier
          }
        }
        sectionsAttributes: sections{
          id
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
query($elementId: Int!, $date: String!) {
  element(id:$elementId) {
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
        id
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

const savePeriodicMutation = gql`
mutation($data: PeriodicInput!) {
  savePeriodic(data: $data){
    status
    errors
    periodicInspection{
      id
      users {
        fullname
      }
      sectionsAttributes: sections{
        id
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

const savePreuseMutation = gql`
mutation($data: PreuseInput!) {
  savePreuse(data: $data){
    status
    errors
    preuseInspection {
      id
      setupAttributes: setup{
        id
        users {
          fullname
        }
        isComplete
        sectionsAttributes: sections{
          id
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
        id
        users {
          fullname
        }
        climbsAttributes: climbs {
          id
          block1
          block2
          block3
          block4
          rope {
            id
            identifier
          }
        }
        sectionsAttributes: sections{
          id
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

export { getPreuseInspectionQuery, getPeriodicInspectionQuery, savePeriodicMutation, savePreuseMutation }