class CreateStamps < ActiveRecord::Migration
  def change
    create_table :stamps do |t|
      t.string :image

      t.timestamps null: false
    end
  end
end
