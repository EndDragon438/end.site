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

import os

HEAD = open("./snippets/head", "r").read()
HEADER = open("./snippets/header", "r").read()

idea_count = 69
last_updated = "LAST MODIFIED: AUGUST 13, 2025"
link_count = 289
tags = []



# go through all /private/ files/folders and call the requisite functions for all of them
def generate():
    # Check that the counters are updated
    print("Did you update the counters?")
    ans = input()
    if not 'y' in ans:
        return

    targets = []

    # Grab all the filepaths
    walked = os.walk("./private")
    for (root, dirs, files) in walked:
        root = root.replace("\\", "/")
        for file in files:
            if ".html" in file:
                targets.append(root + "/" + file)

    # Limit how much we fuck with for now
    # TODO: REMOVE FOR PROD
    targets = targets[0:2]

    # generate all tag pages
    generate_tags()

    # generate all posts from /snippets/data.json
    generate_posts()

    # populate tag pages with newly generated posts
    populate_tags()

    # loop over all pages (recursively) and call:
    for file in targets:
        print(file)
        set_head(file, file.replace("./private", "./public"))

    # loop over all pages (recursively) and call:
    for file in targets:
        print(file)
        set_header(file, file.replace("./private", "./public"))



# sets the <end-head> tag to the standard header
def set_head(path, destination):
    # Read the file in
    temp = ""
    with open(path, "r") as file:
        temp = file.read()
        temp = temp.replace("<end-head>", HEAD)
    
    if destination:
        # Create any new folders along the path
        if not os.path.exists(destination[:destination.rfind("/")]):
            os.makedirs(destination[:destination.rfind("/")])
        # Write to the destination file
        with open(destination, "w") as file:
            file.write(temp)
    else:
        # Write to the original file
        with open(path, "w") as file:
            file.write(temp)

# set the <end-header> tag of a page to the static header
def set_header(path, destination):
    # Read the file in
    temp = ""
    with open(path, "r") as file:
        temp = file.read()
        temp = temp.replace("<end-header>", HEADER)
    
    if destination:
        # Create any new folders along the path
        if not os.path.exists(destination[:destination.rfind("/")]):
            os.makedirs(destination[:destination.rfind("/")])
        # Write to the destination file
        with open(destination, "w") as file:
            file.write(temp)
    else:
        # Write to the original file
        with open(path, "w") as file:
            file.write(temp)

# generate an HTML page from a post JSON file
def generate_post(path):
    pass

# generate all posts /snippets/data.json
def generate_posts():
    # grab posts from data.json
    # posts = {}
    # gonna try working without the json file, so i don't have to edit it

    posts = os.listdir("./snippets/posts")

    # loop over posts creating pages
    for post in posts:
        generate_post("./snippets/posts/" + post)

# generates pages for each tag in use from /snippets/data.json
def generate_tags():
    pass

# populates tag pages with related posts
def populate_tags():
    # TODO: /pages/blog/index.html, /pages/projects/tagged.html, /pages/project/tags/*.html
    pass


# generate()
