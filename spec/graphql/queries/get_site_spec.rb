require "rails_helper"

RSpec.describe Types::QueryType do
  let(:site) { Site.create(name: "test site") }
  let(:user) { User.create(fullname: "test user", email:"test@email.com", password:"demopass", site: site) }

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
          current_user: user,
          session: {}
        }
      ).as_json
    end

    it "returns the current user's site" do
      returned_site = Site.find(result["data"]["site"]["id"])
      expect(returned_site).to eq(user.site)
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

      site.elements.build(name:"test element 1")
      site.elements.build(name:"test element 2")
      site.elements.build(name:"test element 3")

      site_elements = []
      site.elements.each do |element|
        site_elements << {"id" => element.id.to_s, "name" => element.name}
      end
      
      response = ClimbOnSchema.execute(site_elements_query,
        context:{
          current_user: user,
          session: {}
        }
      ).as_json
      
      expect(response["data"]["site"]["elements"]).to eq(site_elements)
    end
  end
end