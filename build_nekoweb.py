DIST_DIR = './dist'

with open(DIST_DIR + '/home.html', 'r') as file:
    content = file.read()

content = content[:content.find("<!-- BEGIN WEBRINGS -->")] + 'my webrings are linked on <a href="https://end-draconis.neocities.org">my neocities mirror</a>!' + content[content.find("<!-- END WEBRINGS -->") + 21:]

with open(DIST_DIR + '/home.html', 'w') as file:
    file.write(content)