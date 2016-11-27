class VisitorsController < ApplicationController

	def kickup
		if !current_user.present?
			return redirect_to '/auth/facebook?play=1'
		end
		#render :layout => false
	end

	def support

	end

	def upload
		@stamp = Stamp.new
	end

	def index
		@stamp = Stamp.new

		respond_to do |format|
      format.html
      format.mobile
    end
	end


end
