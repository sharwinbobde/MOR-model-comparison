import httpimport

httpimport.INSECURE = True

if __name__ == "__main__":
    package_url = 'file:///home/sharwinbobde/Studies/MOR/platform/backend/python-backend'

    BaseModel = httpimport.load('BaseModel', package_url)
    DerivedModel = httpimport.load('DerivedModel', package_url).DerivedModel


    model = DerivedModel()
    print(model.get_info())