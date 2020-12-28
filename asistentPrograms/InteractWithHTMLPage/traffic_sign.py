class Traffic_Sign:

    def __init__(self, title, description, imagesrc):
        self.title = title
        self.description = description
        self.imagesrc = imagesrc

    def getTitle(self):
        return self.title

    def getDescription(self):
        return self.description

    def getImagesrc(self):
        return self.imagesrc