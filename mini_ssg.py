#! /bin/python
"""Mini static site generator

Author: end draconis
"""

import glob
import os
import re
import shutil
import tomllib

"""
Tasks:
- Copy every non-HTML file to /dist unmodified
    - Except posts, which are JSON (translate to TOML?? much nicer)
- Generate post pages from JSON post data (located in same position they should be in /dist, no special folder)
- Recursively loop over every HTML file, __recursively__ replace templates ({{ }}) with content from /templates
    - Allows nesting templates inside templates
- Copy over modified HTML files to /dist

Templates:
- Simple templates: just plain replace with template content
- Generated templates: various types of programatically generated templates
- Data templates: For use in post templates, replaced with data from JSON (or whateva data format) matching name
"""

SOURCE_DIR = './src'
DIST_DIR = './dist'
TEMPLATE_DIR = './templates'
MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

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
    
    # Populated by post loop. [{name, posts[]}]
    tags = {}
    
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
                tags[tag] = tags[tag] + [{'type':  data.get('type'), 'title': data.get('title'), 'date': data.get('date'), 'name': post[post.find('/'):]}]
            else:
                tags[tag] = [{'type':  data.get('type'), 'title': data.get('title'), 'date': data.get('date'), 'name': post[post.rfind('/') + 1:-5]}]
        
        content = applyTemplates(content, data)
        
        newpath = post.replace(SOURCE_DIR, DIST_DIR)
        newpath = newpath[:newpath.rfind('/')]
        os.makedirs(newpath, exist_ok = True)
        
        with open(post.replace(SOURCE_DIR, DIST_DIR).replace('.toml', '.html'), 'w') as file:
            file.write(content)
    
    print(tags)
    
    # Replace templates
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
                text = re.sub(r'{{.*}}', 'blogPosts', text, count = 1)
        elif 'data:' in name:
            # Data template
            field = name[5:].strip()
            if field == 'type':
                text = subData(text, data['type'], field, data)
            elif field == 'title':
                text = subData(text, f'<h1 class="creation-title">{data.get(field)}</h1>', field, data)
            elif field == 'subtitle':
                text = subData(text, f'<h2 class="creation-subtitle">{data.get(field)}</h2>', field, data)
            elif field == 'link':
                text = subData(text, f'<a href="{data.get(field)}">Link</a>', field, data)
            elif field == 'date':
                text = subData(text, f'<h3 class="creation-date">{MONTHS[data.get(field)[1]]} {data.get(field)[2]}, {data.get(field)[0]}</h3>', field, data)
            elif field == 'file':
                text = subData(text, data.get(field), field, data)
            elif field == 'text':
                text = subData(text, data.get(field), field, data)
            elif field == 'tags':
                replace = '<ul class="creation-tags">'
                for tag in data.get(field):
                    replace += f'\n<li><a href="/creations/tags/{tag}">{tag}</a></li>'
                replace += '</ul>'
                
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
        return re.sub(r'{{.*}}', '', text, count = 1)

if __name__ == '__main__':
    main()