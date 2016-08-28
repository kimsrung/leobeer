# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile += %w( fonts/*.ttf )
Rails.application.config.assets.precompile += %w( main.css)
Rails.application.config.assets.precompile += %w( reset.css)
Rails.application.config.assets.precompile += %w( CBall.js )
Rails.application.config.assets.precompile += %w( CBallChallenge.js)
Rails.application.config.assets.precompile += %w( CCreditsPanel.js)
Rails.application.config.assets.precompile += %w( CEndPanel.js)
Rails.application.config.assets.precompile += %w( CGame.js)
Rails.application.config.assets.precompile += %w( CGfxButton.js)
Rails.application.config.assets.precompile += %w( CInterface.js)
Rails.application.config.assets.precompile += %w( CLang.js)
Rails.application.config.assets.precompile += %w( CMain.js.erb)
Rails.application.config.assets.precompile += %w( CMenu.js)
Rails.application.config.assets.precompile += %w( CPlayer.js)
Rails.application.config.assets.precompile += %w( CPreloader.js)
Rails.application.config.assets.precompile += %w( CPlayer.js)
Rails.application.config.assets.precompile += %w( createjs-2013.12.12.min.js)
Rails.application.config.assets.precompile += %w( CTextButton.js)
Rails.application.config.assets.precompile += %w( ctl_utils.js)
Rails.application.config.assets.precompile += %w( CToggle.js)
Rails.application.config.assets.precompile += %w( CVector2.js)
Rails.application.config.assets.precompile += %w( settings.js)
Rails.application.config.assets.precompile += %w( sprite_lib.js)



