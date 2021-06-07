<template>
  <div class="d-flex flex-column p-3 col-2 text-white sidenav">
    <a
      href="/"
      class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
    >
      <Logo :width="40" :height="40" class="mx-2" />
      <span class="head-title">Global Music</span>
    </a>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <nuxt-link to="/album" class="nav-link text-white">
          <i class="fas fa-compact-disc"></i> Album
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/singer" class="nav-link text-white">
          <i class="fas fa-microphone-alt ml-1"></i> Ca Sĩ
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/genre" class="nav-link text-white">
          <i class="fas fa-box"></i> Thể Loại
        </nuxt-link>
      </li>
      <!-- <li>
        <nuxt-link to="/top100" class="nav-link text-white">
          <i class="fab fa-atlassian"></i> Top 100
        </nuxt-link>
      </li> -->
      <li>
        <nuxt-link to="/playlist" class="nav-link text-white">
          <i class="fas fa-play ml-1"></i> Playlist
        </nuxt-link>
      </li>
    </ul>
    <hr />
  </div>
</template>