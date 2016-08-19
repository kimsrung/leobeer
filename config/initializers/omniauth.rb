OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, '1039085669520186', '51f90832c9a0adcb55c1211c83ef09c8', scope: "publish_actions,email,user_photos"
end