import sys
import time

locate = [1, 35.1388034, 129.105874]
i= 0
while 1:
    if i == 4:
        print(locate, end="")
        sys.stdout.flush()
    else:
        print("common-0.929 charge-0.044 conflict-0.028")
        # sys.stdout.write("-----Dangerous-----")
        sys.stdout.flush()
        # if i==3:
        #     sys.stdout.flush()
    time.sleep(0.001)
    i += 1