# coding:utf-8
'''
Created on 2016年8月23日

@author: mouzebo
'''
from websockets.client import WebSocketClientProtocol
from logging import raiseExceptions
from pip._vendor.colorama.win32 import CONSOLE_SCREEN_BUFFER_INFO
"""
   测试websocket与客户端的连接
"""

import asyncio
import websockets
import sys

connected={}
def decodeMsg(data):

    msgs=data.split(sep=':')
    if msgs.__len__()<2:
     raise BaseException("参数异常")
    return {
            'user':msgs[0],
            'msg':msgs[1]        
    }

async def test(websocket, path):
    while True:
        data = await websocket.recv()
        try:
            #ele= decodeMsg(data)
            print(data)
        except Exception as ex:
            ex.traceback()
            continue
        global connected
        #connected[ele["user"]]=websocket
        print("in<<{}".format(data))
        greet = "out>>{}".format("hello" + data)
        print(websocket);
        print(sys.getsizeof(websocket, 0))
        await websocket.send(greet);
        print(len(connected))
print("start")
server = websockets.serve(test, "localhost", 7000);
asyncio.get_event_loop().run_until_complete(server);
asyncio.get_event_loop().run_forever();
print("start ok")


if __name__ == '__main__':
    pass
