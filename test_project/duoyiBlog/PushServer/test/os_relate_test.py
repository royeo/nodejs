'''
Created on 2016年8月24日

@author: mouzebo

操作系统工具使用测试
'''
from multiprocessing import Process, Pipe
from symbol import argument
from logging.config import thread
class OsRelateTest(object):
    '''
    classdocs
    '''


    def __init__(self, params):
        '''
        Constructor
        '''
         
    @staticmethod
    def f(con):
        con.send({"hello pipe", 4})       
    
    @staticmethod
    def t(con):
        str = con.recv()
        print(str)
    
    @staticmethod
    def testPipe():
        pcon, ccon = Pipe()
        c = Process(target=OsRelateTest.f, args=(ccon,))
        c.start()
        c.join()
        p = Process(target=OsRelateTest.t, args=(pcon,))
        p.start()
        p.join()


if __name__ == "__main__":
    OsRelateTest.testPipe()           
