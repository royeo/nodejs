# coding:utf-8
'''
Created on 2016年8月24日

@author: admin

程序code protocal
'''


class Protocals(object):
    
    
    """
         动作协议
    """
    # 推送消息
    PUSH_MSG = 0x1
    # 接收包体(代表可传送包体)
    READY_RECI = 0x1
    # 客户端将断开连接
    APPLY_UNCONNECT=0x2
    # 服务端允许断开
    ALLOW_UNCONNECT=0x3
       
    
    
    
    """
         状态协议
    """
    # 通讯完成
    TRASPORT_SUCCEED = 0x10    
    # 包头错误
    HEAD_ERROR = 0x5
    # 包体参数错误
    CONTENT_ERROR = 0x6
    
    
    
    
    
    
    
    """状态协议"""
    
    
    def __init__(self):
       pass
       
