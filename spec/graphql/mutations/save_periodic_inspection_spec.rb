require "rails_helper"

RSpec.configure do |c|
  c.extend CommonSetup 
end

RSpec.describe Types::QueryType do
  setup_vars
  let(:good_data) {
    {
      id: nil,
      elementId: good_element.id,
      date: Date.today.to_s,
      sectionsAttributes: [
        {
          title: "element",
          complete: false,
          commentsAttributes: []
        },
        {
          title: "equipment",
          complete: false,
          commentsAttributes: []
        },
        {
          title: "environment",
          complete: false,
          commentsAttributes: []
        }
      ]
    }
  }

  let(:savePeriodicMutation) do
    %(mutation($data: PeriodicInput!) {
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
    })
  end

  context 'when signed in' do
    let (:create_periodic) {ClimbOnSchema.execute(savePeriodicMutation, variables: {
        data: good_data
      },
      context:{
        current_user: good_user,
        session: {}
      }).as_json
    }

    it 'can create an inspection when a user is signed in' do
      expect{create_periodic}.to change{PeriodicInspection.count}.by(1)
    end

    it 'can update an existing inspection' do
      create_periodic
      insp = PeriodicInspection.all.last
      expect do
        ClimbOnSchema.execute(savePeriodicMutation, variables: {
          data: {
            id: insp.id,
            elementId: good_element.id,
            date: Date.today.to_s,
            sectionsAttributes: [
              {
                id: insp.sections[0].id,
                title: "element",
                complete: true,
                commentsAttributes: []
              },
              {
                id: insp.sections[1].id,
                title: "equipment",
                complete: true,
                commentsAttributes: []
              },
              {
                id: insp.sections[2].id,
                title: "environment",
                complete: true,
                commentsAttributes: []
              }
            ]
          }
        },
        context:{
          current_user: good_user,
          session: {}
        }).as_json
      end.to change{PeriodicInspection.find(insp.id).sections[0].complete}
    end
  end

  context 'when not signed in' do
    let (:create_periodic_without_user) {ClimbOnSchema.execute(savePeriodicMutation, variables: {
        data: good_data
      },
      context:{
        current_user: nil,
        session: {}
      }).as_json
    }

    it 'fails when the user is not signed in' do
      response = create_periodic_without_user
      expect(response["errors"].length).to be > 0
    end

    it 'doesn\'t save to the databse' do
      expect{create_periodic_without_user}.not_to change{PeriodicInspection.count}
    end
  end
end