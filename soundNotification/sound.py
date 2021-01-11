#import multiprocessing
import time

isAlert = False

def soundAlert():
    print('sound  here')



def startAlert():
    start = time.time()
    soundAlert()
    end = time.time()
    total = start - end
    print(total)
# เปิดเสียง
# รอปุ่มกด
# เวลาปิดเสียง

def notification():
    global isAlert
    if(not isAlert):
        isAlert = True
        startAlert()


notification()
