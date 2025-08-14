'''
Python Static Site Generator
written by end

Goal: take simplified site & posts in /private/ and generate a functional static with minimal JS site in /public/

Tasks:
- Rewrite header with a unique HTML tag to be replaced by the script (also make the header look good ffs)
- Populate tag pages from posts
- Generate posts from JSON (reference sitepostgenerator script)
- Rebuild tabs to be usable without JS (still use the JS, that's not a static feature unfortunately)
- POTENTIALLY: Build NoJS version of Chatbox, periodically updating the site with new messages

Distributed under the terms of the GPLv3
https://www.gnu.org/licenses/gpl-3.0.en.html
'''

# go through all /private/ files/folders and call the requisite functions for all of them
def generate:
    pass

# set the <end-header> tag of a page to the static header
def set_header:
    # make sure to not replace other <header> tags, because I would use those for unique headers on some pages
    pass

# generate an HTML page from a post JSON file
def generate_post:
    pass

# populates tag pages with related posts
def populate_tags:
    pass

# sets the <end-head> tag to the standard header
def set_head:
    # make sure to not overwrite the default <head>, those may be used for unique pages
    pass
