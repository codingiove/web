<template>
  <div v-show="!$store.state.hide">
    <!-- 浏览器原生播放器 -->
    <audio :src="song.url" id="audio"></audio>
    <!-- 音乐播放器 -->
    <div id="music-container" class="audioplayer">
      <div class="ap-status">
        <!-- 播放列表 -->
        <div class="ap-playlist" :class="{ 'ap-playlist-hide': !listShow }">
          <!-- 列表头部 -->
          <div class="ap-playlist-header">
            <div class="ap-playlist-header-name">
              <span class="ap-playlist-header-title">播放列表</span>
              <span class="ap-playlist-header-amount"
                >(共{{ songList.length }}首)</span
              >
            </div>
            <div class="ap-playlist-header-artist">歌手</div>
            <div class="ap-playlist-header-close" @click="handleList">×</div>
          </div>
          <!-- 列表内容 -->
          <div class="ap-playlist-body ps">
            <ol>
              <li
                v-for="(li, i) in songList"
                class="ap-playlist-line"
                :class="{ 'ap-playlist-line-active': index == i }"
                @click="choseSong(li, i)"
                :key="li.id"
                :data-index="i"
              >
                <div class="ap-playlist-line-name">
                  {{ li.name }} - {{ li.album }}
                </div>
                <div class="ap-playlist-line-artist">{{ li.artist }}</div>
              </li>
            </ol>
          </div>
        </div>
        <!-- 控制器综合，包含控制器，音量，进度条等 -->
        <div class="ap-controller">
          <div class="ap-controller-left">
            <!-- 封面 -->
            <div
              class="ap-cover"
              :style="{
                backgroundImage: 'url(' + song.cover + '?param=60x60' + ')',
              }"
            ></div>
            <!-- 上一首 -->
            <div class="ap-button ap-skipback-button" @click="skipBack">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  d="M20.229 24.343l-10.286-6.171c-0.914-0.571-1.486-1.371-1.486-2.171s0.571-1.714 1.486-2.171l10.286-6.171c0.914-0.571 1.829-0.686 2.629-0.229 0.686 0.457 1.143 1.257 1.143 2.286v12.571c0 1.029-0.457 1.943-1.143 2.286-0.343 0.229-0.686 0.229-1.029 0.229-0.457 0.114-1.029-0.114-1.6-0.457zM21.143 9.143l-10.286 6.171c-0.343 0.229-0.571 0.457-0.571 0.686s0.229 0.571 0.571 0.686l10.286 6.171c0.457 0.229 0.686 0.229 0.914 0.229 0.229-0.114 0.229-0.457 0.229-0.8v-12.571c0-0.457-0.114-0.686-0.229-0.8 0 0-0.114 0-0.229 0-0.229-0.114-0.457 0-0.686 0.229z"
                ></path>
                <path
                  d="M8.229 7.771v16.571c0 0.457 0.343 0.914 0.914 0.914v0c0.457 0 0.914-0.343 0.914-0.914v-16.571c0-0.457-0.343-0.914-0.914-0.914v0c-0.457 0-0.914 0.343-0.914 0.914z"
                ></path>
              </svg>
            </div>
            <!-- 播放与暂停 -->
            <div class="ap-button ap-play-button" @click="play">
              <svg
                v-if="!playing"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  d="M22.756 16.711l-8.8 5.422c-0.444 0.267-0.978 0.089-1.244-0.267-0.089-0.178-0.089-0.267-0.089-0.444v-10.844c0-0.533 0.356-0.889 0.889-0.889 0.178 0 0.356 0.089 0.444 0.089l8.8 5.422c0.444 0.267 0.533 0.8 0.267 1.244-0.089 0.089-0.178 0.178-0.267 0.267z"
                ></path>
              </svg>
              <svg
                v-else
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  d="M11.556 8.889v0c0.711 0 1.333 0.622 1.333 1.333v11.556c0 0.711-0.622 1.333-1.333 1.333v0c-0.711 0-1.333-0.622-1.333-1.333v-11.556c0-0.711 0.622-1.333 1.333-1.333z"
                ></path>
                <path
                  d="M21.333 8.889v0c0.711 0 1.333 0.622 1.333 1.333v11.556c0 0.711-0.622 1.333-1.333 1.333v0c-0.711 0-1.333-0.622-1.333-1.333v-11.556c0-0.711 0.622-1.333 1.333-1.333z"
                ></path>
              </svg>
            </div>
            <!-- 下一首 -->
            <div class="ap-button ap-skipforward-button" @click="skipForward">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  d="M10.514 24.914c-0.343 0-0.686-0.114-1.029-0.229-0.686-0.457-1.143-1.257-1.143-2.286v-12.571c0-1.029 0.457-1.943 1.143-2.286 0.686-0.457 1.714-0.343 2.629 0.229l10.286 6.171c0.914 0.571 1.486 1.371 1.486 2.171s-0.571 1.714-1.486 2.171l-10.286 6.171c-0.571 0.229-1.143 0.457-1.6 0.457zM10.514 8.8c-0.114 0-0.114 0-0.229 0-0.229 0.114-0.229 0.457-0.229 0.8v12.571c0 0.457 0.114 0.686 0.229 0.8s0.457 0.114 0.914-0.229l10.286-6.171c0.343-0.229 0.571-0.457 0.571-0.686s-0.229-0.457-0.571-0.686l-10.286-6.171c-0.343-0.114-0.571-0.229-0.686-0.229z"
                ></path>
                <path
                  d="M23.086 6.857v0c-0.457 0-0.914 0.343-0.914 0.914v16.571c0 0.457 0.343 0.914 0.914 0.914v0c0.457 0 0.914-0.343 0.914-0.914v-16.571c0-0.571-0.343-0.914-0.914-0.914z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ap-controller-center">
            <!-- 歌曲信息 -->
            <div class="ap-song-msg">
              <span class="ap-name">{{ song.name }}</span>
              <span class="ap-artist" v-if="song.artist"
                >-{{ song.artist }}</span
              >
              <span class="ap-time">
                <span class="ap-current-time">{{ currentTime }}</span>
                <span v-if="totalTime"> / </span>
                <span class="ap-total-time">{{ totalTime }}</span>
              </span>
            </div>
            <!-- 进度条 -->
            <div class="ap-progress-line">
              <div class="ap-play-track" ref="track" @click="handClickBar">
                <!-- 总进度 -->
                <div class="ap-play-bar-wrap">
                  <!-- 当前进度 -->
                  <div
                    class="ap-progress-bar"
                    :class="{ 'forbid-transition': thumbSlide }"
                    :style="{ transform: 'scaleX(' + progressScaleX + ')' }"
                  ></div>
                </div>
                <!-- 进度按钮 -->
                <div
                  class="ap-progress-thumb"
                  :class="{ 'forbid-transition': thumbSlide }"
                  ref="thumb"
                  :style="{
                    transform: 'translateX(' + thumbTranslateX + 'px)',
                  }"
                >
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 35 32"
                    class="ap-svg-exclude"
                  >
                    <path
                      fill="#32b0da"
                      opacity="0.28"
                      d="M11.789 1.207h11.789c3.72 0 6.737 3.016 6.737 6.737v8.421c0 3.72-3.016 6.737-6.737 6.737h-11.789c-3.72 0-6.737-3.016-6.737-6.737v-8.421c0-3.72 3.016-6.737 6.737-6.737z"
                    ></path>
                    <path
                      fill="#32b0da"
                      opacity="0.14"
                      d="M12.211 2.050h10.947c3.488 0 6.316 2.828 6.316 6.316v7.579c0 3.488-2.828 6.316-6.316 6.316h-10.947c-3.488 0-6.316-2.828-6.316-6.316v-7.579c0-3.488 2.828-6.316 6.316-6.316z"
                    ></path>
                    <path
                      fill="#000"
                      d="M22.737 2.969c3.256 0 5.895 2.627 5.895 5.866v6.705c0 3.24-2.639 5.866-5.895 5.866h-10.105c-3.256 0-5.895-2.626-5.895-5.866v-6.705c0-3.239 2.639-5.866 5.895-5.866h10.105z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M22.737 2.969c3.256 0 5.895 2.627 5.895 5.866v6.705c0 3.24-2.639 5.866-5.895 5.866h-10.105c-3.256 0-5.895-2.626-5.895-5.866v-6.705c0-3.239 2.639-5.866 5.895-5.866h10.105z"
                    ></path>
                    <path
                      fill="#333"
                      d="M13.053 9.706c0.697 0 1.263 0.566 1.263 1.263v2.526c0 0.697-0.566 1.263-1.263 1.263s-1.263-0.566-1.263-1.263v-2.526c0-0.697 0.566-1.263 1.263-1.263z"
                    ></path>
                    <path
                      fill="#333"
                      d="M22.316 9.706c0.697 0 1.263 0.566 1.263 1.263v2.526c0 0.697-0.566 1.263-1.263 1.263s-1.263-0.566-1.263-1.263v-2.526c0-0.697 0.566-1.263 1.263-1.263z"
                    ></path>
                    <path
                      fill="#333"
                      d="M26.947 15.538c0 2.321-1.89 4.211-4.211 4.211h-10.105c-2.321 0-4.211-1.89-4.211-4.211v-6.737c0-2.323 1.89-4.211 4.211-4.211h10.105c2.321 0 4.211 1.888 4.211 4.211v6.737zM23.020 2.935l0.6-1.041c0.349-0.603 0.143-1.376-0.461-1.725s-1.376-0.141-1.725 0.461l-1.314 2.275h-4.871l-1.314-2.275c-0.349-0.603-1.122-0.81-1.725-0.461-0.605 0.349-0.812 1.122-0.463 1.725l0.601 1.041c-3.121 0.15-5.612 2.708-5.612 5.866v6.737c0 3.256 2.639 5.895 5.895 5.895h10.105c3.256 0 5.895-2.639 5.895-5.895v-6.737c0-3.16-2.491-5.716-5.612-5.866z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="ap-controller-right">
            <!-- 竖线 -->
            <div class="ap-line">
              <div class="ap-line-draw"></div>
            </div>
            <!-- 音量 -->
            <div class="ap-button ap-volume-button">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  d="M16.571 27.429c-0.457 0-0.8-0.114-1.143-0.457l-5.943-5.257h-2.743c-1.257 0-2.286-1.029-2.286-2.286v-5.829c0-1.257 1.029-2.286 2.286-2.286h2.743l5.943-5.257c0.686-0.571 1.829-0.571 2.4 0.114 0.229 0.343 0.457 0.686 0.457 1.143v18.286c0 1.029-0.8 1.829-1.714 1.829zM6.857 13.143c-0.343 0-0.571 0.229-0.571 0.571v5.829c0 0.343 0.229 0.571 0.571 0.571h3.429l6.4 5.714v-18.171l-6.4 5.6h-3.429z"
                ></path>
                <path
                  d="M22.154 21.797c1.714-1.45 2.703-3.532 2.703-5.797 0-2.247-0.864-4.207-2.449-5.66-0.349-0.32-0.891-0.296-1.211 0.053s-0.296 0.891 0.053 1.211c1.232 1.129 1.893 2.631 1.893 4.397 0 1.755-0.763 3.361-2.097 4.489-0.361 0.306-0.406 0.847-0.101 1.208s0.847 0.406 1.208 0.101z"
                ></path>
                <path
                  d="M25.355 24.539c2.517-2.139 3.959-5.253 3.959-8.653 0-3.22-1.389-6.329-3.697-8.509-0.344-0.325-0.887-0.31-1.212 0.035s-0.31 0.887 0.035 1.212c1.971 1.861 3.16 4.523 3.16 7.263 0 2.896-1.221 5.533-3.355 7.347-0.361 0.307-0.405 0.848-0.098 1.208s0.848 0.405 1.208 0.098z"
                ></path>
              </svg>
            </div>
            <!-- 音量进度条 -->
            <div class="ap-volume-line">
              <div class="ap-volume-track" ref="trackV">
                <div class="ap-volume-bar-wrap">
                  <div
                    class="ap-volume-bar"
                    :class="{ 'forbid-transition': thumbVSlide }"
                    :style="{ transform: 'scaleX(' + volume + ')' }"
                  ></div>
                </div>
                <div
                  class="ap-volume-thumb"
                  ref="thumbV"
                  :class="{ 'forbid-transition': thumbVSlide }"
                  :style="{ transform: 'translateX(' + volumeX + 'px)' }"
                >
                  <div class="ap-volume-thumb-dot"></div>
                </div>
              </div>
            </div>
            <!-- 播放模式 -->
            <div class="ap-button ap-order-button" @click="chosePlayType">
              <!-- 列表循环 -->
              <svg
                v-if="playType == 1"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  d="M25.6 15.657c-0.343 0-0.686 0.343-0.686 0.686 0 0.114 0 0.229 0 0.229v1.829c0 2.4-1.829 4.229-4.229 4.229h-10.286l0.914-0.8c0.114-0.114 0.229-0.343 0.229-0.457 0-0.343-0.343-0.686-0.686-0.686-0.229 0-0.457 0.114-0.571 0.229l-2.057 1.829-0.8 0.686 2.857 2.514c0.114 0.229 0.343 0.343 0.571 0.343 0.457 0 0.8-0.229 0.8-0.686 0-0.229-0.114-0.457-0.343-0.571l-1.029-0.914v-0.114h10.4c3.086 0 5.6-2.514 5.6-5.6v-1.829c0-0.114 0-0.114 0-0.229 0-0.343-0.343-0.686-0.686-0.686zM8.229 16.571v-1.829c0-2.4 1.829-4.229 4.229-4.229h10.971l-0.914 0.914c-0.229 0.114-0.343 0.343-0.343 0.571 0 0.343 0.343 0.686 0.8 0.686 0.229 0 0.457-0.114 0.571-0.343l1.486-1.371 1.257-1.257-2.743-2.629c-0.229-0.114-0.457-0.229-0.686-0.229-0.457 0-0.686 0.343-0.686 0.8 0 0.229 0.114 0.343 0.229 0.571l0.914 0.8v0.114h-10.971c-2.971 0-5.486 2.514-5.486 5.6v1.829c0 0.114 0 0.114 0 0.229 0 0.343 0.343 0.686 0.686 0.686s0.686-0.343 0.686-0.686c0-0.114 0-0.229 0-0.229z"
                ></path>
              </svg>
              <!-- 随机播放 -->
              <svg
                v-else-if="playType == 2"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  d="M17.6 15.543c0.229 0 0.457-0.114 0.571-0.229l2.629-2.4c0.914-0.8 2.171-1.257 3.429-1.486l-1.029 0.914c-0.229 0.114-0.343 0.343-0.343 0.457 0 0.343 0.343 0.686 0.8 0.686 0.229 0 0.457-0.114 0.686-0.229l3.086-2.4-3.086-2.514c-0.114-0.229-0.343-0.343-0.571-0.343-0.457 0-0.914 0.229-0.914 0.686 0 0.229 0.114 0.457 0.343 0.571v0l1.029 0.8c-1.714 0.114-3.314 0.8-4.457 1.829l-2.629 2.4c-0.114 0.114-0.229 0.343-0.229 0.457 0 0.229 0.114 0.343 0.229 0.457 0.114 0.343 0.343 0.343 0.457 0.343zM14.057 17.486c-0.229 0-0.457 0.114-0.571 0.229l-2.743 2.514c-1.143 0.914-2.629 1.371-4.114 1.371 0 0 0 0 0 0-0.457 0-0.8 0.343-0.8 0.686s0.343 0.686 0.8 0.686c0 0 0 0 0 0 1.943 0 3.771-0.571 5.257-1.829l2.857-2.514c0.114-0.114 0.229-0.343 0.229-0.457 0-0.229-0.114-0.343-0.229-0.457-0.229-0.114-0.457-0.229-0.686-0.229zM23.771 19.543c-0.457 0-0.8 0.343-0.8 0.686 0 0.229 0.114 0.343 0.343 0.457l1.029 0.8c-1.029-0.114-2.057-0.457-2.857-1.029l-9.029-8.229c-1.486-1.371-3.543-2.171-5.714-2.171-0.571 0-1.029 0.343-1.029 0.686s0.457 0.686 0.914 0.686c1.714 0 3.429 0.686 4.571 1.714l9.029 8.229 0.229 0.114c1.143 0.8 2.514 1.257 4 1.486l-1.143 0.914c-0.343 0.114-0.457 0.343-0.457 0.571 0 0.343 0.343 0.686 0.8 0.686 0.229 0 0.457-0.114 0.571-0.343l3.086-2.514-3.086-2.629c0-0.114-0.229-0.114-0.457-0.114z"
                ></path>
              </svg>
              <!-- 单曲循环 -->
              <svg
                v-else
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  d="M25.6 15.657c-0.343 0-0.686 0.343-0.686 0.686 0 0.114 0 0.229 0 0.229v1.829c0 2.4-1.829 4.229-4.229 4.229h-10.286l0.914-0.8c0.114-0.114 0.229-0.343 0.229-0.457 0-0.343-0.343-0.686-0.686-0.686-0.229 0-0.457 0.114-0.571 0.229l-2.057 1.829-0.8 0.686 2.857 2.514c0.114 0.229 0.343 0.343 0.571 0.343 0.457 0 0.8-0.229 0.8-0.686 0-0.229-0.114-0.457-0.343-0.571l-1.029-0.914v-0.114h10.4c3.086 0 5.6-2.514 5.6-5.6v-1.829c0-0.114 0-0.114 0-0.229 0-0.343-0.343-0.686-0.686-0.686zM8.229 16.571v-1.829c0-2.4 1.829-4.229 4.229-4.229h10.971l-0.914 0.914c-0.229 0.114-0.343 0.343-0.343 0.571 0 0.343 0.343 0.686 0.8 0.686 0.229 0 0.457-0.114 0.571-0.343l1.486-1.371 1.257-1.257-2.743-2.629c-0.229-0.114-0.457-0.229-0.686-0.229-0.457 0-0.686 0.343-0.686 0.8 0 0.229 0.114 0.343 0.229 0.571l0.914 0.8v0.114h-10.971c-2.971 0-5.486 2.514-5.486 5.6v1.829c0 0.114 0 0.114 0 0.229 0 0.343 0.343 0.686 0.686 0.686s0.686-0.343 0.686-0.686c0-0.114 0-0.229 0-0.229z"
                ></path>
                <path
                  d="M18.286 20v-6.857h-1.257l-2.171 1.714 0.457 1.257 1.486-0.914v4.8z"
                ></path>
              </svg>
            </div>
            <!-- 播放列表 -->
            <div class="ap-button ap-playlist-button" @click="handleList">
              <div class="ap-playlist-button-bg">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M5.371 6.857h9.943c0.457 0 0.8 0.343 0.8 0.8v0c0 0.457-0.343 0.8-0.8 0.8h-9.943c-0.457 0-0.8-0.343-0.8-0.8v0c0-0.457 0.343-0.8 0.8-0.8z"
                  ></path>
                  <path
                    d="M5.371 11.086h7.429c0.457 0 0.914 0.343 0.914 0.8v0c0 0.457-0.343 0.8-0.8 0.8h-7.543c-0.457 0-0.8-0.343-0.8-0.8v0c0-0.457 0.343-0.8 0.8-0.8z"
                  ></path>
                  <path
                    d="M5.371 15.2h5.829c0.457 0 0.8 0.343 0.8 0.8v0c0 0.457-0.343 0.8-0.8 0.8h-5.829c-0.457 0.114-0.8-0.343-0.8-0.8v0c0-0.343 0.343-0.8 0.8-0.8z"
                  ></path>
                  <path
                    d="M20.571 6.857v0c0.457 0 0.8 0.343 0.8 0.8v14.057c0 0.457-0.343 0.8-0.8 0.8v0c-0.457 0-0.8-0.343-0.8-0.8v-14.057c0-0.457 0.457-0.8 0.8-0.8z"
                  ></path>
                  <path
                    d="M20.914 8.457c0 0 0.114 0 0.229 0.114 0.229 0.114 0.571 0.229 0.914 0.343 0.914 0.457 1.943 1.257 2.743 2.286 0.343 0.343 0.686 0.8 0.914 1.257 0.229 0.343 0.8 0.457 1.143 0.229s0.457-0.8 0.229-1.143c-0.343-0.571-0.686-1.029-1.029-1.486-0.914-1.143-2.057-2.057-3.2-2.514-0.686-0.343-1.257-0.571-1.6-0.571-0.457-0.114-0.914 0.229-0.914 0.686-0.114 0.343 0.114 0.8 0.571 0.8z"
                  ></path>
                  <path
                    d="M17.371 24.686c1.371 0 2.4-1.143 2.4-2.4s-1.143-2.4-2.4-2.4-2.514 1.029-2.514 2.4 1.143 2.4 2.514 2.4zM17.371 26.286c-2.286 0-4.114-1.829-4.114-4s1.829-4 4.114-4 4.114 1.829 4.114 4-1.829 4-4.114 4z"
                  ></path>
                </svg>
                <span class="ap-playlist-button-amount">{{
                  songList.length
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let audio = "";

export default {
  data() {
    const _this = this;
    return {
      playing: false, // 播放状态
      currentTime: "", // 当前播放时间
      totalTime: "", // 总播放时间
      progressScaleX: 0, // 播放进度
      thumbTranslateX: 0, // 当前进度条的位置
      volume: 1, // 音量进度
      volumeX: 0, // 音量滑块位置
      thumbSlide: false, // 进度条滑块滑动时标记
      thumbVSlide: false, // 音量滑块滑动时标记
      playType: 1, // 播放类型：1-列表循环，2-随机播放，3-单曲循环
      listShow: false, // 播放列表是否展示
      Sliding: false, // 正在滑动
      song: _this.$store.state.Song, // 当前播放歌曲信息
      index: _this.$store.state.SongIndex, // 当前播放歌曲的索引
      songList: _this.$store.state.SongList, // 歌曲列表
      whetherUpdate: true,
    };
  },
  mounted() {
    audio = document.getElementById("audio");
    this.getData();
    this.setPageListen();
  },
  updated() {
    if (this.whetherUpdate && this.songList.length) {
      this.song = this.songList[0];
      this.whetherUpdate = false;
      this.AsyncPlay();
    }
  },
  watch: {
    "$store.state.SongIndex": {
      handler(newValue) {
        this.song = this.songList[newValue];
        this.index = newValue;
        this.AsyncPlay();
      },
    },
  },
  methods: {
    getData() {
      // 初始化音频的监听事件
      this.audioInit();
      // 初始化进度条滑动事件
      this.slideProgress();
      //滑动音量
      this.slideVolume();
    },
    // 暂停与播放
    play() {
      if (this.playing) {
        // 暂停
        this.playing = false;
        audio.pause();
      } else {
        // 播放
        this.playing = true;
        audio.play();
      }
    },

    // 音频事件初始化
    audioInit() {
      let _this = this; // this 会依赖收集
      let progressL = this.$refs.track.offsetWidth; // 进度条总长度
      // 当前音量进度
      _this.volume = audio.volume;
      // 音量圆圈
      _this.volumeX = _this.volume * _this.$refs.trackV.offsetWidth;
      // 正在播放歌曲  [注意:播放和调整指示定位时都会触发]（主要事件）
      audio.addEventListener("timeupdate", () => {
        // 没有滑动时进度条才可以动
        if (!_this.Sliding) {
          // 当前播放时间
          _this.currentTime = _this.timeToString(audio.currentTime);
          // 进度条变化
          let precent = audio.currentTime / audio.duration || 0;
          // 当前已播放的进度 (浅蓝)
          _this.progressScaleX = precent.toFixed(3);
          // 当前图标的位置
          _this.thumbTranslateX = (precent * progressL).toFixed(3);
        }
      });

      // 音频或视频的时长已改变
      audio.addEventListener("durationchange", () => {
        _this.totalTime = _this.timeToString(audio.duration);
      });

      // 播放结束
      audio.addEventListener(
        "ended",
        () => {
          let length = _this.songList.length;
          switch (_this.playType) {
            // 列表循环
            case 1:
              _this.index = _this.index + 1 >= length ? 0 : _this.index + 1;
              break;
            // 随机播放
            case 2:
              _this.index = Math.floor(Math.random() * length);
              break;
            // 单曲循环
            case 3:
              break;
          }
          _this.song = _this.songList[_this.index];
          _this.thumbSlide = true;

          // 解决因为 transition 的回弹 bug
          setTimeout(() => {
            audio.play();
            _this.thumbSlide = false;
          }, 1000);
        },
        true
      );
    },

    // 滑动进度条
    slideProgress() {
      let _this = this;
      let thumb = _this.$refs.thumb;
      // 鼠标按下
      thumb.onmousedown = function(e) {
        if (!_this.songList.length) return;
        _this.Sliding = true; // 禁止进度条滑动
        _this.thumbSlide = true; // 设置样式 transition: none
        let progressL = _this.$refs.track.offsetWidth; // 进度条总长度
        let mouseInitX = e.clientX, // 鼠标按下图标的位置
          mouseEndX = 0,
          moveX = 0,
          thumbInitX = _this.stringToNum(thumb.style.transform), // 上次鼠标按下图标的位置
          thumbEndX = 0;
        //鼠标移动时
        document.onmousemove = function(e) {
          mouseEndX = e.clientX;
          moveX = mouseEndX - mouseInitX; // 滑动的位置 - 鼠标按下图标的位置 = 实际滑动的位置
          let a = thumbInitX + moveX; //  上次鼠标按下图标的位置 + 实际滑动的位置
          if (moveX > 0) {
            // 在播放  thumbEndX = 实际的滑动距离
            // 播放完  thumbEndX = 进度条总长度
            thumbEndX = a > progressL ? progressL : a;
          } else {
            thumbEndX = a <= 0 ? 0 : a;
          }
          // 进度条           实际的滑动距离 /  进度条总长度 (小位数)
          _this.progressScaleX = thumbEndX / progressL;
          // 进度头
          _this.thumbTranslateX = thumbEndX;
          // 当前播放时间
          _this.currentTime = _this.timeToString(
            (thumbEndX * audio.duration) / progressL
          );
        };
        // 鼠标松开
        document.onmouseup = function() {
          // 实际的滑动距离 * 总播放时间 / 进度条总长度
          audio.currentTime = (thumbEndX * audio.duration) / progressL;
          _this.playing = true;
          audio.play();
          _this.thumbSlide = false;
          // 鼠标按下 和 点击进度条 会有冲突 , 加个定时器
          setTimeout(() => (_this.Sliding = false), 200);
          document.onmousedown = null;
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    },
    // 点击进度条
    handClickBar(e) {
      if (!this.Sliding && this.songList.length) {
        this.playing = true;
        audio.play();
        let offsetWidth = this.$refs.track.offsetWidth; // 进度条总长度
        const rect = e.target.getBoundingClientRect(); // 元素右边距离页面边距的距离 返回上下左右
        let length = e.clientX - rect.left; // 实际位置
        // 实际位置 / 进度条总长度 * 总时间
        audio.currentTime = (length / offsetWidth) * audio.duration;
      }
    },
    // 滑动音量
    slideVolume() {
      this.slideFn("volume", this.$refs.thumbV, this.$refs.trackV.offsetWidth);
    },
    // 上一首
    skipBack() {
      this.skipFn("skipBack");
    },

    // 下一首
    skipForward() {
      this.skipFn("skipForward");
    },

    // 选择播放方式
    chosePlayType() {
      let playType = this.playType + 1;
      this.playType = playType > 3 ? 1 : playType;
    },
    // 可以通过 document.hidden 属性判断当前页面是否是激活状态
    setPageListen() {
      let _this = this;
      // 兼容性：IE10+，Firefox10+,Chrome14+,Opera12.1+,Safari7.1+
      var hiddenProperty =
        "hidden" in document
          ? "hidden"
          : "webkitHidden" in document
          ? "webkitHidden"
          : "mozHidden" in document
          ? "mozHidden"
          : null;
      var visibilityChangeEvent = hiddenProperty.replace(
        /hidden/i,
        "visibilitychange"
      );
      var onVisibilityChange = function() {
        if (!document[hiddenProperty]) {
          _this.thumbSlide = true;
          setTimeout(() => {
            _this.thumbSlide = false;
          }, 300);
        }
      };
      document.addEventListener(visibilityChangeEvent, onVisibilityChange);
    },

    // 是否显示播放列表
    handleList() {
      this.listShow = !this.listShow;
    },

    // 列表选歌
    choseSong(item, i) {
      this.song = item;
      this.index = i;
      this.AsyncPlay();
    },

    // 上下首封装
    skipFn(type) {
      const length = this.songList.length;
      switch (this.playType) {
        // 随机播放
        case 2:
          this.index = Math.floor(Math.random() * length);
          break;
        default:
          if (!length) return;
          // 上一首
          if (type == "skipBack") {
            // 0 - 1 = -1  >= 0
            this.index - 1 >= 0 ? this.index-- : (this.index = length - 1);
          } else {
            // 下一首
            this.index = this.index + 1 >= length ? 0 : this.index + 1;
          }
          break;
      }
      this.song = this.songList[this.index];
      this.AsyncPlay();
    },
    // 播放
    AsyncPlay() {
      // 不加定时器 , 有时会获取不到 DOM
      setTimeout(() => {
        this.playing = true;
        audio.play();
      }, 100);
    },
    // 滑动封装
    slideFn(type, thumbDom, progressLength) {
      let thumb = thumbDom;
      let _this = this;
      thumb.onmousedown = function(e) {
        if (type == "progress") {
          audio.pause();
          _this.thumbSlide = true;
        } else {
          _this.thumbVSlide = true;
        }

        let progressL = progressLength;
        let mouseInitX = e.clientX,
          mouseEndX = 0,
          moveX = 0,
          thumbInitX = _this.stringToNum(thumb.style.transform),
          thumbEndX = 0;

        document.onmousemove = function(e) {
          mouseEndX = e.clientX;
          moveX = mouseEndX - mouseInitX;

          let a = thumbInitX - 0 + moveX;
          if (moveX > 0) {
            thumbEndX = a > progressL ? progressL : a;
          } else {
            thumbEndX = a <= 0 ? 0 : a;
          }

          if (type == "progress") {
            _this.progressScaleX = thumbEndX / progressL;
            _this.thumbTranslateX = thumbEndX;
          } else {
            _this.volume = thumbEndX / progressL;
            _this.volumeX = thumbEndX;
          }
        };

        document.onmouseup = function(e) {
          if (type == "progress") {
            audio.currentTime = (thumbEndX * audio.duration) / progressL;
            audio.play();
            _this.thumbSlide = false;
          } else {
            audio.volume = thumbEndX / progressL;
            _this.thumbVSlide = false;
          }
          document.onmousedown = null;
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    },

    // 字符串转数字
    stringToNum(str) {
      return Number(str.replace(/translateX\(|px\)/g, ""));
    },
    // 播放时间
    timeToString(time) {
      if (isNaN(time)) return;
      // 分钟
      let min = Math.floor(time / 60);
      min = min < 10 ? "0" + min : min;
      // 秒
      let sec = Math.floor(time % 60);
      sec = sec < 10 ? "0" + sec : sec;
      return min + ":" + sec;
    },
  },
};
</script>
<style scoped></style>
