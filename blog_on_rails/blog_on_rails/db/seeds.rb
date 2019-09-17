# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Post.destroy_all
Comment.destroy_all
User.destroy_all

NUM_POSTS = 65
NUM_USERS = 10
PASSWORD = "supersecret"

super_user = User.create(
  name: "Jon Snow",
  email: "js@winterfell.gov",
  password: PASSWORD,
  is_admin: true

)

NUM_USERS.times do
   name = "#{Faker::Name.first_name}.#{Faker::Name.last_name}"

  User.create(
    name: name,
    email: "#{name}@example.come",
    password: PASSWORD,
    is_admin: false
  )
end

users = User.all

NUM_POSTS.times do
  created_at = Faker::Date.backward(days: 365 * 5)
  p = Post.create(
    title: Faker::Hacker.say_something_smart,
    body: Faker::ChuckNorris.fact,
    created_at: created_at,
    updated_at: created_at,
    user: users.sample
  )
   if p.valid?
    p.comments = rand(0..10).times.map do
      Comment.new(
        body: Faker::GreekPhilosophers.quote,
        user: users.sample
      )
    end
  end
end

posts = Post.all
comments = Comment.all
# posts = Post.all.order(created_at: :asc)

puts Cowsay.say("Generated #{posts.count} posts", :frogs)
puts Cowsay.say("Generated #{comments.count} posts", :stegosaurus)
puts Cowsay.say("Generated #{users.count} posts", :tux)
puts "Login with #{super_user.email} and password: #{PASSWORD}"


