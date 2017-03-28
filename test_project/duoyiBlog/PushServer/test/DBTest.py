# coding:utf-8
'''
Created on 2016年8月25日

@author: mouzebo

python连接数据库测试
'''

from pymongo import MongoClient as mongo_client
import pymysql
import time

def testPyMongo():
    client=mongo_client("localhost",27017)
    db=client.test;
    #db.user.insert_one({"name":u'牟泽波大魔王'})
    q=db.user.find_one_and_update({"userId":1234},{"$push":{"msg":"123"}})
    #q=db.user.find_one_and_update({},{"$set":{"msg":[]}})
    print(q)
    for r in db.user.find():
      print(r)
      print(r["name"])  


class MysqlClient(object):
    
    def __init__(self,host="localhost",port=3306,dbname=u"weibo",user=u"root",pswd=""):
        con=pymysql.connect(host='10.32.4.190',port=port,db="weibo",user=user,password=pswd)
        self._con=con
        self._cursor=con.cursor()
    
    def insertTest(self):
        try:
            sql="insert into `tbl_user` (`user_id`,`user_name`,`user_password`,`signup_time`) values(1,'mouzebo','123',"+repr(int(time.time()))+")"
            print(sql)
            r=self._cursor.execute(sql) 
            print(r)
            self._con.commit()
        except Exception as ex:
            print(ex.trace)
            return
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
#             ex.traceback
#             return     
    
    

if __name__ == '__main__':
    testPyMongo()