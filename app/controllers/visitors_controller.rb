class VisitorsController < ApplicationController
	def index
		@stamp = Stamp.new

		respond_to do |format|
      format.html
      format.mobile
    end
	end

end
