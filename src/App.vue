<template>
  <router-view />
</template>

<script setup lang="ts"></script>

<style lang="scss">
:root {
  --swd-color-cover-dark: rgba(0, 0, 0, 0.5);
  --swd-color-cover-light: rgba(255, 255, 255, 0.4);

  --swd-color-primary: #bd5f09;
  --swd-color-accent: #ffc45d;

  --swd-bg-color-main: #f4f4f5;
  --swd-color-main: #474554;

  --swd-game-window-height: min(100vh, calc(100vw / 1.6));
  --swd-game-window-width: calc(var(--swd-game-window-height) * 1.6);
  --swd-game-sidebar-width: 250px;
  --swd-game-box-height: var(--swd-game-window-height);
  --swd-game-box-width: calc(
    var(--swd-game-window-width) - var(--swd-game-sidebar-width)
  );
  --swd-game-unit: calc(var(--swd-game-box-width) / 100);
  --swd-game-gap-xs: calc(var(--swd-game-unit) * 0.3);
  --swd-game-gap-sm: calc(var(--swd-game-unit) * 0.7);
  --swd-game-gap-md: calc(var(--swd-game-unit) * 1.1);
  --swd-game-gap-lg: calc(var(--swd-game-unit) * 1.5);
  --swd-game-gap-xl: calc(var(--swd-game-unit) * 2);
  --swd-game-gap-xxl: calc(var(--swd-game-unit) * 3);

  --swd-game-radius-sm: calc(var(--swd-game-unit) * 0.6);

  --swd-game-bg: linear-gradient(
    150deg,
    rgba(13, 46, 62, 0.75) 0,
    rgba(126, 126, 126, 0.5) 50%,
    rgba(88, 66, 24, 0.75) 100%
  );
}

html,
body,
#q-app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

body {
  background: var(--swd-bg-color-main);
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: square;
  list-style-position: inside;

  &.mute {
    list-style-type: none;
  }
}

.swd-cover-dark {
  background-color: var(--swd-color-cover-dark);
}

.swd-cover-light {
  background-color: var(--swd-color-cover-light);
}

.swd-game-cover {
  border-radius: var(--swd-game-radius-sm);
  background: var(--swd-game-bg);
}

.swd-btn-primary {
  color: #fff;
  background-color: $primary;
}

.swd-btn-accent {
  color: $dark;
  background-color: $accent;
}

.swd-link {
  color: var(--swd-color-accent);

  &:visited {
    color: var(--swd-color-accent);
  }
}

.swd-dialog {
  color: white;
  background: black var(--swd-game-bg);
  border: 2px solid $primary;
  border-radius: $generic-border-radius;
  max-width: 60vw !important;
}

.text-welcome {
  color: #5e60ce;
}

.bg-welcome {
  background-color: #5e60ce;
}

::placeholder {
  color: #aaa !important;
}
</style>
