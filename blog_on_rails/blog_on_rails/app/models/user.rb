class User < ApplicationRecord
    has_secure_password
    has_many :posts, dependent: :nullify
    has_many :comments, dependent: :nullify
    validates(:email, presence: true, uniqueness: true)
end
