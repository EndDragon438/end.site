#! /bin/python
"""Mini static site generator

Highly specific SSG just for my use. Basically implementing server-side
includes, but without the server (just statically pregenerating content).

Formatting is inspired by Liquid templating.

There are 3 types of templates: simple templates, data templates, and
generated templates.

Simple templates are just find-and-replace, nothing to it.

Data templates are used for populating same-format pages with data from a
serialized data format (TOML right now), mainly the /creations/ pages.

Generated templates are used for slightly more complex stuff, usually for
navigation, like the tag pages and the blog homepage.

Feel free to take inspiration or even just copy. If you've got questions,
feel free to ask. I'm here to make the indie web more accessible!

Author: end draconis
License: GPL v3.0 https://www.gnu.org/licenses/gpl-3.0.en.html
Updated: July 2, 2026
"""

import datetime
import glob
import os
import re
import shutil
import tomllib

SOURCE_DIR = './src'
DIST_DIR = './dist'
TEMPLATE_DIR = './templates'
MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
blogPosts = []

def main():
    """Collect all files, then execute necessary functions on them
    """
    # Remove old dist
    if os.path.isdir(DIST_DIR): shutil.rmtree(DIST_DIR)
    
    # Collect all files
    paths = [p for p in glob.glob(SOURCE_DIR + '/**/*', recursive = True) if os.path.isfile(p)]
    
    # Break up by type
    files = [p for p in paths if '.html' not in p and '.toml' not in p]
    pages = [p for p in paths if '.html' in p]
    posts = [p for p in paths if '.toml' in p]
    blogs = [p for p in paths if 'index.html' not in p and '/blog' in p]
    
    global blogPosts
    
    for blog in blogs:
        blogPosts += [{'title': blog[blog.find('_') + 1:-5].replace('-', ' '), 'date': [int(x) for x in blog[blog.rfind('/') + 1:blog.find('_')].split('-')]}]

    # Populated by post loop. [{name, posts[]}]
    tags = {}
    
    # Add manual posts to tags
    with open(f'{TEMPLATE_DIR}/tags.toml', 'rb') as file:
        tags = dict(tomllib.load(file))
    
    # Plain copy over non-HTML
    for file in files:
        newfile = file.replace(SOURCE_DIR, DIST_DIR)
        newfile = newfile[:newfile.rfind('/')]
        os.makedirs(newfile, exist_ok = True)
        shutil.copy(file, newfile)
    
    # Need to do posts first so tag pages are populated correctly
    for post in posts:
        with open(post, 'rb') as file:
            data = tomllib.load(file)
        with open(f'{TEMPLATE_DIR}/{data['type']}', 'r') as file:
            content = file.read()
        for tag in [data['type']] + data.get('tags'):
            if tag in tags:
                tags[tag] = tags[tag] + [{'type':  data.get('type'), 'title': data.get('title'), 'date': data.get('date'), 'name': post[post.rfind('/') + 1:-5]}]
            else:
                tags[tag] = [{'type':  data.get('type'), 'title': data.get('title'), 'date': data.get('date'), 'name': post[post.rfind('/') + 1:-5]}]
        
        content = applyTemplates(content, data)
        
        newpath = post.replace(SOURCE_DIR, DIST_DIR)
        newpath = newpath[:newpath.rfind('/')]
        os.makedirs(newpath, exist_ok = True)
        
        with open(post.replace(SOURCE_DIR, DIST_DIR).replace('.toml', '.html'), 'w') as file:
            file.write(content)

    # Build tag pages
    os.makedirs(f'{DIST_DIR}/creations/tags/', exist_ok = True)
    with open(f'{TEMPLATE_DIR}/tag', 'r') as file:
        tagPage = file.read()
    for tag in tags:
        content = applyTemplates(tagPage, {'name': tag, 'posts': tags[tag]})
        with open(f'{DIST_DIR}/creations/tags/{tag}.html', 'w') as file:
            file.write(content)
    
    # Build tag list page
    with open(f'{TEMPLATE_DIR}/tagged', 'r') as file:
        content = file.read()
    content = applyTemplates(content, list(tags.keys()))
    with open(f'{DIST_DIR}/creations/tagged.html', 'w') as file:
        file.write(content)
    
    # Replace templates in static pages
    for page in pages:
        with open(page, 'r') as file:
            content = file.read()
        
        content = applyTemplates(content)
        
        newpath = page.replace(SOURCE_DIR, DIST_DIR)
        newpath = newpath[:newpath.rfind('/')]
        os.makedirs(newpath, exist_ok = True)
        
        with open(page.replace(SOURCE_DIR, DIST_DIR), 'w') as file:
            file.write(content)

