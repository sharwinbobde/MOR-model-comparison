from BaseModel import BaseModel

class DerivedModel(BaseModel):

    def author_set_info(self):
        self.model_name = "Logidtic Regression :("
        self.authors = "Sharwin Bobde"
        self.version = "v0.0.-1"

    def algorithm(self, pdf_url:str):
        print("implemented something here")


if __name__ == "__main__":
    obj = DerivedModel()
    print(obj.get_hyperparameters())