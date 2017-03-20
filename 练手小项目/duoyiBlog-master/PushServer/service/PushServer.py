# coding:utf-8
'''
Created on 2016年8月25日

@author: admin
'''

import struct
import json
from socket import socket 

from Protocals import Protocals
from DBClient import  StatusPersistence, MysqlClient


class PushServer(object):
    '''
    classdocs
    '''
    
    def __init__(self, host, port, mg_client, my_client):
        '''
        Constructor
        '''

        self._pushSock = socket()
        self._pushSock.connect_ex((host, port))
        self._mg_client = mg_client
        self._my_client = my_client
   
    # 用户上线
    def userOn(self, ownUserId):
        self.receiveMsgsByUserId(ownUserId)
        self._mg_client.logIn(ownUserId)
     
    # 用户下线
    def userOut(self, ownUserId):
        self._mg_client.logOut(ownUserId)
        
    # 获取属于自己的消息    
    def receiveMsgsByUserId(self, userId):
        if userId is None:
            return 
        bs = self.getMsgByuserId(userId)
        if bs is not None:
            self._pushSock.sendall(bs)
            return True
        return False
        
    # 消息体包装
    def wrapperMsg(self, proto, msg, userId):
        if userId is not None:
            content_wrapper = {"sendTo":userId, "data":msg}
        else:
            content_wrapper=""
        bs = bytes(json.dumps(content_wrapper), "utf8")
        # head = struct.pack("ci", proto.to_bytes(1, byteorder="big"), len(bs).to_bytes(4,"big"))  
        head = struct.pack(">bi", proto, bs.__len__())
        return head + bs
     
    # 扇出写
    def onWriteMsg(self, userId, msg):
        msg_dict = object
        if isinstance(msg, str):
            try:
                msg_dict = json.loads(msg)
            except:
                raise
        else:
            msg_dict = msg
        msg_dict["proto"] = "broadcast"
        followers = self._my_client.getFollowers(userId)
        if followers is not None:
            self._mg_client.inMsg2Quene(followers, json.dumps(msg_dict))
            self.notifyPush(followers)

    # 根据用户Id获取消息
    def getMsgByuserId(self, userId):
        msgs = self._mg_client.getMsgQueueByUserId(userId, lazy=False) # lazy为真时只获取而不清楚之前的消息队列
        if msgs is not None:
            return self.wrapperMsg(Protocals.PUSH_MSG, msgs, userId)
        else:
            return None 
   
    # 通知在线客户端接收
    def notifyPush(self, userIds):
        lineOn_users = self._mg_client.filterLineOn(userIds,{"userId":1})
        #self._mg_client.getMsgByuserId(lineOn_users)(lambda e:self.receiveMsgsByUserId(e))
        for e in lineOn_users:
            self.receiveMsgsByUserId(e["userId"])
            
    # 关闭该socket        
    def close_request(self):
        self._pushSock.sendall(self.wrapperMsg(Protocals.APPLY_UNCONNECT, "", None))
        
if __name__ == "__main__":
    try:
        mg_client = StatusPersistence(host="localhost", port=27017, dbname="test")
        my_client = MysqlClient(host="10.32.4.190", port=3306, dbname="weibo")
        PushServer("localhost", 6700, mg_client, my_client);
    except Exception as ex:
        ex.traceback()
        exit(0)
