require "rails_helper"

RSpec.configure do |c|
  c.extend CommonSetup 
end

RSpec.describe Types::QueryType do
  setup_vars

  let(:elements_query){
    %(query {
      elements{
        id
        name
      }
    })
  }

  subject(:response){
    ClimbOnSchema.execute(elements_query,
      context: {current_user: good_user}
    ).to_h
  }

  it "retreives the current user's site's elements" do
    elements_list = []
    good_user.site.elements.each do |elem|
      elements_list << {"id" => elem.id.to_s, "name" => elem.name}
    end
    
    expect(response["data"]["elements"]).to eq elements_list
  end

  it 'returns an error when the user is not signed in' do
    response = ClimbOnSchema.execute(elements_query).to_h
    expect(response["errors"]).not_to be nil
  end
end