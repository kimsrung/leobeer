class User < ActiveRecord::Base

	def self.from_omniauth(auth)
  	where(provider: auth.provider, uid: auth.uid).first_or_initialize.tap do |user|
        user.provider = auth.provider
        user.uid = auth.uid
        user.name = auth.info.name
        user.email = auth.info.email rescue SecureRandom.hex(8) + "@gmail.com"
        user.oauth_token = auth.credentials.token
        user.save!
  	end
  end
end
