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
import json

HEAD = open("./snippets/head", "r").read()
HEADER = open("./snippets/header", "r").read()
MONTH_ARRAY = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

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
def set_head(path, destination = None):
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
def set_header(path, destination = None):
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

# generates pages for each tag in use from /snippets/data.json
def generate_tags():
    pass

# populates tag pages with related posts
def populate_tags():
    # TODO: /pages/blog/index.html, /pages/projects/tagged.html, /pages/project/tags/*.html
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

# generate an HTML page from a post JSON file
def generate_post(path):
    with open(path, "r") as file:
        data = json.loads(file.read())
        match data["postType"]:
            case "2d":
                generate_2d(data, open("./snippets/templates/template-2d.html", "r").read())
            case "3d":
                generate_3d(data, open("./snippets/templates/template-3d.html", "r").read())
            case "games":
                generate_games(data, open("./snippets/templates/template-games.html", "r").read())
            case "music":
                generate_music(data, open("./snippets/templates/template-music.html", "r").read())
            case "other":
                generate_other(data, open("./snippets/templates/template-other.html", "r").read())
            case "writing":
                generate_writing(data, open("./snippets/templates/template-writing.html", "r").read())
            case _:
                raise ValueError("Unknown post type")

# Generate a 2D page from the template and data
def generate_2d(data, template):
    template = template.replace("$postTitle", data["postTitle"])

    # Check if there's a link, and if it's a youtube link embed it
    if "postLink" in data and data["postLink"].find("youtu") > -1:
        template = template.replace("$postLink", 
            f'<iframe src="{embedYoutube(data["postLink"])}" frameborder="0" allowfullscreen></iframe>')
    elif "postLink" in data:
        template = template.replace("$postLink", 
            f'<h2 class="creation-subtitle" style="margin:0;"><a href="{data["postLink"]}" target="blank">alternative link</a></h2>')
    else:
        template = template.replace("$postLink", "")

    template = template.replace("$postText", data["postText"])
    template = template.replace("$postTags", parse_tags(data["postTags"]))
    template = template.replace("$postFile", data["postFile"])
    write_page(template, f"./public/pages/projects/2d/{data["postDate"][0]}_{data["postDate"][1]}_{data["postDate"][2]}_{data["postTitle"].lower().replace(" ", "_")}.html")

def generate_3d(data, template):
    pass

def generate_games(data, template):
    pass

def generate_music(data, template):
    pass

def generate_other(data, template):
    pass

def generate_writing(data, template):
    pass

def write_page(page, path):
    with open(path, "w") as file:
        file.write(page)
    set_head(path)
    set_header(path)

# Turn a list of tags from a JSON into a string of <a> tags
def parse_tags(postTags):
    out = ""
    for tag in postTags:
        # Add the tag to the list if it hasn't been added already
        if not tag in tags:
            tags.append(tag)

        out += f'<a href="/pages/projects/tags/{tag}.html">{tag}</a>, '
    out = out[:-2]
    return out

# Convert www.youtube.com and youtu.be links to embed links
def embedYoutube(url):
    if url[:17] == "https://youtu.be/":
        return "https://www.youtube.com/embed/" + url[17:]
    elif url[:32] == "https://www.youtube.com/watch?v=":
        return "https://www.youtube.com/embed/" + url[32:]
    else:
        return url


# generate()

generate_post("./snippets/posts/amaranth_ref.json")