<template>
  <TheHeader :header="dataJson.header" />
  <div class="content">
    <Banner :banner="dataJson.banner" />
    <Business :bisiness="dataJson.bisiness" />
    <TrialTariff :tariff="dataJson.tariff" />
    <Personal :personal="dataJson.personal" />
    <Advantages :advantages="dataJson.advantages" />
    <Partners :partners="dataJson.partners" />
    <Experts :experts="dataJson.experts" :modal="dataJson.modal" />
    <Reviews :reviews="dataJson.reviews" />
    <Faq :faq="dataJson.faq" />
    <Questions :questions="dataJson.questions" />
  </div>
  <TheFooter :footer="dataJson.footer" />
  <UiCookieBanner />
  <ModalsContainer />
</template>

<script setup>
  import { ModalsContainer } from 'vue-final-modal';
  import dataJson from './data.json';
  import {
    TheHeader,
    Banner,
    Business,
    TrialTariff,
    Personal,
    Advantages,
    Partners,
    Experts,
    Reviews,
    Faq,
    Questions,
    TheFooter,
  } from '@/components/common';
  import UiCookieBanner from '@/components/UI/UiCookieBanner.vue';
</script>
