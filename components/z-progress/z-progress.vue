<template>
  <view class="progress" :style="`--progress-width:${percent}%`">
    <view :class="['progress-bar',striped && 'striped',striped && stripedActive && 'striped-active']">
      {{showPercent ? percent + '%' : ''}}</view>
  </view>
</template>

<script setup>
  /**
	 * lineProgress 线型进度条
	 * @description 展示操作或任务的当前进度，比如上传文件，是一个线形的进度条。
	 * @tutorial https://www.uviewui.com/components/lineProgress.html
	 * @property {String Number} percent 进度条百分比值，为数值类型，0-100
	 * @property {Boolean} show-percent 是否在进度条内部显示当前的百分比值数值（默认true）
	 * @property {Boolean} striped 是否显示进度条激活部分的条纹（默认false）
	 * @property {Boolean} striped-active 条纹是否具有动态效果（默认false）
	 * @example <z-progress :percent="70" :show-percent="true"></z-progress>
     * <style>
        .line-progress{
            --progress-height:  进度条高度
            --progress-width: 进度条百分比
            --progress-radius: 进度条原角度 默认半圆
            --progress-color: 进度条文本颜色 默认白色
            --progress-font-size 进度条文本字体大小
            --progress-trans： 进度条百分比过渡效果
            --progress-active-bg: 进度条激活部分的颜色（默认#19be6b）
            --progress-inactive-color 进度条的底色（默认#ececec）
            --progress-striped: 条纹 默认白色斑马条纹
            
        }
     </style>
	 */

  const props = defineProps({
    // 进度百分比，数值
    percent: {
      type: [Number, String],
      default: 0
    },
    // 是否在进度条内部显示百分比的值
    showPercent: {
      type: Boolean,
      default: false
    },
    // 是否显示条纹
    striped: {
      type: Boolean,
      default: false
    },
    // 条纹是否显示活动状态
    stripedActive: {
      type: Boolean,
      default: false
    }
  })
</script>

<style scoped>
  .progress {
    overflow: hidden;
    height: var(--progress-height, 15px);
    display: inline-flex;
    align-items: center;
    width: 100%;
    border-radius: var(--progress-radius, 50px);
    background-color: var(--progress-inactive-color, #ececec);
    vertical-align: top;
  }

  .progress-bar {
    --tran: all 0.4s ease;
    width: var(--progress-width, 0);
    height: 100%;
    align-items: center;
    display: flex;
    justify-items: flex-end;
    justify-content: space-around;
    font-size: var(--progress-font-size, inherit);
    color: var(--progress-color, #fff);
    transition: var(--progress-trans, var(--tran));
    background-color: var(--progress-active-bg, var(--color-theme, #19be6b));
  }

  .striped {
    --shadow: linear-gradient(-45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
    background-image: var(--progress-striped, var(--shadow));
    background-size: 39px 39px;
  }

  .striped-active {
    animation: progress-stripes 2s linear infinite;
  }

  @keyframes progress-stripes {
    0% {
      background-position: 0 0;
    }

    100% {
      background-position: 39px 0;
    }
  }
</style>
