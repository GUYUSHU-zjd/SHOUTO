import type { PioConfig } from "../types/config";

// Pio 看板娘配置
export const pioConfig: PioConfig = {
  enable: true, // 启用看板娘
  models: ["/pio/models/NOIR/noir.model3.json"], // 默认模型路径
  position: "left", // 模型位置
  width: 280, // 默认宽度
  height: 250, // 默认高度
  mode: "draggable", // 默认为可拖拽模式
  hiddenOnMobile: true, // 默认在移动设备上隐藏
  hideAboutMenu: false, // 隐藏内置 About 菜单按钮
  dialog: {
    welcome: "你好，你是谷玉树的朋友吗？", // 欢迎词
    touch: ["别碰我！", "変態！", "再摸我要生气了！", "呼~"], // 触摸提示
    home: "（´▽`）♡ 点我回到首页哦~", // 首页提示
    skin: ["想看看我的新衣服吗？", "新衣服是不是超好看~"], // 换装提示
    close: "QWQ 下次再见啦~ 要记得想我哦！", // 关闭提示
    link: "https://github.com/LyraVoid/Mizuki", // 关于链接
  },
};
