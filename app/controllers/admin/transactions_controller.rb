class Admin::TransactionsController < ApplicationController
	before_filter :authenticate

	def authenticate
	  authenticate_or_request_with_http_basic do |username, password|
	    username == "mech" && password == "mech"
	  end
	end

	def index
		@transactions = Transaction.all
		@total_points = Transaction.sum(:points)
	end

	def create
		@transaction = Transaction.create(transaction_params)
		render :show
	end

	def update
		
	end

	def show
		@transaction = Transaction.find_by(id: params[:id])
	end

	def new
		@transaction = Transaction.new
	end

  def transaction_params
    params.require(:transaction).permit(:points, :user_id)
  end

end