class VisitorsController < ApplicationController

	def kickup
		#render :layout => false    
	end

	def support
		@stamp = Stamp.new
	end

	
end
