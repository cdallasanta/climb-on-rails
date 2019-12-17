const initSite = {
  site: {
    elements: [],
    site_contact: {}
  },
  loggedIn: false,
  currentUser: {}
}

export default function siteReducer(state = initSite, action){
  switch(action.type){
    case "SET_SITE":
      return {
        ...state,
        site: action.payload
      };
    case "LOGIN":
      return {
        ...state,
        loggedIn: true,
        currentUser: action.payload
      };
    case "LOGOUT":
      return {
        ...state,
        loggedIn: false,
        currentUser: {}
      };
    default:
      return state;
  }
}