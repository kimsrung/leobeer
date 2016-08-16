class ProfileUploader < CarrierWave::Uploader::Base
  include CarrierWave::RMagick

  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

  def stamp
    manipulate! format: "png" do |source|
      overlay1_path = ActionController::Base.helpers.asset_path("support_cambodia.png")
      overlay1 = Magick::Image.read(overlay1_path).first.resize_to_fill(274, 100)

      overlay2_path = ActionController::Base.helpers.asset_path("withclear.png")
      overlay2 = Magick::Image.read(overlay2_path).first
      

      source = source.resize_to_fill(500, 500)
      source.composite!(overlay1, 0, 400, Magick::OverCompositeOp)
      source.composite!(overlay2, 400, 400)
    end
  end
end