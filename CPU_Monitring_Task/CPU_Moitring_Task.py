from gpiozero import LED
import psutil
import time 
from datetime import datetime
#green_led = LED(20)
#yellow_led = LED(21)
#red_led = LED(22)
#monitring_file = open("monitring_file.txt" , "w")
#monitring_file.close()
while True :
    monitring_file = open("monitring_file.txt" , "a")

    cpuusages = psutil.cpu_percent(interval=1, percpu=True)
    cpuusagemean = round(sum(cpuusages) / len(cpuusages))
    print(f"CPU usage(%): {cpuusagemean}%")
    #if cpuusagemean < 50:
        #green_led.on()  
        #yellow_led.off()
        #red_led.off()
        #print("CPU usage is less than 50%")
    #elif cpuusagemean >= 50 and cpuusagemean < 80:
        #green_led.off()
        #yellow_led.on()  
        #red_led.off()
        #print("CPU usage is between 50% and 80%")
    #else:
        #green_led.off()
        #yellow_led.off()
        #red_led.on()  
        #print("CPU usage is above or equal to 80%")
    data =f"{datetime.now().strftime('%Y/%m/%d %HH %MM %SS')}" \
          f"cpu usage(%) : {cpuusagemean}% \n"  
    monitring_file.write(data)
    time.sleep(1)
    #monitring_file.close()