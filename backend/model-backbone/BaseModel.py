from abc import ABC, abstractmethod
import pickle
from datetime import datetime
import sys, os

from pdf2image import convert_from_path, convert_from_bytes
from pdf2image.exceptions import (
    PDFInfoNotInstalledError,
    PDFPageCountError,
    PDFSyntaxError
)

from urllib.request import urlopen

class BaseModel(ABC):

    png_files = []

    def __init__(self):
        self.current_dateTime = datetime.now().strftime("%Y-%b-%d T %H-%M-%S.%f")
        self.author_set_info()
    
    @abstractmethod
    def author_set_info(self):
        self.model_name = "Your model name"
        self.authors = "Your names"
        self.version = "vX.X"

    def get_info(self):
        info = {}
        info['model_name'] = self.model_name
        info['authors'] = self.authors
        info['version'] = self.version

        return info
    
    @abstractmethod
    def algorithm(self, pdf_url:str):
        # validate url

        # use code for pdf to img conversion

        # call other otherctions in subclass if required
        print("Overloaded this function to implement your algorithm")

        return

    def get_hyperparameters(self):
        hyp_par = {}
        hyp_par['not set'] = "You can set this you know!"
        return hyp_par

    def get_image(self):
        # Need to impliment :/
        print("not implimented")
        pass

    def generate_pickle(self, save_path=None):
        # filename = self.model_name+'_'+self.version+'_'+self.current_dateTime+'.pkl'
        # pickle.dump(self, open('model_pkls/'+filename, 'wb'))
        pass

    def convert_pdf(self, url:str):
        self.png_files = Utils.PdfToPng(url)
        print("created " + str(self.png_files))
        pass

    def cleanup(self):
        # clear the png files
        for file in self.png_files:
            os.remove(file)




# ================================================================================================================

class Utils():
    
    @staticmethod
    def PdfToPng(url:str):
        # Download temporarily
        orig_path = "temp/downloaded.pdf"
        pdf_file =  urlopen(url)
        with open(orig_path,'wb') as output:
            output.write(pdf_file.read())


        files = []

        images = convert_from_path("temp/downloaded.pdf")
        index = 0
        for image in images:
            name = "temp/transcript-{0}.png".format(index)
            files.append(name)
            image.save(name)
            index += 1
        
        os.remove(orig_path)

        return files
