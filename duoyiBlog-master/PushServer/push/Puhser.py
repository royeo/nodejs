# coding:utf-8
'''
Created on 2016年8月24日

@author: mouzebo

推送器
'''

import asyncio
import websockets

onClientSocket = {}
current_loop = object

# 消息协议
def decodeMsg(data):
    msgs = data.split(sep="|")
    if msgs.__len__() < 2:
        raise BaseException("参数异常:" + data)
    return {
            'userId':msgs[0],
            'msg':msgs[1]
    }

def sendMsg(userId, msg):
    #global current_loop
    #current_loop.run_until_complete(sendMsgAsync(userId, msg))
    #sendMsgAsync(userId, msg)
    tmp_loop=asyncio.get_event_loop_policy().new_event_loop()
    tmp_loop.run_until_complete(sendMsgAsync(userId, msg))
    print("set loop")
    print("end")
    tmp_loop.close() 


# 断开链接时暂时无法更新websocket队列，使用尝试发送的方式，如果该socket已关闭，则移除该websocket
async def sendMsgAsync(userId, msg):
    global onClientSocket
    if type(userId) == int:
        userId = str(userId)
    if userId not in onClientSocket:
        return False
    count = 0
    l = onClientSocket[userId].__len__();
    for e, i in zip(onClientSocket[userId], range(l)):
        try:          
            await e.send(msg)
        except Exception as ex:  # 认为该连接不再可用
            del onClientSocket[userId][i]  # 与websocket的handle做双重保险，实则一处即够(测试通过)
#             if onClientSocket[userId].__len__()==0:
#                 del onClientSocket[userId]
            print(ex)
            continue
        count = count + 1
    if count > 0:
        return True
    return False

async def receiveMsg(websocket, path):
    while True:
        try:
            data = await websocket.recv()
            ele = decodeMsg(data)
            if ele["userId"] == "":  # 游客模式，断开webSocket
                break
            
        except Exception as ex:
            print(ex)
            global onClientSocket
            client_list=onClientSocket[ele["userId"]]
            for e,i in zip(client_list,range(client_list.__len__())):
                if e is websocket:
                    del client_list[i] # 此处应该最多只有一个，不用考虑列表删除下标变化
                    break
            break  # 页面主动断开
            continue
      
        global onClientSocket
        if  ele["userId"] in onClientSocket:
            r = filter(lambda e:e is websocket, list(onClientSocket[ele["userId"]]))
            for p in r:  # 防止websocket重复添加
                continue
            onClientSocket[ele["userId"]].append(websocket)
        else:
            onClientSocket[ele["userId"]] = []
            onClientSocket[ele["userId"]].append(websocket)
server = object


def startServer(host="localhost", port=7000):
    print("start WebSocket .....")
    server = websockets.serve(receiveMsg, host, port)
    global current_loop
    current_loop = asyncio.get_event_loop()
    asyncio.get_event_loop().run_until_complete(server)
    asyncio.get_event_loop().run_forever()

    print("start WebSocket finished")
#     server_thread = threading.Thread(target=server.serve(poll_interval=0.5))
#     server_thread.daemon = True
#     server_thread.start()  
    
if __name__ == '__main__':
    # startServer()
    pass
