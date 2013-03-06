# This script adds the text in the file links.txt to every .html file
# right after the line specified in the break_line.txt file.
#
# If you want to insert the links in links.txt after the <head> line
# simply give head as a command line argument to the script/
#
# Example: python add_links.py 

import os
import sys
import glob
import shutil
import linecache

# main
links_input = open("links.txt")
links = []
for line in links_input:
  links.append(line)
links_input.close()


break_line = linecache.getline("break_line.txt", 1)


html_files = glob.glob("./*.html")
for file in html_files:
  input = open(file, "r")
  output = open(file + ".tmp", "w")

  for line in input:
    output.write(line)
    if break_line in line:
      start_whites = line[:len(line) - len(line.lstrip())]
      for out_line in links:
        output.write(start_whites + out_line)

  input.close()
  output.close()

  shutil.copy(file + ".tmp", file)
  os.remove(file + ".tmp")
