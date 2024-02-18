<template>
  <TheHeader :header="dataJson.header" />
  <div class="content">
    <Banner :banner="dataJson.banner" />
    <Business :bisiness="dataJson.bisiness" />
    <Tariff :tariff="dataJson.tariff" />
    <Advantages :advantages="dataJson.advantages" />
    <Partners :partners="dataJson.partners" />
    <Experts :experts="dataJson.experts" />
    <Reviews :reviews="dataJson.reviews" />
    <Protect :protect="dataJson.protect" />
  </div>
  <TheFooter :footer="dataJson.footer" />
  <ModalsContainer />
</template>

<script setup>
  import { ModalsContainer } from 'vue-final-modal';
  import dataJson from './data.json';

  import {
    TheHeader,
    Banner,
    Business,
    Tariff,
    Advantages,
    Partners,
    Experts,
    Reviews,
    Protect,
    TheFooter,
  } from '@/components/common';
</script>
