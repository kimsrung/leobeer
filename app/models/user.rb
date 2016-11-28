class User < ActiveRecord::Base

	def self.from_omniauth(auth)
  	where(provider: auth.provider, uid: auth.uid).first_or_initialize.tap do |user|
        user.provider = auth.provider
        user.uid = auth.uid
        user.name = auth.info.name
        user.email = auth.info.email rescue SecureRandom.hex(8) + "@gmail.com"
        user.oauth_token = auth.credentials.token
        image_url = JSON.parse(
                      RestClient.get("https://graph.facebook.com/#{user.uid}?fields=picture.width(500).height(500)&access_token=#{user.oauth_token}")
                    )["picture"]["data"]["url"]
        user.image_url = image_url
        user.save!
  	end
  end
end
