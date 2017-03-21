# coding:utf-8
'''
Created on 2016年8月25日

@author: admin
'''

from pymongo import MongoClient as mongo_client
import pymysql
import json

class StatusPersistence(object):
    '''
    classdocs
    ''' 

    MSG_QUENE_COL = "msg"

    USER_LIVE_COL = "userlive"

    def __init__(self, host="localhost", port=27017, dbname="test"):
        '''
        Constructor
        '''
        self._host = host
        self._port = port
        self._dbname = dbname
        self.connectMongo()
        self._user_col=self._db[StatusPersistence.USER_LIVE_COL]
    
    
    def connectMongo(self):
        client = mongo_client(self._host, self._port)
        self._db = client[self._dbname]
 
 
    def getMsgQueueByUserId(self, userId, lazy=False):
        col = self._db[StatusPersistence.MSG_QUENE_COL]
        if not lazy:
            msgs = col.find_one_and_update({"userId":userId}, {"$set":{"msgQuene":[]}})
        else:
            msgs = col.find_one({"userId":userId})
        
        if msgs is not None and not  msgs["msgQuene"].__len__() == 0:
            return msgs["msgQuene"]
        else:
            return None
            
    # 扇出写   
    # msg应该是一个包含消息协议的完整消息 
    def inMsg2Quene(self, userIds, msg):
        col = self._db[StatusPersistence.MSG_QUENE_COL]
        try:
            msg_obj=json.loads(msg)
        except:
            raise
        if isinstance(userIds, list):
            r = col.update_many({"userId":{"$in":userIds}}, {"$push":{"msgQuene":msg_obj}},True)  # 第三个参数是否upsert
#             if r["nModified"]<userIds.__len__(): # 存在之前不存在的 
#                 r=col.update({"userId":{"$exists":False},"msgQuene":[msg]})
        else:
            r = col.update_one({"userId":userIds}, {"$push":{"msgQuene":msg_obj}}) 
            if r["nModified"]==0: #  本来不存在
                r=col.insert_one({"userId":userIds,"msgQuene":msg_obj})
        
        return r

    # 登录
    def logIn(self,userId):
        r= self._user_col.find_one_and_update({"userId":userId},{"$set":{"lineOn":True}})
        if r is None:
            self._user_col.insert_one({"userId":userId,"lineOn":True})
    # 登出
    def logOut(self,userId):
        self._user_col.find_one_and_update({"userId":userId},{"$set":{"lineOn":False}}) 
 
    # 筛选出在线的用户
    def filterLineOn(self, userIds,proj={}):
        col = self._db[StatusPersistence.USER_LIVE_COL]
        r = []
        rcursor = col.find({"userId":{"$in":userIds}, "lineOn":True},proj)
        for e in rcursor:
            r.append(e)
        return r

class MysqlClient(object):
    
    def __init__(self, host="localhost", port=3306, dbname="weibo", user="root", pswd=""):
        con = pymysql.connect(host, port=port, db=dbname, user=user, password=pswd)
        self._con = con
        self._cursor = con.cursor()
    
    def CRUD(self, sql):
        try:
            self._cursor.execute(sql)
            if "select" not in sql:  # 查询
                return self._con.commit()
            else:
                return self._cursor.fetchall()
        except:
            raise
        
    
    # 返回自己的跟随者
    def getFollowers(self, ownId):
        sql = "select `follower_id`  from `tbl_follow` where `master_id`=" + repr(ownId)
        tuples = self.CRUD(sql)
        r=[]
        for e in tuples:
            r.append(e[0])
        return r
    
    
    
#     connections=[]
#     waitQuene=[]
#     
#     def __init__(self,host="localhost",port=3306,dbname="weibo",user="root",pswd=""):
#         try:
#             if MysqlClient.connections.__len__()<10:
#                newCon=pymysql.connect(host)
#                e={"con":self._con,"busy":True}
#                self._wrapper_con=e
#                MysqlClient.connections.__add__(e)
#             else:
#                validCons=MysqlClient.connections.filter(lambda e: not e["busy"])
#                if validCons.__len__()==0:
#                    MysqlClient.waitQuene.__add__(self)
#                else:
#                    e=validCons[validCons.__len__()]
#                    e["busy"]=True
#                    self._con=e
#         except Exception as ex:
#             ex.traceback()
#             return     
    



if __name__ == "__main__":
    # StatusPersistence("localhost", 27017) 
    print(MysqlClient(host='10.32.4.190').getFollowers(1))
