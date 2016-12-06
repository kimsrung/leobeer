CarrierWave.configure do |config|
  config.fog_credentials = {
    provider:              'AWS',
    aws_access_key_id:     ENV['S3_KEY'],
    aws_secret_access_key: ENV['S3_SECRET'],
    region:                 'ap-southeast-1'
  }
  config.fog_directory  = ENV['S3_BUCKET']
  config.fog_attributes = { 'Cache-Control' => "max-age=#{365.day.to_i}" }
end
