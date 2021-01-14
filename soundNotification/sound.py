#import multiprocessing
import time
#import pygame
#from pygame import mixer
import keyboard 


def soundAlert():
    print('sound  here')
    #mixer.music.load('loving.mp3')
    #mixer.music.play(-1)
    keyboard.wait('Ctrl') 


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

isAlert = False
#pygame.init()
start = notification()
