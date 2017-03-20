# coding:utf-8
'''
Created on 2016年8月24日

@author: mouzebo

pusher的socket处理
'''
import threading 
import socketserver
import json
import time

from Puhser import sendMsg as pushMsg
from Protocals import Protocals 

class DefaultHandler(socketserver.BaseRequestHandler):
    
    def setup(self):
        print("a new client connected")    
    
    def handle(self):
        while True:  
            try:    
                data_head = self.request.recv(5)  
                # 可能是用法有错哦，似乎defaultHanlder是对在一次处理一个以连接为单位的读写。即上个连接退出之前，下一个连接不会被处理。
                #上一个连接释放后，下一个连接的请求将被处理
                if data_head==b'':    
                    time.sleep(5)
                    continue
                head_num = int.from_bytes(data_head, byteorder="big")
                l = head_num & (0xFFFFFFFF)  # 包体长度  4字节
                proto = head_num >> 32 & (0xFF)  # 操作协议号  1字节            
            except Exception as ex:
                print(ex)
                self.request.sendall(bytes(Protocals.CONTENT_ERROR))  # 包头错误
            try:
                if proto == Protocals.APPLY_UNCONNECT:
                    self.request.sendall(bytes(Protocals.ALLOW_UNCONNECT))
                    break
                    
                data_content = self.request.recv(l)
                self.handleArg(proto, data_content)
                #self.request.send(bytes(Protocals.TRASPORT_SUCCEED)) # 通信成功
            
            except Exception as ex:
                print(ex)
                self.request.send(bytes(Protocals.CONTENT_ERROR))  # 包体参数错误
        # finally:
            # return
    
    def sendMsg(self, bs):
        data = bs.decode()  # default utf-8
        obj = json.loads(data)
        try:
            return pushMsg(obj["sendTo"], data)
        except:
            raise
    
    def handleArg(self, proto, bs):
        try:
            if proto & Protocals.PUSH_MSG == 1:
                self.sendMsg(bs)
        except:
            raise
   
class Sock(object):
    '''
    classdocs
    '''
    
    def __init__(self, host, port, handler=None):
        '''
        Constructor
        '''
        self._port = port
        self._host = host
        if not handler:
            self._handler = DefaultHandler
        else:
            self._handler = handler
    
    
        
    def startSock(self):
        print("start sock.....")
        if not self._handler:
            raise BaseException("没有处理程序")
        server = socketserver.TCPServer((self._host, self._port), self._handler)
        try:
            server_thread = threading.Thread(target=server.serve_forever)
            server_thread.daemon = True
            server_thread.start()
            print("start sock finished.")
        except Exception as ex:
            print(ex.traceback())
  
if __name__ == '__main__':
       pass
