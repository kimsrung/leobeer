class VisitorsController < ApplicationController

	def kickup
		#render :layout => false    
	end

	def support
		
	end

	def upload
		@stamp = Stamp.new
	end

	
end
