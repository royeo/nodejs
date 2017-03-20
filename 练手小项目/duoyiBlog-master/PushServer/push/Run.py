# coding:utf-8
'''
Created on 2016年8月25日

@author: mouzebo

推送进程启动脚本
启动进程通讯的socket和推送作为一个进程
'''
from Sock import Sock
from Puhser import startServer as startPushServer
def startProj(sock_h="localhost",sock_p=6700,push_h="localhost",push_p=7000):
    Sock(sock_h,sock_p).startSock() # 启动socket应用于进程间通信
    startPushServer(push_h,push_p) # 启动推送服务以进行推送
   
if __name__ == '__main__':
    startProj()