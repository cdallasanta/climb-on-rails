import React, {Component} from 'react';
import '../../stylesheets/periodic_inspections.scss';
import '../../stylesheets/inspection_forms.scss';
import Section from '../../components/inspections/section';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Query, Mutation } from 'react-apollo';
import { getPeriodicInspectionQuery, savePeriodicMutation } from '../../queries/inspections';
import { RouteComponentProps } from 'react-router';

interface State {
  id: number | null,
  date: Date,
  element: {
    elementInstructions: string,
    environmentInstructions: string,
    equipmentInstructions: string
  },
  elementId: number,
  users: User[],
  alertMessage: {message: string[], type: string},
  newComments: {
    Equipment: {content: string},
    Element: {content: string},
    Environment: {content: string}
  },
  changed: boolean,
  sectionsAttributes: Section[]
}

interface User {
  fullname: string
}

interface Section {
  id: number,
  title: string,
  complete: boolean,
  commentsAttributes: {
    id: number,
    content: string,
    user: {
      fullname: string;
    }
  }[]
}

interface NewSection {
  id: number,
  title: string,
  complete: boolean,
  commentsAttributes: {
    id: number | null,
    content: string
  }[]
}

interface QueryResponse {
  id: number;
  periodicInspection: {
    id: number,
    users: {fullname: string}[],
    sectionsAttributes: Section[]
  };
  periodicEnvironmentInstructions: string;
  periodicElementInstructions: string;
  periodicEquipmentInstructions: string;
}

interface MutationResponse {
  data: {
    savePeriodic: {
      status: string,
      errors: string[],
      periodicInspection: {
        id: number,
        users: User[],
        sectionsAttributes: Section[]
      }
    }
  }
}

interface MatchParams {
  element_id: string
}

class PeriodicForm extends Component<RouteComponentProps<MatchParams>, State> {
  state = {
    id: null,
    date: new Date(),
    element: {
      elementInstructions: "",
      environmentInstructions: "",
      equipmentInstructions: ""
    },
    elementId: parseInt(this.props.match.params.element_id),
    users: [] as User[],
    alertMessage: {message: [], type: ""},
    newComments: {
      Equipment: {content: ""},
      Element: {content: ""},
      Environment: {content: ""}
    },
    changed: false,
    sectionsAttributes: [] as Section[]
  }

  resetTextboxes = () => {
    this.setState({
      newComments: {
        Equipment: {content: ""},
        Element: {content: ""},
        Environment: {content: ""}
      }
    });
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if ((event.target.attributes as any).type.value === "textarea") {
      // changing comment
      const {name, value}: {name: string, value: string} = event.target;

      this.setState((state: State) => {
        const newComments = state.newComments;
        newComments[(name as "Equipment" | "Element" | "Environment")].content = value;
        return Object.assign({}, state, {newComments: newComments})
      });
    } else if ((event.target.attributes as any).type.value === "checkbox") {
      //changing checkbox
      const {name, checked}: {name: string, checked: boolean} = event.target;

      this.setState((state: State) => {
        const section: Section | undefined = state?.sectionsAttributes.find((s: Section) => s.title === name)
        if (section){
          section.complete = checked;
        }
        return state;
      });
    }
    this.setState({changed: true, alertMessage: {message: [], type: ""}});
  }

  handleDateChange = (date: Date) => {
    this.setState({date: date})
  }

  renderUpdatedBy = () => {
    if (this.state.users.length > 0) {
      return (
        <div className="updated-by form-group">
          <h3>Updated by:</h3>
          {this.state.users.map((user, i) => {
            return <React.Fragment key={i}>
              {user.fullname}<br/>
            </React.Fragment>
          })}
        </div>
      )
    }
  }

  gatherDataFromState = () => {
    const date = this.state.date
    const formattedDate = date.getDate()  + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
    const data = {
      id: this.state.id,
      elementId: this.state.elementId,
      date: formattedDate,
      sectionsAttributes: JSON.parse(JSON.stringify(this.state.sectionsAttributes))
    } // used JSON to deeply copy the state array - lodash is an alternative if I want to import it

    data.sectionsAttributes.forEach((section: NewSection) => {
      // remove user key, since graphql doesn't accept it
      // section.commentsAttributes?.forEach(comment => {
      //   delete comment.user;
      // })

      // add in new comments
      const matchedComment = this.state.newComments[(section.title as "Equipment" | "Element" | "Environment")];
      section.commentsAttributes?.push({
        id: null,
        content: matchedComment.content
      })
    });

    return data;
  }
// TODO: figure out typing of the mutation
  handleSubmit = (event: React.FormEvent<HTMLFormElement>, saveInspection: any) => {
    event.preventDefault();
    const data = this.gatherDataFromState();

    saveInspection({
      variables: {data: data}
    }).then(({data: {savePeriodic: {status, errors, periodicInspection}}}: MutationResponse) => {
      if (status === "200"){
        this.props.history.push(`/periodic_inspections/elements/${this.state.elementId}/edit`);
        this.setState({
          id: periodicInspection.id,
          users: periodicInspection.users,
          sectionsAttributes: periodicInspection.sectionsAttributes,
          alertMessage: {
            type: "success",
            message: ["Inspection successfully saved"]
          },
          changed: false
        }, () => this.resetTextboxes());
      } else {
        this.setState({
          alertMessage: {
            type: "",
            message: errors
          }
        })
      }
    });
  }

