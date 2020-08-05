import falcon
import json

class RemoteResource(object):
    def on_get(self, req, resp):
        doc = {
            "text":[
                {
                    "subtext": "1..."
                },
                {
                    "subtext": "2..."
                },
            ]
        }
        resp.status = falcon.HTTP_200
        resp.body = json.dumps(doc)

app = falcon.API()
resource = RemoteResource()
app.add_route('/resource', resource)