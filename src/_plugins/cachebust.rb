require 'digest'

module Jekyll
  module CachebustFilter
    def cachebust(input)
        if input.nil?
            return input;
        else
            input.gsub(/(?<=\=")[a-zA-Z0-9\/\.]+\.(js|css)(?=")/) { |f|
                file = File.join(File.dirname(__FILE__), "../..", "src", f)
                if File.exist? file
                    contents = File.read(file)
                    f + "?v=" + Digest::MD5.hexdigest(contents)
                else
                    f
                end
            }
        end
    end
  end
end

Liquid::Template.register_filter(Jekyll::CachebustFilter)
