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

# Constants
HEAD = open("./snippets/head", "r").read()
HEADER = open("./snippets/header", "r").read()
TEMPLATES = {
    "2d": open("./snippets/templates/template-2d.html", "r").read(),
    "3d": open("./snippets/templates/template-3d.html", "r").read(),
    "blog": open("./snippets/templates/template-blog.html", "r").read(),
    "games": open("./snippets/templates/template-games.html", "r").read(),
    "music": open("./snippets/templates/template-music.html", "r").read(),
    "other": open("./snippets/templates/template-other.html", "r").read(),
    "tag": open("./snippets/templates/template-tag.html", "r").read(),
    "tagged": open("./snippets/templates/template-tagged.html", "r").read(),
    "writing": open("./snippets/templates/template-writing.html", "r").read()
}
MONTH_ARRAY = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

# Update this shit
idea_count = 69
last_updated = "LAST MODIFIED: AUGUST 16, 2025"
link_count = 289

# Updated by the script
tags = []



# go through all files/folders and call the requisite functions for all of them
def generate():
    # Check that the counters are updated
    print("Did you update the counters?")
    ans = input()
    if not 'y' in ans:
        return

    # generate all posts from /snippets/data.json
    generate_posts()

    # populate tag pages with newly generated posts
    populate_tags()

    targets = []

    # Grab all the filepaths
    walked = os.walk("./public")
    for (root, dirs, files) in walked:
        root = root.replace("\\", "/")
        for file in files:
            if ".html" in file:
                targets.append(root + "/" + file)

    # loop over all pages and replace head & headers:
    for file in targets:
        setters(file)

def setters(path, destination = None):
    # Read the file in
    temp = open(path, "r").read()
    temp = temp.replace("<end-head>", HEAD)
    temp = temp.replace("<end-header", HEADER)
    
    if destination:
        # Create any new folders along the path
        if not os.path.exists(destination[:destination.rfind("/")]):
            os.makedirs(destination[:destination.rfind("/")])
        # Write to the destination file
        with open(destination, "w") as file:
            file.write(temp)
            file.close()
    else:
        # Write to the original file
        with open(path, "w") as file:
            file.write(temp)
            file.close()

# populates tag pages with related posts
def populate_tags():
    # Grab list of pages and put into a dict of {file_name (YYYY_MM_DD_name) : tags tuple}
    postlist = os.listdir("./snippets/posts")

    pages = {}
    for post in postlist:
        with open(f"./snippets/posts/{post}", "r") as file:
            data = json.loads(file.read())
            pages[f"{data["postDate"][0]}-{data["postDate"][1]}-{data["postDate"][2]}_{data["postTitle"].replace(" ", "_").lower()}.html"] = tuple(data["postTags"])

    # Take list of tags and populate projects/tagged.html with those
    # Year tags first, then alphabetical
    yearlist = [tag for tag in tags if tag[:2] == "20"]
    yearlist.sort()
    namelist = [tag for tag in tags if not tag[:2] == "20"]
    namelist.sort()

    taglist = yearlist + namelist

    # Convert the taglist into HTML formatted list of tag links
    taglinks = []
    for tag in taglist:
        taglinks.append(f'<li><a href="/pages/projects/tags/{tag}.html">{tag}</a></li>')

    # Write the HTML tags to the page
    with open("./public/pages/projects/tagged.html", "w") as file:
        template = TEMPLATES["tagged"]
        template = template.replace("$tagList", "\n\t\t\t\t\t".join(taglinks))
        file.write(template)
        file.close()
    

    # Grab list of blog posts (/pages/blog/pages/*.html) and populate /blog/index.html
    bloglist = os.listdir("./public/pages/blog/pages")
    bloglist.sort(reverse = True) # this should hopefully sort by date (descending) cause of my YYYYMMDD formatting

    # Build the HTML list of blog posts
    blogindex = []
    for post in bloglist:
        blogindex.append(f'<li><a href="/pages/blog/pages/{post}">{post[post.find("_") + 1:-5].replace("-", " ")} | {MONTH_ARRAY[int(post[5:7]) - 1]} {post[8:10]}, {post[:4]}</a></li>')
    with open("./public/pages/blog/index.html", "w") as file:
        template = TEMPLATES["blog"]
        template = template.replace("$blogPosts", "\n\t\t\t\t\t".join(blogindex))
        print(template)
        file.write(template)
        file.close()

    # For each tag go through the page dict and populate tag pages with pages (ordered by date, found in filename)
    for tag in tags:
        # go through pages, if page contains this tag add it to the HTML formatted list
        fitpages = []
        for page in pages:
            if tag in pages[page]:
                # Set the type of the post to find the filepath
                # there is absolutely a better way to do this, but i can't be bothered to find it right now
                posttype = ""
                if "2d" in pages[page]:
                    posttype = "2d"
                elif "3d" in pages[page]:
                    posttype = "3d"
                elif "games" in pages[page]:
                    posttype = "games"
                elif "music" in pages[page]:
                    posttype = "music"
                elif "other" in pages[page]:
                    posttype = "other"
                elif "writing" in pages[page]:
                    posttype = "writing"
                
                fitpages.append(f'<li><a href="/pages/projects/{posttype}/{page}">{page[page.find("_") + 1:-5].replace("_", " ").title()} | {MONTH_ARRAY[int(page[5:page[5:].find("-") + 5]) - 1]} {page[page[5:].find("-") + 6:page.find("_")]}, {page[:4]}')
        # open the tag page and write to it
        template = TEMPLATES["tag"]
        template = template.replace("$tagName", tag)
        template = template.replace("$tagList", "\n\t\t\t\t\t".join(fitpages))
        with open(f"./public/pages/projects/tags/{tag}.html", "w") as file:
            file.write(template)
            file.close()
    
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
                generate_2d(data, TEMPLATES["2d"])
            case "3d":
                generate_3d(data, TEMPLATES["3d"])
            case "games":
                generate_games(data, TEMPLATES["games"])
            case "music":
                generate_music(data, TEMPLATES["music"])
            case "other":
                generate_other(data, TEMPLATES["other"])
            case "writing":
                generate_writing(data, TEMPLATES["writing"])
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
    write_page(template, f"./public/pages/projects/2d/{data["postDate"][0]}-{data["postDate"][1]}-{data["postDate"][2]}_{data["postTitle"].lower().replace(" ", "_")}.html")

