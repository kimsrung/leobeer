class Stamp < ActiveRecord::Base
  mount_uploader :image, StampUploader
end