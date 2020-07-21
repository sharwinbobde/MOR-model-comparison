from abc import ABC, abstractmethod
import pickle
from datetime import datetime

class BaseModel(ABC):

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
        pass

    def generate_pickle(self, save_path=None):
        # filename = self.model_name+'_'+self.version+'_'+self.current_dateTime+'.pkl'
        # pickle.dump(self, open('model_pkls/'+filename, 'wb'))
        pass

