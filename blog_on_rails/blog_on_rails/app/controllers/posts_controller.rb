class PostsController < ApplicationController

  before_action :find_post, only: [:show, :edit, :update, :destroy]

  def new
    @post = Post.new
    render :new
  end

  def create
    @post = Post.new post_params
    if @post.save
      flash[:notice] = "Post created successfully"
      redirect_to post_path(@post)
    else
      render :new
    end
  end

  def update
    if @post.update post_params
      redirect_to post_path(@post)
    else
      render :show
    end
  end


  def index
    @posts = Post.all

  end

  def show
    @comments = @post.comments
    @comment = Comment.new
  end

  def destroy
    @post.destroy
    redirect_to posts_path
  end

  private

  def post_params
    params.require(:post).permit(:title,:body)
  end

  def find_post
    @post = Post.find params[:id]
  end

end
