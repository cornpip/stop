# 운전자 폭행 감지 및 위치기반 신고 시스템  
#### dataset준비, 모델학습, 추론 서버 관련 repo입니다 => [__mmaction2__](https://github.com/cornpip/mmaction2)

![구성](https://user-images.githubusercontent.com/74674780/178137022-1b64682c-4ed6-48d6-9c39-05b08b2503c0.PNG)

시스템의 흐름은 다음과 같습니다. 필요한 이미지 전처리와 추론에는 처리 속도를 위해 gpu가 필요해 추론 서버를 분리합니다. Raspberry Pi에서 [__추론 서버에 socket 연결__](https://github.com/cornpip/stop/blob/main/pyprocess/client.py) 을 한 후 이미지를 전송합니다. 서버는 들어온 이미지를 정해진 프레임 단위로 추론을 진행하고 결과를 반환합니다. 결과가 폭행 상황일시 Pi와 연결된 GPS모듈로 부터 [__현재 위도/경도__](https://github.com/cornpip/stop/blob/main/pyprocess/gps_u.py) 를 받아오고 부모 프로세서인 [__node process__](https://github.com/cornpip/stop/blob/main/index.js) 에 전달합니다. node procecss는 준비된 csv파일로 부터 경찰서의 위도/경도를 비교하고 [__가장 가까운 경찰서를 반환__](https://github.com/cornpip/stop/blob/main/track/shortcut.js)합니다.  

<img src="https://user-images.githubusercontent.com/74674780/178142558-f2243126-3d77-4532-a851-a83ddc6ca5b1.jpg">  

현재는 반환받은 가까운 경찰서와 폭행 상황이 발생한 위치를 활용하는 한 예시로 [__SMS전송__](https://github.com/cornpip/stop/blob/main/sms/send.js) 을 활용합니다. 네이버의 Simple & Easy Notification Service를 이용합니다. 사용 가이드에 따라 Signature를 생성하고 api를 호출합니다.    

## Links
#### [대한임베디드공학회 ict대학생 논문경진대회 제출 논문](https://drive.google.com/file/d/1vd5vM4-wfGYxobYWNlYLCwKDV_Oa8xU-/view?usp=sharing)  
#### [캡스톤디자인 경진대회 참여 포스터](https://docs.google.com/presentation/d/1bpxRl3pi8Qdm9mtQOApYPJharchJ7V_Y/edit?usp=sharing&ouid=109716382236660184193&rtpof=true&sd=true) _(A1 사이즈 ppt라 로딩시간이 있습니다.)_
