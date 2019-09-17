class UsersController < ApplicationController
    before_action :authenticate_user!, only: [:edit, :show, :update, :password, :password_update]
    before_action :find_user, only: [:edit, :show, :update, :password, :password_update]
    before_action :authorize!, only: [:edit, :update, :password, :password_update]

    def new
        @user = User.new
    end

    def create
        @user = User.new user_params
        if @user.save
            flash[:notice] = "User has been saved"
            session[:user_id] = @user.id
            redirect_to root_path
        else
            flash[:danger] = "User not saved, please try again"
            render :new
        end
    end

    def edit
        # @user = User.find params[:id]
    end

    def password
    end

    def password_update
        # byebug
        if @user&.authenticate params[:user][:current_password]
            if @user.update user_params
                flash[:success] = "Password updated"
                redirect_to root_path
            else
                flash[:danger] = @user.errors.full_messages.join(",")
                redirect_to request.referrer
            end
        else
            flash[:danger] = "invalid current password, try again"
            redirect_to request.referrer
        end
    end

    def update
        if @user.update user_params
            redirect_to root_path
        else
            render :edit
        end
    end

    private

    def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end

    def find_user
      @user = User.find params[:id]
    end

    def authorize!
      redirect_to root_path, alert: 'Not authorized!' unless can?(:crud, current_user)
    end


end
