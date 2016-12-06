class StampsController < ApplicationController

	def create
    @stamp = Stamp.new(stamp_params)
    @stamp.save

    redirect_to stamp_path(@stamp, thumb_image: @stamp.image.thumb)
  end

  def show
    @stamp = Stamp.new

    user = User.find_by(uid: params[:id])

    if user.present?
      fb_url = JSON.parse(
                    RestClient.get("https://graph.facebook.com/#{user.uid}?fields=picture.width(500).height(500)&access_token=#{user.oauth_token}")
                  )["picture"]["data"]["url"]
      @stamp.remote_image_url = fb_url
      @image_url = "#{request.protocol}#{request.host}"+ @stamp.image.thumb.to_s
      @image_path = @stamp.image.thumb.to_s
    end

  end

  def upload
    @stamp = Stamp.new(stamp_params)
    @stamp.save

    return render json: {image_uploaded_path: @stamp.image.thumb.to_s}
  end

  def download
    if params[:filepath].present?
  	 send_file Rails.public_path.to_s + params[:filepath]
    else
      send_file Rails.public_path.to_s + ActionController::Base.helpers.asset_path("BlueFilterAndLogo.png").to_s
    end
  end

  private

  def stamp_params
    params.require(:stamp).permit(:image)
  end

end