class StampsController < ApplicationController

	def create
    @stamp = Stamp.new(stamp_params)
    @stamp.id = 1
    redirect_to stamp_path(@stamp, thumb_image: @stamp.image.thumb)
  end

  def show
    @stamp = Stamp.new
    user = User.find_by(uid: params[:id])
    @image_url = ActionController::Base.helpers.asset_path("BlueFilterAndLogo.png").to_s
    if user.present?
      if user.image_url.present?
        @image_url = user.image_url
      else
        @image_url = JSON.parse(
                      RestClient.get("https://graph.facebook.com/#{user.uid}?fields=picture.width(500).height(500)&access_token=#{user.oauth_token}")
                    )["picture"]["data"]["url"]
        user.image_url = @image_url
        user.save
      end
    end

  end

  def download
    if params[:thumb_image].present?
  	 send_file Rails.public_path.to_s + params[:thumb_image]
    else
      @stamp = Stamp.new
      @stamp.id = 1
      redirect_to stamp_path(@stamp)
    end
  end

  private

  def stamp_params
    params.require(:stamp).permit(:image)
  end

end