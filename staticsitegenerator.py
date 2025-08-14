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

idea_count = 69
last_updated = "LAST MODIFIED: AUGUST 13, 2025"
link_count = 289



# go through all /private/ files/folders and call the requisite functions for all of them
def generate():
    # loop over all pages (recursively) and call:
    set_head()

    # loop over all pages (recursively) and call:
    set_header()

    # generate all tag pages
    generate_tags()

    # generate all posts from /snippets/data.json
    generate_posts()

    # populate tag pages with newly generated posts
    populate_tags()


# sets the <end-head> tag to the standard header
def set_head():
    # make sure to not overwrite the default <head>, those may be used for unique pages
    pass

# set the <end-header> tag of a page to the static header
def set_header():
    # make sure to not replace other <header> tags, because I would use those for unique headers on some pages
    pass

# generate an HTML page from a post JSON file
def generate_post(path):
    pass

# generate all posts /snippets/data.json
def generate_posts():
    # grab posts from data.json
    posts = {}

    # loop over posts creating pages
    for post in posts:
        generate_post("/snippets/posts/" + post)

# generates pages for each tag in use from /snippets/data.json
def generate_tags():
    pass

# populates tag pages with related posts
def populate_tags():
    # TODO: /pages/blog/index.html, /pages/projects/tagged.html, /pages/project/tags/*.html
    pass


generate()
