# coding:utf-8
'''
Created on 2016年8月29日

@author: mouzebo
推送的http服务
'''
import re
from http.server import SimpleHTTPRequestHandler,HTTPServer,\
                        BaseHTTPRequestHandler
from http import HTTPStatus
import urllib
import json

from PushServer import PushServer 
from DBClient import  StatusPersistence, MysqlClient
from pymysql import paramstyle

class PushHttpRequestBaseHandler(SimpleHTTPRequestHandler):
    
    GET_TOKEN = "feijfqlogrlrnjfifwjaf547848awfwahhgwaj"
    
    POST_TOKEN = "jfipqlqjojqmgfqpoj5644aweq6541546433464"
    
    # regex url
    def reMatch(self, data):
        method_with_param = re.match("/(.*)\?(.*)", data, re.U)  # 匹配带参的方法
        if method_with_param is None:  # 匹配不带参的方法
            return re.match("/(.*)", data, re.U)
        return method_with_param
    
    def do_GET(self):        
        parts = self.reMatch(self.path)
        if parts is None:
            super().do_GET()
            return
        method = parts.group(1)
        params = None
        if '?' in self.path:  # group 2 存在
            params = parts.group(2)
        if  not hasattr(self, method):            
            super().do_GET()
            return
        method = getattr(self, method)
        if params is not None:
            params = urllib.parse.parse_qs(urllib.parse.unquote(params))
        try:
            get_result = method(params)
        except:
            self.send_error(HTTPStatus.INTERNAL_SERVER_ERROR, 'Please wait for a short time,we will solve the problem as soon as possible ^_^')
            #self.wfile.write(bytes(self._resWrapper(HTTPStatus.INTERNAL_SERVER_ERROR, u'请稍等，我们会尽快为您解决这个问题^_^'),"utf8"))
            return
        self.send_response(HTTPStatus.OK)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        if get_result is not None:
            self.wfile.write(bytes(self._resWrapper(get_result[0], get_result[1]),"utf8"))
        else:
            self.wfile.write(bytes(self._resSucWrapper(""),"utf8"))
    
    def do_POST(self):
        token = self._getAuthToken()
        if not token == PushHttpRequestBaseHandler.POST_TOKEN:
            self.send_error(HTTPStatus.UNAUTHORIZED,
                             "Not Authorized with token error (%s)" % token)
            return
        parts = self.reMatch(self.path)
        if parts is None:
            self.send_error(
                HTTPStatus.NOT_FOUND,
                "Unsupported request (%r) with TYPE POST" % self.path)
            return
        method = parts.group(1)
        params = self._getPostParams()
#         if not 'token' in params:
#             self.send_error(HTTPStatus.UNAUTHORIZED,
#                             "Not Authorized with token error (which values None)")
#             return
#         if  not params['token'][0]== PushHttpRequestBaseHandler.POST_TOKEN:
#             self.send_error(HTTPStatus.UNAUTHORIZED,
#                             "Not Authorized with token error (which values %s)"%str(params['token'][0]))
#             return
        if  not hasattr(self, method):            
            self.send_error(
                HTTPStatus.NOT_FOUND,
                "Unsupported request (%r) with TYPE POST" % self.path)
            return
        method = getattr(self, method)
        try:
            post_result = method(params) # post result 应该是一个元祖
        except:
            self.send_error(HTTPStatus.INTERNAL_SERVER_ERROR, 'Please wait for a short time,we will solve the problem as soon as possible ^_^')
            #self.wfile.write(bytes(self._resWrapper(HTTPStatus.INTERNAL_SERVER_ERROR, u'请稍等，我们会尽快为您解决这个问题^_^'),"utf8"))
            return
        self.send_response(HTTPStatus.OK)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        if post_result is not None:
            self.wfile.write(bytes(self._resWrapper(post_result[0], post_result[1]),"utf8"))
        else:
            self.wfile.write(bytes(self._resSucWrapper(""),"utf8"))

    def _getPostParams(self):
        datas = self.rfile.read(int(self.headers['content-length']))
        datas = urllib.parse.parse_qs(urllib.parse.unquote(datas.decode("utf8")))
        # datas=transDicts(datas)
        return datas
        
    def notify(self, params):
        self.wfile.flush()
        return (0,"推送服务器返回")
        
    def _resSucWrapper(self,msg):
        return json.dumps({'code':0,'data':msg})
    
    def _resWrapper(self,code,msg):
        return json.dumps({'code':code,'data':msg})

    def _getAuthToken(self):
        if not 'Authorization' in self.headers:
            return "No Auth was given"
        arg = self.headers['Authorization'] 
        args = arg.split(sep="|", maxsplit=1)
        if args.__len__() < 2 or not args[0].upper() == 'TOKEN':
            return "No Token was given"
        return args[1]

_pusher=None

def getPusher():
    global _pusher
    if _pusher==None:
        try:
            mg_client = StatusPersistence(host="localhost", port=27017, dbname="test")
            my_client = MysqlClient(host="10.32.4.190", port=3306, dbname="weibo")
            _pusher=PushServer("localhost", 6700, mg_client, my_client);
        except Exception as ex:
            ex.traceback()
            exit(0)
    return _pusher

class PushHttpRequestHandler(PushHttpRequestBaseHandler):
    
    def notify(self,params):
        if params is None or not 'userId' in params:
            return (1,'userId should never be none')
        getPusher().notifyPush(self, params["userId"])
        return (0,"")
     
    def userOn(self,params):
        if params is None or not 'userId' in params:
            return (1,"userId should never be none")
        getPusher().userOn(params["userId"])
        return (0,"")
        
    def userOut(self,params):
        if params is None or not 'userId' in params:
            return (1,"userId should never be none")
        getPusher().userOut(params['ownUserId'])
        return (0,"")
        
    def onWriteMessage(self,params):
        if params is None or not 'userId' in params:
            return (1,"userId should never be none")
        if not 'msg' in params:
            return (2,"msg is empty")
        getPusher().onWriteMsg(params['userId'], params['msg'])
        return (0,"")
        
def run(server_class=HTTPServer, handler_class=BaseHTTPRequestHandler, port=8080):
    server_address = ("10.32.4.119", port)
    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()
if __name__ == '__main__':
    run(handler_class=PushHttpRequestHandler)
    pass