__author__ = 'ilya'

from motor import MotorClient, Op
from tornado.web import *
import tornado.gen as gen
import tornado.ioloop
import bson.json_util as json
from bson.objectid import ObjectId
from random import randrange


client = MotorClient()
client.open_sync()
db = client['dogentine']

class CardsHandler(RequestHandler):

    @gen.engine
    @asynchronous
    def get(self):
        cards_cursor = db.cards.find()
        cards = yield Op(cards_cursor.to_list)
        self.write(json.dumps(cards))
        self.finish()

    @gen.engine
    @asynchronous
    def post(self):
        card = json.loads(self.request.body)
        card = yield Op(db.cards.insert, card)
        self.write(json.dumps(card))
        self.finish()


class CardHandler(RequestHandler):

    @gen.engine
    @asynchronous
    def get(self, card_id):
        card = yield Op(db.cards.find_one, ObjectId(card_id))
        self.write(json.dumps(card))
        self.finish()


class WowsHandler(RequestHandler):

    @gen.engine
    @asynchronous
    def get(self):
        wows_count = yield Op(db.wows.count)
        if wows_count > 31:
            wows = []
            for x in range(30):
                wow = yield Op(db.wows.find().limit(-1).skip(randrange(wows_count-1)).next)
                wows.append(wow)
        elif wows_count == 0:
            wows = []
        else:
            wows_cursor = db.wows.find()
            wows = yield Op(wows_cursor.to_list)
        self.write(json.dumps(wows))
        self.finish()

    @gen.engine
    @asynchronous
    def post(self):
        wow = json.loads(self.request.body)
        wow_id = yield Op(db.wows.insert, wow)
        self.write(json.dumps(wow_id))
        self.finish()


class CardsCountHandler(RequestHandler):

    @gen.engine
    @asynchronous
    def get(self):
        count = yield Op(db.cards.count)
        self.write(json.dumps({'counter': count}))
        self.finish()


class WowsCountHandler(RequestHandler):

    @gen.engine
    @asynchronous
    def get(self):
        count = yield Op(db.wows.count)
        self.write(json.dumps({'counter': count}))
        self.finish()


application = Application([
    (r"/api/cards", CardsHandler),
    (r"/api/cards/count", CardsCountHandler),
    (r"/api/cards/(.*)", CardHandler),
    (r"/api/wows", WowsHandler),
    (r"/api/wows/count", WowsCountHandler)
])

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()