def applyTemplates(text, data = None):
    """Apply templates to a piece of text
    
    Used by both static HTML pages and pages generated from JSON post data.
    """
    while re.search(r'{{.*}}', text):
        name = re.search(r'{{.*}}', text).span()
        name = text[name[0] + 2: name[1] - 2].strip()
        if 'gen:' in name:
            # Generated template (handles tags and other lists)
            operation = name[4:].strip()
            if operation == 'blogPosts':
                # List all blog posts
                replace = '<ul id="blogPosts">'
                # Sort blog posts by date
                def blogSort(post):
                    return datetime.datetime(*post['date'])
                
                blogPosts.sort(key = blogSort)
                blogPosts.reverse() # Latest first
                for post in blogPosts:
                    replace += f'\n<li><a href="/blog/{'-'.join([f'{x:02}' for x in post['date']])}_{post['title'].replace(' ', '-')}.html">{post['title']} | {MONTHS[post['date'][1] - 1]} {post['date'][2]}, {post['date'][0]}</a></li>'
                replace += '\n</ul>'
                text = re.sub(r'{{.*}}', replace, text, count = 1)  # TODO
            elif operation == 'tagName':
                text = re.sub(r'{{.*}}', data['name'], text, count = 1)
            elif operation == 'pageList':
                # List all pages in a specific tag
                replace = '<ul id="tagList">'
                for post in data['posts']:
                    replace += f'\n<li><a href="/creations/{post['type']}/{post['name']}.html">{post['title']} | {MONTHS[post['date'][1] - 1]} {post['date'][2]}, {post['date'][0]}</a></li>'
                replace += '\n</ul>'
                
                text = re.sub(r'{{.*}}', replace, text, count = 1)
            elif operation == 'tagList':
                # List all tags in use
                data.sort()
                replace = '<ul id="tagList">'
                for tag in data:
                    replace += f'\n<li><a href="/creations/tags/{tag}.html">{tag}</a></li>'
                replace += '\n</ul>'
                text = re.sub(r'{{.*}}', replace, text, count = 1)
            elif operation == 'listScripts':
                # List all scripts in the /scripts/ directory
                replace = '<ul>'
                for file in [f for f in os.listdir(f'{SOURCE_DIR}/scripts') if f[-3:] == '.js']:
                    replace += f'\n<li><a href="/scripts/{file}">{file[:-3]}</a></li>'
                replace += '\n</ul>'
                text = re.sub(r'{{.*}}', replace, text, count = 1)
        elif 'data:' in name:
            # Data template
            field = name[5:].strip()
            if field == 'type':
                text = subData(text, data['type'], field, data)
            elif field == 'title':
                text = subData(text, data.get(field), field, data)
            elif field == 'subtitle':
                text = subData(text, data.get(field), field, data)
            elif field == 'link':
                text = subData(text, data.get(field), field, data)
            elif field == 'date':
                text = subData(text, f'{MONTHS[data.get(field)[1] - 1]} {data.get(field)[2]}, {data.get(field)[0]}', field, data)
            elif field == 'file':
                text = subData(text, data.get(field), field, data)
            elif field == 'text':
                text = subData(text, data.get(field), field, data)
            elif field == 'tags':
                replace = '<ul class="creation-tags">'
                for tag in data.get(field):
                    replace += f'\n<li><a href="/creations/tags/{tag}.html">{tag}</a></li>'
                replace += '\n</ul>'
                
                text = subData(text, replace, field, data)
            else:
                raise ValueError(f'Unrecognized data template: {field} in:\n{data}')
        else:
            # Simple replacement template
            with open(f'{TEMPLATE_DIR}/{name}', 'r') as file:
                template = file.read()
            text = re.sub(r'{{.*}}', template, text, count = 1)
    return text

def subData(text, replacement, field, data):
    if field in data:
        return re.sub(r'{{.*}}', replacement, text, count = 1)
    else:
        return re.sub(r'.*{{.*}}.*', '', text, count = 1) # NOTE: this is a fuckin patchy job, only works if the template elem has it's own line

if __name__ == '__main__':
    main()