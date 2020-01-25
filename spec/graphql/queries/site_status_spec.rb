require "rails_helper"

RSpec.configure do |c|
  c.extend CommonSetup 
end

RSpec.describe Types::QueryType do
  describe "Site Status query" do
    setup_vars

    let(:status_query) {
      %(query($date: String!) {
        site {
          status(date: $date) {
            id
            name
            setup
            takedown
          }
        }
      })
    }

    subject(:response){
      ClimbOnSchema.execute(status_query,
        variables: {date: Date.today.to_s},
        context: {current_user: good_user}
      ).to_h
    }
    
    it 'returns an error when the user is not signed in' do
      response = ClimbOnSchema.execute(status_query,
        variables: {date: Date.today.to_s}
      ).to_h
      expect(response["errors"]).not_to be nil
    end

    it "returns a an array of element statuses" do
      expect(response["data"]["site"]["status"]).to be_a Array
    end

    it "returns 'not started'/'not started' when the preuse hasn't been created yet" do
      expect(response["data"]["site"]["status"][0]["setup"]).to eq "not started"
      expect(response["data"]["site"]["status"][0]["takedown"]).to eq "not started"
    end

    it "returns 'incomplete'/'not started' with an incomplete Setup and uncreated Takedown" do
      good_element.preuse_inspections.create(date:Date.today)
      expect(response["data"]["site"]["status"][0]["setup"]).to eq "incomplete"
      expect(response["data"]["site"]["status"][0]["takedown"]).to eq "not started"
    end

    it "returns 'complete'/'not started' with a complete Setup and not started Takedown" do
      insp = good_element.preuse_inspections.create(date:Date.today)
      insp.setup.sections.each do |section|
        section.update(complete: true)
      end
      insp.save

      expect(response["data"]["site"]["status"][0]["setup"]).to eq "complete"
      expect(response["data"]["site"]["status"][0]["takedown"]).to eq "not started"
    end
    
    it "returns 'complete'/'incomplete' with a complete Setup and an incomplete Takedown" do
      insp = good_element.preuse_inspections.create(date:Date.today)
      insp.setup.sections.each do |section|
        section.update(complete: true)
      end
      insp.save
      insp.takedown.climbs[0].update(block_1:100)

      expect(response["data"]["site"]["status"][0]["setup"]).to eq "complete"
      expect(response["data"]["site"]["status"][0]["takedown"]).to eq "incomplete"
    end
  end
end