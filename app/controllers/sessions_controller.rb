class SessionsController < ApplicationController
  def create
    user = User.from_omniauth(env["omniauth.auth"])
    session[:user_id] = user.id
    #redirect_to stamp_path(1), image_url: "https://graph.facebook.com/#{user.id}?fields=picture.width(500).height(500)"
    redirect_to controller: 'stamps', action: 'show', id: user.uid
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url+"#all_voting"
  end
end