def generate_3d(data, template):
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
    write_page(template, f"./public/pages/projects/3d/{data["postDate"][0]}-{data["postDate"][1]}-{data["postDate"][2]}_{data["postTitle"].lower().replace(" ", "_")}.html")

def generate_games(data, template):
    template = template.replace("$postTitle", data["postTitle"])
    template = template.replace("$postDate", parse_date(data['postDate']))
    template = template.replace("$postTags", parse_tags(data["postTags"]))

    template = template.replace("$postLink", 
        f'<h2 class="creation-subtitle" style="margin:0;"><a href="{data["postLink"]}" target="blank">alternative link</a></h2>')

    template = template.replace("$postText", data["postText"])
    write_page(template, f"./public/pages/projects/games/{data["postDate"][0]}-{data["postDate"][1]}-{data["postDate"][2]}_{data["postTitle"].lower().replace(" ", "_")}.html")

def generate_music(data, template):
    template = template.replace("$postTitle", data["postTitle"])
    template = template.replace("$postDate", parse_date(data['postDate']))
    template = template.replace("$postTags", parse_tags(data["postTags"]))

    template = template.replace("$postLink", 
        f'<h2 class="creation-subtitle" style="margin:0;"><a href="{data["postLink"]}" target="blank">alternative link</a></h2>')

    template = template.replace("$postText", data["postText"])
    write_page(template, f"./public/pages/projects/music/{data["postDate"][0]}-{data["postDate"][1]}-{data["postDate"][2]}_{data["postTitle"].lower().replace(" ", "_")}.html")

def generate_other(data, template):
    template = template.replace("$postTitle", data['postTitle'])

    if "postSubtitle" in data:
        template = template.replace("$postSubtitle", f'')
    else:
        template = template.replace('$postSubtitle', '')

    template = template.replace("$postDate", parse_date(data['postDate']))

    template = template.replace("$postTags", parse_tags(data["postTags"]))

    if "postLink" in data:
        template = template.replace("$postLink", f'<h2 class="creation-subtitle" style="margin:0;"><a href="{data["postLink"]}" target="blank">alternative link</a></h2>')
    else:
        template = template.replace('$postLink', '')

    if "postText" in data:
        template = template.replace("$postText", f'<p>$postText</p>')
    else:
        template = template.replace('$postText', '')


    write_page(template, f"./public/pages/projects/other/{data["postDate"][0]}-{data["postDate"][1]}-{data["postDate"][2]}_{data["postTitle"].lower().replace(" ", "_")}.html")

def generate_writing(data, template):
    template = template.replace("$postTitle", data["postTitle"])

    if "postSubtitle" in data:
        template = template.replace("$postSubtitle", f'<h2 class="creation-subtitle">{data["postSubtitle"]}</h2>')
    else:
        template = template.replace("$postSubtitle", "")

    template = template.replace("$postDate", parse_date(data['postDate']))
    template = template.replace("$postTags", parse_tags(data["postTags"]))


    if "postLink" in data:
        template = template.replace("$postLink", 
            f'<h2 class="creation-subtitle" style="margin:0;"><a href="{data["postLink"]}" target="blank">alternative link</a></h2>')
    else:
        template = template.replace("$postLink", "")

    template = template.replace("$postText", data["postText"])

    write_page(template, f"./public/pages/projects/writing/{data["postDate"][0]}-{data["postDate"][1]}-{data["postDate"][2]}_{data["postTitle"].lower().replace(" ", "_")}.html")

def write_page(page, path):
    with open(path, "w") as file:
        file.write(page)
    setters(path)

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

def parse_date(postDate):
    return f'{MONTH_ARRAY[postDate[1]]} {postDate[2]}, {postDate[0]}'

# Convert www.youtube.com and youtu.be links to embed links
def embedYoutube(url):
    if url[:17] == "https://youtu.be/":
        return "https://www.youtube.com/embed/" + url[17:]
    elif url[:32] == "https://www.youtube.com/watch?v=":
        return "https://www.youtube.com/embed/" + url[32:]
    else:
        return url


generate()