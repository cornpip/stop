import sys
import time

locate = [1, 35.1388034, 129.105874]
i= 0
while 1:
    if i == 3:
        print(locate, end="")
        sys.stdout.flush()
    else:
        # print("~", end="\n")
        sys.stdout.write("~")
        sys.stdout.flush()
    time.sleep(1)
    i += 1