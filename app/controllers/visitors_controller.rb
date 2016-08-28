class VisitorsController < ApplicationController

	def kickup
		#render :layout => false    
	end

	def support
		
	end

	def upload
		@stamp = Stamp.new
	end

	def index
		respond_to do |format|
      format.html
      format.mobile
    end
	end

	
end
