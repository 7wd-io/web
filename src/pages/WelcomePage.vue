<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-8">
        <div class="hero">
          <h3 class="text-center text-white text-bold q-pt-lg q-pb-lg">
            7wd is a platform to play the game, <br />
            based on <span style="white-space: nowrap">7 wonders duel</span>
          </h3>

        </div>

        <div class="row justify-center">
          <div class="screen" />
        </div>

        <h4 class="text-center text-bold">
          Why you will enjoy playing here?
        </h4>

        <div class="advantages row justify-center q-gutter-md q-mb-lg">
          <q-card
            class="col-3"
            v-for="(card, i) in cards"
            :key="i"
          >
            <q-card-section>
              <div class="img" :class="`img-${card.img}`"/>
            </q-card-section>
            <q-card-section>
              <div class="text-h5 text-bold">
                {{ card.title }}
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none text-subtitle1" v-html="card.body" />
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
interface Card {
  title: string,
  body: string,
  img: string,
}

const cards: Card[] = [
  {
    title: 'It\'s free',
    body: 'Without functional limits',
    img: 'free',
  },
  {
    title: 'Advanced stats',
    body: 'You can see your wins/losses both in general'
      + ' and against specific players in terms of civilian/military/science',
    img: 'stats',
  },
  {
    title: 'Game assistance',
    body: '<ul>'
      + '<li>Runtime scoring</li>'
      + '<li>Final tile prices</li>'
      + '<li>Resource counters and prices</li>'
      + '</ul>',
    img: 'assistance',
  },
  {
    title: 'Advanced room settings',
    body: '<ul>'
      + '<li>Fast game</li>'
      + '<li>Private rooms</li>'
      + '<li>Min/max rating</li>'
      + '</ul>',
    img: 'settings',
  },
  {
    title: 'Log',
    body: 'All moves are logged for easy viewing and replaying',
    img: 'log',
  },
  {
    title: 'Tournaments',
    body: 'Regular tournaments to find out who is the best',
    img: 'tournaments',
  },
];
</script>

<style lang="scss" scoped>
.hero {
  width: 100%;
  text-shadow: 2px 2px #333;
}

.screen {
  height: 600px;
  width: 1140px;
  min-width: 1140px;
  border-radius: 15px;
  background: url('/img/game_screen.png') no-repeat center/cover;
}

.advantages {
  .img {
    height: 150px;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 100%;
  }

  .img-free {
    background-image: url('/img/advantages/free.png');
  }

  .img-stats {
    background-image: url('/img/advantages/stats.png');
  }

  .img-assistance {
    background-image: url('/img/advantages/assistance.png');
  }

  .img-settings {
    background-image: url('/img/advantages/settings.png');
  }

  .img-log {
    background-image: url('/img/advantages/log.png');
  }

  .img-tournaments {
    background-image: url('/img/advantages/tournaments.png');
  }
}
</style>
