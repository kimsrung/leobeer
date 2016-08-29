class UsersController < ApplicationController

	def score
		user = current_user
		if !user.present?
			return render "not login"
		end
		if params[:score].to_i > user.score
			user.score = params[:score].to_i
		end
		user.save
		return render json: user
	end

	def index
		@user = current_user
		@position = 0
		users = User.order(score: :desc)
		if @user.present?
			users.each.with_index do |u, index|
				if (u.id == @user.id)
					@position = index + 1
				end
			end
		end

		@users = users.first(10)
	end
end