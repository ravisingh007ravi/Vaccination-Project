# Require any additional compass plugins here.
require 'ruby-growl'

cache = false
#asset_cache_buster :none

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "css"
sass_dir = "sass"
images_dir = "img"
javascripts_dir = "js"

#何も書かなければデフォルトは:development
#environment = :production

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = (environment == :production) ? :compressed : :expanded

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false

sourcemap = true

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

# 除算時小数点以下表示桁数
Sass::Script::Number.precision = 10

# Growl通知
# スプライト画像生成時
on_sprite_generated do |filename|
  #g = Growl.new "localhost", "ruby-growl"
  #g.add_notification "ruby-growl Notification"
  #g.notify "ruby-growl Notification", "It came from ruby-growl!",
  #         "sprite image generated!", -2
end

#スプライト画像の後ろに付くランダム文字列を除去
# Make a copy of sprites with a name that has no uniqueness of the hash.
on_sprite_saved do |filename|
  if File.exists?(filename)
    FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
  end
end

# CSSファイル保存時
on_stylesheet_saved do |filename|
  g = Growl.new "localhost", "ruby-growl"
  g.add_notification "ruby-growl Notification"
  g.notify "ruby-growl Notification", "It came from ruby-growl!",
           "#{File.basename(filename)} updated!", -1

  # CSSファイル内 スプライト画像後ろのランダム文字列削除
  if File.exists?(filename)
    css = File.read filename
    File.open(filename, 'w+') do |f|
      f << css.gsub(%r{-s[a-z0-9]{10}\.png}, '.png')
    end
  end
end

# CSSファイルエラー発生時
on_stylesheet_error do |filename, message|
  g = Growl.new "localhost", "ruby-growl"
  g.add_notification "ruby-growl Notification"
  g.notify "ruby-growl Notification", "It came from ruby-growl!",
           "#{File.basename(filename)}: #{message}", 2
end
