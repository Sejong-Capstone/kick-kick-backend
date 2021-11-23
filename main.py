from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5.QtCore import *
import sys, cv2, numpy, time

class Example(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("cam_exam")
        self.setGeometry(150, 150, 650, 540)
        self.initUI()

    def initUI(self):
        self.cpt = cv2.VideoCapture(0)
        self.fps = 24
        self.sens = 300
        _,self.img_o = self.cpt.read()
        self.img_o = cv2.cvtColor(self.img_o, cv2.COLOR_RGB2GRAY)
        cv2.imwrite('img_o.jpg', self.img_o)

        self.cnt = 0

        self.frame = QLabel(self)
        self.frame.resize(640, 480)
        self.frame.setScaledContents(True) # cam 사이즈가 화면에 맞게 됨.
        self.frame.move(5,5)

        self.btn_on = QPushButton("켜기", self)
        self.btn_on.resize(100,25)
        self.btn_on.move(5, 490)
        self.btn_on.clicked.connect(self.start)

        self.btn_off = QPushButton("끄기",self)
        self.btn_off.resize(100,25)
        self.btn_off.move(5+100+5,490)
        self.btn_off.clicked.connect(self.stop)

        self.prt=QLabel(self)
        self.prt.resize(200, 25)
        self.prt.move(5+105+105, 490)

        self.sldr = QSlider(Qt.Horizontal,self) # Qt.Vertical 하면 세로 조절 축 생김.
        self.sldr.resize(100,25)
        self.sldr.move(5+105+105+200, 490)
        self.sldr.setMinimum(1)
        self.sldr.setMaximum(30)
        self.sldr.setValue(24)
        self.sldr.valueChanged.connect(self.setFps)

        self.sldr1 = QSlider(Qt.Horizontal,self)
        self.sldr1.resize(100,25)
        self.sldr1.move(5+105+105+200+105,490)
        self.sldr1.setMinimum(50)
        self.sldr1.setMaximum(500)
        self.sldr1.setValue(300)
        self.sldr1.valueChanged.connect(self.setSens)
        self.show()

    # 왼쪽 슬라이더(프레임 조절)
    def setFps(self):
        self.fps = self.sldr.value()
        self.prt.setText("FPS "+str(self.fps)+"로 조정!")
        self.timer.stop()
        self.timer.start(int(1000/self.fps))

    # 오른쪽 슬라이더(감도 조절) - 감도를 높일수록 크게 움직여야 검출되는 듯.
    def setSens(self):
        self.sens=self.sldr1.value()
        self.prt.setText("감도 "+str(self.sens)+"로 조정!")

    # 켜기 버튼 클릭 시
    def start(self):
        # self.codec = cv2.VideoWriter_fourcc(*'XVID')
        self.timer = QTimer()
        self.timer.timeout.connect(self.nextFrameSlot) # nextFrameSlot메소드 실행.
        self.timer.start(int(1000/self.fps)) # 1000 = 1초. => 즉 초당 24프레임으로 전달하겠다.


    def nextFrameSlot(self):
        _, cam = self.cpt.read() #cam=
        cam = cv2.cvtColor(cam, cv2.COLOR_BGR2RGB) #bgr rgb로 변환
        # cam = cv2.flip(cam, 0) # 캠 반전
        self.img_p = cv2.cvtColor(cam, cv2.COLOR_RGB2GRAY) # rgb gray로 변환
        cv2.imwrite('img_p.jpg', self.img_p) # 이미지 쓰기
        self.compare(self.img_o, self.img_p) # 전 이미지와 비교
        self.img_o = self.img_p.copy()
        # 캠을 보여줌.
        img = QImage(cam, cam.shape[1], cam.shape[0], QImage.Format_RGB888) #input, width, heigth, format
        pix = QPixmap.fromImage(img)
        self.frame.setPixmap(pix)

    # 끄기 버튼 클릭 시
    def stop(self):
        self.frame.setPixmap(QPixmap.fromImage(QImage()))
        self.timer.stop()


    def compare(self,img_o,img_p):
        err = numpy.sum((img_o.astype("float")-img_p.astype("float"))**2)
        err /= float(img_o.shape[0]*img_p.shape[1])
        if(err>=self.sens):
            t = time.localtime()
            self.prt.setText("{}-{}-{} {}:{}:{} 움직임 감지!".format(t.tm_year, t.tm_mon, t.tm_mday, t.tm_hour,t.tm_min,t.tm_sec))


app = QApplication(sys.argv)
w = Example()
sys.exit(app.exec_())