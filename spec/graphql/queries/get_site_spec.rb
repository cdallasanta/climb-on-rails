require "rails_helper"

RSpec.configure do |c|
  c.extend CommonSetup 
end

RSpec.describe Types::QueryType do
  setup_vars

  let(:site_query) do
    %(query {
      site{
        id
        name
      }
    })
  end

  context "Site query" do
    subject(:result) do
      ClimbOnSchema.execute(site_query,
        context:{
          current_user: good_user,
          session: {}
        }
      ).as_json
    end

    it "returns the current user's site" do
      returned_site = Site.find(result["data"]["site"]["id"])
      expect(returned_site).to eq(good_user.site)
    end

    it "returns the current user's site's elements" do
      site_elements_query = <<-GQL
        query {
          site{
            elements{
              id
              name
            }
          }
        }
      GQL

      good_site.elements = []
      good_site.elements.build(name:"test element 1")
      good_site.elements.build(name:"test element 2")
      good_site.elements.build(name:"test element 3")

      site_elements = []
      good_site.elements.each do |element|
        site_elements << {"id" => element.id.to_s, "name" => element.name}
      end
      
      response = ClimbOnSchema.execute(site_elements_query,
        context:{
          current_user: good_user,
          session: {}
        }
      ).as_json
      
      expect(response["data"]["site"]["elements"]).to eq(site_elements)
    end
  end
end