//初始化整个游戏的精灵，作为游戏开始的入口
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {Land} from "./js/runtime/Land.js";
import {DataStore} from "./js/base/DataStore.js";
import {Director} from "./js/Director.js";
import {Birds} from "./js/player/Birds.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";

export class Main {
    constructor() {
        //web
        this.canvas = document.getElementById('game_canvas');
        //小程序
        // this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));
    }

    //小程序背景音乐
    // createBackgroundMusic(){
    //     var bgm = wx.createInnerAudioContext();
    //     bgm.autoplay = true;
    //     bgm.loop = true;
    //     bgm.src = 'audios/bgm.mp3';
    // }

    onResourceFirstLoaded(map) {
        this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        // this.createBackgroundMusic();
        this.init();
    }

    init() {
        this.director.isGameOver = false;

        this.dataStore
            .put('pencils', [])
            .put('background', BackGround)
            .put('land', Land)
            .put('birds', Birds)
            .put('score', Score)
            .put('startButton',StartButton);
        this.registerEvent();
        //创建铅笔要在游戏逻辑运行之前
        this.director.createPencil();
        this.director.run();
    }

    registerEvent() {
        //web
        this.canvas.addEventListener('touchstart',e=>{
            //屏蔽掉js的事件冒泡
            e.preventDefault();
            if(this.director.isGameOver){
                this.init();
            }else{
                this.director.birdsEvent();
            }
        });
        //小程序
        // wx.onTouchStart(()=>{
        //     if(this.director.isGameOver){
        //         this.init();
        //     }else{
        //         this.director.birdsEvent();
        //     }
        // })
    }
}