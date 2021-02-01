#from multiprocessing import Process
import multiprocessing 
import time
from playsound import playsound
import keyboard 

def sound():
    print("here")
    playsound('loving.mp3')
    return


def soundAlert():
    print('sound  here')
    p = multiprocessing.Process(target=sound)
    p.start()
    print('please press Ctrl button to stop the sound')
    keyboard.wait('Ctrl')
    p.terminate()


def startAlert():
    start = time.time()
    soundAlert()
    end = time.time()
    total =  end - start
    print(total)
# เปิดเสียง
# รอปุ่มกด
# เวลาปิดเสียง

def notification():
    global isAlert
    if(not isAlert):
        isAlert = True
        startAlert()
    return 0

if __name__ == '__main__':
    isAlert = False
    #pygame.init()
    start = notification()
