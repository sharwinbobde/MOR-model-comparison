import httpimport
import time

httpimport.INSECURE = True

if __name__ == "__main__":

    # Test Model import
    package_url = 'file:///home/sharwinbobde/Studies/MOR/MOR-model-comparison/backend/model-backbone'

    BaseModel = httpimport.load('BaseModel', package_url)
    DerivedModel = httpimport.load('DerivedModel', package_url).DerivedModel


    model = DerivedModel()
    print(model.get_info())

    # Test PDF to PNG conversion
    filepath= 'file:///home/sharwinbobde/Downloads/evanescence__my_immortal.pdf'
    sample_url = "https://mor-sheet-music.s3-eu-west-1.amazonaws.com/test/evanescence__my_immortal.pdf"

    model = DerivedModel()
    model.convert_pdf(sample_url)

    # Delete files after 5 secs to check cleanup
    time.sleep(5)
    model.cleanup()
    