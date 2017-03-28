'''
Created on 2016年8月26日

@author: mouzebo

Socket测试
'''
from PushServer import PushServer as msgQuene
from DBClient import StatusPersistence, MysqlClient

class SocketTestClient(object):
    
    def __init__(self, h, p):
        self.h = h
        self.p = p        
        mg_client = StatusPersistence(host="localhost", port=27017, dbname="test")
        my_client = MysqlClient(host="10.32.4.190", port=3306, dbname="weibo")
        self.msgQuene = msgQuene(h, p, mg_client, my_client)
        
    def sendMsg(self):
        print("send")
        self.msgQuene.onWriteMsg(1, "{\"photo\":\"123412314123142131413\"}")
    
    def testOn(self,i):
        self.msgQuene.userOn(i)
        
     

if __name__ == '__main__':
    socketTest = SocketTestClient("localhost", 6700)
    socketTest.sendMsg()
    socketTest.msgQuene.close_request()
    #for i in range(100):
    #   socketTest.testOn(i)
    #    print(i)
    
