import json
import re
import shutil
import os

from PySide6.QtCore import QSize, QDate
from PySide6.QtGui import QPixmap
from PySide6.QtWidgets import (
    QApplication,
    QMainWindow,
    QGridLayout,
    QHBoxLayout,
    QWidget,
    QLineEdit,
    QPushButton,
    QComboBox,
    QTextEdit,
    QLabel,
    QFileDialog,
    QDateEdit,
)

outputDict = {
    'postType': '3d',
    'postTitle': '',
    'postSubtitle': '',
    'postLink': '',
    'postDate': [2020, 1, 1],
    'postFile': '',
    'postTags': [],
}

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        

        self.typesList = ('3d',
            '2d',
            'writing',
            'music',
            'games',
            'other'
        )
        self.tagsList = (
            '',
            '2023',
            '2024',
            '2025',
            'webdev',
            'dragon',
            'wof',
            'pride',
            'oc-amaranth',
            'oc-borealis',
            'oc-gharial',
            'oc-moon_moon',
            'oc-saguaro',
            'oc-sierra',
            'oc-snowreader',
            'oc-pflr_2',
        )

        self.defaultPath = 'E:/Creations/Programming/WebDev/Neocities Personal Site/end.site/public/'

        self.setWindowTitle("end.site Post Generator")
        self.setMinimumSize(QSize(600, 300))
        
        layout = QGridLayout()

        # Type Dropdown
        self.typeDropdown = QComboBox()
        self.typeDropdown.addItems(self.typesList)
        self.typeDropdown.currentIndexChanged.connect(self.typeChanged)
        layout.addWidget(self.typeDropdown, 0, 0)

        # Title Field
        self.titleText = QLineEdit()
        self.titleText.setPlaceholderText("Enter Post Title")
        self.titleText.textChanged.connect(lambda text: self.paramChanged('postTitle', text))
        layout.addWidget(self.titleText, 1, 0)

        # Subtitle Field
        self.subtitleText = QLineEdit()
        self.subtitleText.setPlaceholderText("Enter Post Subtitle")
        self.subtitleText.textChanged.connect(lambda text: self.paramChanged('postSubtitle', text))
        layout.addWidget(self.subtitleText, 1, 1)
        
        # Link URL Field
        self.linkText = QLineEdit()
        self.linkText.setPlaceholderText("Enter Post Link")
        self.linkText.textChanged.connect(lambda text: self.paramChanged('postLink', text))
        layout.addWidget(self.linkText, 2, 0)
        
        # Date Selector
        self.dateText = QDateEdit()
        self.dateText.setDisplayFormat("yyyy-MM-dd")
        # Arbitrary minimum around when i started making stuff
        self.dateText.setMinimumDate(QDate(2020, 1, 1))
        self.dateText.setCalendarPopup(True)
        self.dateText.dateChanged.connect(lambda text: self.paramChanged('postDate', text.getDate()))
        layout.addWidget(self.dateText, 2, 1)

        # Image Selector Button
        self.fileButton = QPushButton("Select Image")
        self.fileButton.pressed.connect(self.selectFile)
        layout.addWidget(self.fileButton, 3, 0)
        
        # Tag Editing Buttons
        tagsLayout = QHBoxLayout()
        self.tagsDropdown = QComboBox()
        self.tagsDropdown.addItems(self.tagsList)
        self.tagsDropdown.currentIndexChanged.connect(self.tagsChanged)
        tagsLayout.addWidget(self.tagsDropdown)

        self.clearButton = QPushButton("Clear Tags")
        self.clearButton.pressed.connect(self.clearTags)
        tagsLayout.addWidget(self.clearButton)

        tagsWidget = QWidget()
        tagsWidget.setLayout(tagsLayout)

        layout.addWidget(tagsWidget, 4, 0)
        
        # Tags Display
        self.tagsText = QLabel()
        layout.addWidget(self.tagsText, 4, 1)

        # Content Field
        self.contentText = QTextEdit()
        self.contentText.setPlaceholderText("Enter Post Text")
        self.contentText.textChanged.connect(lambda: self.paramChanged('postText', "this shouldn't show up"))
        layout.addWidget(self.contentText, 5, 0)

        # Image Preview
        self.imagePreview = QLabel()
        self.imagePreview.setPixmap(QPixmap("E:/Creations/Art!/COMPLETE/2024/Q4/sillay me pfp.png"))
        self.imagePreview.setScaledContents(True)
        layout.addWidget(self.imagePreview, 5, 1)

        # Complete Button
        generateButton = QPushButton("Generate!")
        generateButton.pressed.connect(self.generateFiles)
        layout.addWidget(generateButton, 0, 1)

        widget = QWidget()
        widget.setLayout(layout)
        self.setCentralWidget(widget)

        self.typeChanged(0)

    def selectFile(self):
        global outputDict
        self.fileText = QFileDialog.getOpenFileName(self, "Open File",
                                                    self.defaultPath, # Default directory
                                                    "Image Files (*.png *.jpg *.jpeg);;Audio Files (NOT IMPLEMENTED)")[0] # selectable files
        # Only do stuff if a file is actually selected
        if self.fileText != '':
            # Local filepath for use in the site
            # newPath = f"/pages/projects/{outputDict['postType']}/resources/" + re.sub(r"/.*/", "", self.fileText[2:])
            newPath = re.sub(r"/.*/", "", self.fileText[2:]) # I actually only use the name of the file on the JS side, and grab the filepath from the project type
            # Copy the file over to the appropriate resources folder
            print(f"{self.defaultPath}pages/projects/{outputDict['postType']}/resources/{newPath}")
            shutil.copy2(self.fileText, f"{self.defaultPath}pages/projects/{outputDict['postType']}/resources/{newPath}")

            self.fileText = newPath
            self.paramChanged('postFile', self.fileText)


    def typeChanged(self, index):
        self.paramChanged('postType', self.typesList[index])

        self.subtitleText.setReadOnly(False)
        self.linkText.setReadOnly(False)
        self.fileButton.setDisabled(False)
        match self.typesList[index]:
            case '2d':
                self.subtitleText.clear()
                self.subtitleText.setReadOnly(True)
            case '3d':
                self.subtitleText.clear()
                self.subtitleText.setReadOnly(True)
            case 'writing':
                self.fileText = ''
                self.fileButton.setDisabled(True)
            case 'music':
                # title, date, text, link, tags
                self.subtitleText.clear()
                self.subtitleText.setReadOnly(True)
                # disabling for now til i get a music player
                self.fileText = ''
                self.fileButton.setDisabled(True)
            case 'games':
                # title, date, text, link, tags 
                self.subtitleText.clear()
                self.subtitleText.setReadOnly(True)
                self.fileText = ''
                self.fileButton.setDisabled(True)
            case 'other':
                pass
            case _:
                print("shits fucked. no project type match")

    def paramChanged(self, parameter, value):
        global outputDict
        if parameter == 'postText':
            outputDict[parameter] = self.contentText.toPlainText().replace('\n', '<br>').replace('\t', '&emsp;')
        else: 
            outputDict[parameter] = value
        
        if parameter == 'postFile':
            self.imagePreview.setPixmap(QPixmap(self.defaultPath[:-1] + value))

    def tagsChanged(self, index):
        global outputDict
        outputDict['postTags'].append(self.tagsList[index])
        self.tagsText.setText(str(outputDict['postTags']))

    def clearTags(self):
        global outputDict
        outputDict['postTags'].clear()
        self.tagsText.setText(str(outputDict['postTags']))

    def generateFiles(self):
        global outputDict

        # Add the post type to the tags
        outputDict['postTags'].append(outputDict['postType'])
        
        fileName = str(outputDict['postTitle']).lower().replace(' ', '_')
        data = {}

        # TODO: generate JSON file in the right place, generate the HTML file, make sure any resource files are in the right spot, add JSON post to tags.js on the site
        # Generate the JSON post
        with open(f"{self.defaultPath}posts/{fileName}.json", mode='w', encoding='utf-8') as outputJSON:
            json.dump(outputDict, outputJSON, indent=1)
        # Add the post to the posts list
        with open(f"{self.defaultPath}resources/data.json", mode='r', encoding='utf-8') as dataFile:
            data = json.load(dataFile)
        data['posts'].append(f"{fileName}.json")
        with open(f"{self.defaultPath}resources/data.json", mode='w', encoding='utf-8') as dataFile:
            json.dump(data, dataFile, indent=1)
            print("dumped JSON")
        # Generate the HTML page
        with open(f"{self.defaultPath}pages/projects/{outputDict['postType']}/{fileName}.html", mode='w', encoding='utf-8') as outputHTML:
            outputHTML.write(f'''
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <meta name="pinterest" content="nopin" />
    <meta name="description" content="personal blog and portfolio of end!">
    <link rel="icon" type="image/png" href="/resources/images/aroace_dragon.PNG"/> <!-- sets tab icon -->
    <title>end.site</title> <!-- name it shows on the tab -->
    <link href="/style.css" rel="stylesheet" type="text/css" media="all"><!-- stylesheet import -->
  </head>
  <body onload="parsePost('/posts/{fileName}.json')">
    <!-- navbar div -->
    <div class="header" id="header"><p>SOME PAGES WILL NOT WORK WITHOUT JAVASCRIPT &emsp;&emsp;<a class="noJS" href="/index.html">Home</a> | <a class="noJS" href="/pages/about/index.html">About</a> | <a class="noJS" href="/pages/blog/index.html">Blog</a> | <a class="noJS" href="/pages/projects/index.html">Creations</a> | <a class="noJS" href="/pages/socials/index.html">Socials</a> | <a class="noJS" href="/pages/links/index.html">Linkies</a></p></div>    <!-- site content begins -->
    <div class="main_content" id="creation_page">
    </div>
    <!-- fixed footer here -->
    <footer>
      <p class="footer" id="last_modified"></p>
    </footer>
    <script src="/script/header.js"></script>
    <script src="/script/posts.js"></script>
  </body>
</html>
            ''')


app = QApplication([])

window = MainWindow()
window.show()

app.exec()