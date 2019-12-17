task :commit, :message  do |t, args|
  message = args.message
  if message==nil
    message = "Source updated at #{Time.now}."
  end
  system "git add ."
  system "git commit -a -m \"#{message}\""
  system "git push -u origin master"
end
