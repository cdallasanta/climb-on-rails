namespace :start do
  desc 'Start dev server'
  task :development do
    exec 'rails s -p 3001'
  end
  
  desc 'Start production server'
  task :production do
    exec 'NPM_CONFIG_PRODUCTION=true npm run postinstall && foreman start'
  end  
end
task :start => 'start:development'

task :commit, [:msg] do |t, args|
  message = args.message
  if message==nil
    message = "Source updated at #{Time.now}."
  end
  system "git add ."
  system "git commit -a -m \"#{message}\""
end