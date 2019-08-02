function canvasVideo(){
    this.timer = null;
    this.playStatus = false;
    this.ifFullScreen = false;

    this.ownVideo = document.getElementsByClassName("ownVideo")[0];
    this.controlsWrapper = document.getElementsByClassName("controlsWrapper")[0];
    this.actionBtn = document.getElementById("actionBtn");
    this.theCanvas = document.getElementById("thecanvas");
    this.ctx = this.theCanvas.getContext("2d");
    this.video = document.getElementById("video");
    this.screenShotBtn = document.getElementById("screenShotBtn");
    this.fullScreenBtn = document.getElementById("fullScreenBtn");
};
canvasVideo.prototype = {
    fullScreen:function(){
        if(this.ifFullScreen)
        {
            this.ownVideo.style.width = 500 + 'px';
            this.ownVideo.style.height = 300 + 'px';
            this.ownVideo.style.position = "absolute";
            this.fullScreenBtn.innerHTML = "全屏";
            this.ifFullScreen = !this.ifFullScreen;
        }
        else
        {
            this.ownVideo.style.position = "fixed";
            this.ownVideo.style.width = 100 + '%';
            this.ownVideo.style.height = 100 + '%';
            this.ownVideo.style.zIndex = 2;
            this.fullScreenBtn.innerHTML = "取消全屏";
            this.ifFullScreen = !this.ifFullScreen;
        }
    },

    screenShot(){
        let screenShot = this.theCanvas.toDataURL("image/png");
        let img = document.createElement("img");
        img.setAttribute('crossOrign','anonymous');
        img.src = screenShot;
        document.body.appendChild(img);
    },

    play(){
        let width = window.getComputedStyle(video)['width'].replace('px','');
        let height = window.getComputedStyle(video)['height'].replace('px','');
        this.timer = setInterval(()=>{
            this.ctx.drawImage(this.video,0,0,width,height);
        },40);
    },

    pause(){
        clearInterval(this.timer);
    },

    ended(){
        document.getElementById("initIcon").style.visibility = "visible";
        this.actionBtn.innerHTML = "播放";
    },

    mouseOver(){
        this.controlsWrapper.style.bottom = 0;
    },
    
    mouseOut(){
        this.controlsWrapper.style.bottom = -60+'px';
    },

    startOrStop(){
        if(!this.playStatus)
        {
            this.video.play();
            this.actionBtn.innerHTML = "暂停";
            document.getElementById("initIcon").style.visibility = "hidden";
        }
        else
        {
            this.video.pause();
            this.actionBtn.innerHTML = "播放";
            document.getElementById("initIcon").style.visibility = "visible";
        }
        this.playStatus = !this.playStatus;
    },

    init(){
        this.ctx.rect(0,0,500,300);
        this.ctx.fillStyle = "black";
        this.ctx.fill();
    },
};
window.onload = function(){
    var player = new canvasVideo();
    
    player.init();
    player.fullScreenBtn.addEventListener('click',function(){
        player.fullScreen();
    });
    player.ownVideo.addEventListener('mouseover',function(){
        player.mouseOver();
    });
    player.ownVideo.addEventListener('mouseout',function(){
        player.mouseOut();
    });
    player.screenShotBtn.addEventListener('click',function(){
        player.screenShot();
    });
    player.actionBtn.addEventListener('click',function(){
        player.startOrStop();
    });
    player.video.addEventListener("play",function(){
        player.play();
    });
    player.video.addEventListener("pause",function(){
        player.pause();
    });
    player.video.addEventListener('ended',function(){
        player.ended();
    });
};