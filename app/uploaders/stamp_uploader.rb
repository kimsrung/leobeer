# encoding: utf-8

class StampUploader < CarrierWave::Uploader::Base

  # Include RMagick or MiniMagick support:
   include CarrierWave::RMagick
  # include CarrierWave::MiniMagick

  # Choose what kind of storage to use for this uploader:
  # storage :file
  storage :fog
  process :stamp

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

  def stamp
    manipulate! format: "jpeg" do |source|
      source.auto_orient!
      overlay1_path = Rails.public_path.to_s + ActionController::Base.helpers.asset_path("BlueFilterAndLogo.png").to_s
      overlay1 = Magick::Image.read(overlay1_path).first

      # overlay2_path = Rails.public_path.to_s + ActionController::Base.helpers.asset_path("withclear.png").to_s
      # overlay2 = Magick::Image.read(overlay2_path).first

      source = source.resize_to_fill(1200, 1200)
      source.composite!(overlay1, 0, 0, Magick::OverCompositeOp)
      # source.composite!(overlay2, 350, 450, Magick::OverCompositeOp)
    end
  end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  # def default_url
  #   # For Rails 3.1+ asset pipeline compatibility:
  #   # ActionController::Base.helpers.asset_path("fallback/" + [version_name, "default.png"].compact.join('_'))
  #
  #   "/images/fallback/" + [version_name, "default.png"].compact.join('_')
  # end

  # Process files as they are uploaded:
  # process :scale => [200, 300]
  #
  # def scale(width, height)
  #   # do something
  # end

  # Create different versions of your uploaded files:
  # version :thumb do
  #   process :stamp
  # end

  # Add a white list of extensions which are allowed to be uploaded.
  # For images you might use something like this:
  # def extension_white_list
  #   %w(jpg jpeg gif png)
  # end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  # def filename
  #   "something.jpg" if original_filename
  # end

  def filename
    if original_filename.present?
      extension = File.extname(original_filename)
      "Share the love with your rings#{extension}"
    end
  end

end
