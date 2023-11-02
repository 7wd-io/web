<template>
  <q-page padding class="text-white">
    <div class="row justify-center">
      <div class="col-8">
        <h4>About</h4>
        <div class="text-body1">
          <p>
            This project was made by a fan for fans to play one of the best
            board games
          </p>

          <p>
            Founder and developer Danila Stivrinsh
            <q-btn
              round
              flat
              icon="bi-linkedin"
              href="https://www.linkedin.com/in/danila-stivrinsh-b3a102177"
              target="_blank"
            />
            <q-btn
              round
              flat
              icon="bi-github"
              href="https://github.com/Ridzhi"
              target="_blank"
            />
          </p>

          <ul>
            Technical details:

            <li>Server: golang, fiber, pgx</li>
            <li>Client: vue3, quasar2, typescript, pinia</li>
            <li>Infra: pg, redis, centrifugo</li>
            <li>
              Bot, based on neural network
              <q-btn
                round
                flat
                icon="bi-git"
                href="https://github.com/dfomin/7wd-bot"
                target="_blank"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </q-page>
</template>