  renderAlert = () => {
    const alerts = this.state.alertMessage;
    if (Object.keys(alerts).length > 0) {
      return (
        <div className={`alert alert-${alerts.type}`}>
          <ul>
            {alerts.message.map((msg, i) => <li key={i}>{msg}</li>)}
          </ul>
        </div>
      )
    }
  }

  renderSections = () => {
    const elementSection = this.state.sectionsAttributes.find((s: {title:string}) => s.title === "Element")
    const equipmentSection = this.state.sectionsAttributes.find((s: {title:string}) => s.title === "Equipment")
    const environmentSection = this.state.sectionsAttributes.find((s: {title:string}) => s.title === "Environment")
    if (elementSection !== undefined &&
        equipmentSection !== undefined &&
        environmentSection !== undefined
      ) {
      return <>
        <Section
          handleChange={this.handleChange}
          instructions={this.state.element.elementInstructions}
          data={elementSection}
          newComment={this.state.newComments.Element.content} />
        <Section
          handleChange={this.handleChange}
          instructions={this.state.element.equipmentInstructions}
          data={equipmentSection}
          newComment={this.state.newComments.Equipment.content} />
        <Section
          handleChange={this.handleChange}
          instructions={this.state.element.environmentInstructions}
          data={environmentSection}
          newComment={this.state.newComments.Environment.content} />
      </>
    }
  }

  queryCompleted = (resp: QueryResponse) => {
    if (resp.periodicInspection.id !== null){
      this.props.history.push(`/periodic_inspections/elements/${resp.id}/edit`);
      this.setState({
        alertMessage: {type:"info", message:["Previous inspection loaded"]},
        changed: false
      });
    } else {
      this.props.history.push(`/periodic_inspections/elements/${resp.id}/new`);
      this.setState({
        id: resp.periodicInspection.id,
        alertMessage: {message: [], type: ""},
        changed: false
      });
    }
    this.resetTextboxes();
    this.updateStateFromQuery(resp);
  }

  updateStateFromQuery = (data: QueryResponse) => {
    this.setState({
      id: data.periodicInspection.id,
      users: data.periodicInspection.users,
      sectionsAttributes: data.periodicInspection.sectionsAttributes,
      element: {
        equipmentInstructions: data.periodicEquipmentInstructions,
        elementInstructions: data.periodicElementInstructions,
        environmentInstructions: data.periodicEnvironmentInstructions,
      }
    });
  }

  render() {
    return (
      <Query
        query={getPeriodicInspectionQuery}
        variables={{
          elementId: this.state.elementId,
          date: this.state.date.getDate() + "/" + (this.state.date.getMonth()+1) + "/" + this.state.date.getFullYear()
        }}
        fetchPolicy="network-only"
        onCompleted={(data: {element: QueryResponse})=> this.queryCompleted(data.element)}
        onError={(error: any) => console.log(error)}>

        {({loading}: {loading: boolean}) => {
          if (loading) return null;
          return <>
            {this.renderAlert()}

            <div id="periodic-inspection-form">
              <Mutation mutation={savePeriodicMutation}>
                {(savePeriodic: any) => (
                <form onSubmit={(e: React.FormEvent<HTMLFormElement>) =>this.handleSubmit(e, savePeriodic)} >
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <DatePicker selected={this.state.date} name="date" className="form-control-sm" onChange={this.handleDateChange} />
                  </div>

                  {this.state.sectionsAttributes ?
                    this.renderSections() : null }

                  <input type="submit" id="submit-button" value={this.state.changed ? "Submit": "No changes yet"} disabled={!this.state.changed}/>

                  {this.renderUpdatedBy()}
                </form>
                )}
              </Mutation>
            </div>
          </>
        }}
      </Query>
    )
  }
}

export default PeriodicForm;