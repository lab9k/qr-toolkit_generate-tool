<template>
  <v-container>
    <p>Total codes to verify and generate: {{ urls.length }}</p>
    <p>Total codes safe to generate: {{ safeUrls.length }}</p>
    <p>Total codes unsafe (exists): {{ urls.length - safeUrls.length }}</p>
    <p>Codes Generated: {{ generatedCodes.length }}</p>
    <v-container fluid>
      <v-row>
        <v-col
          v-for="code in generatedCodes"
          :key="code.id"
          cols="3"
        >
          <v-card>
            <v-img :src="`https://qrcodeservice.herokuapp.com/?query=${code.scan_url}`" />
            <v-card-subtitle>
              {{ code.scan_url }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import { getterTypes } from '../store/getters';


export default {
  name: 'GenerationView',
  data() {
    return {
      verificationResults: [],
      generatedCodes: [],
      apiURL: process.env.VUE_APP_QR_KIT_API_URL,
    };
  },
  computed: {
    ...mapGetters({ urls: getterTypes.URLS }),
    safeUrls() {
      return this.verificationResults.filter((el) => !el.exists);
    },
  },
  mounted() {
    this.verifyAndGenerateCodes();
  },
  methods: {
    async verifyAndGenerateCodes() {
      const allPromises = this.urls.map((el) => this.processSingleCode(el));
      await Promise.all(allPromises);
      const creationUrl = `${this.apiURL}code/`;
      const generationPromises = this.safeUrls
        .map((el) => this.$axios.post(creationUrl, { uuid: el.suffix })
          .then(({ data }) => this.generatedCodes.push(data)));
      await Promise.all(generationPromises);
    },
    async processSingleCode({ suffix }) {
      const checkURL = `${this.apiURL}exists/${suffix}/`;
      const dataPromise = this.$axios.get(checkURL);
      dataPromise.then((result) => this.verificationResults.push({ ...result.data, suffix }));
      return dataPromise;
    },
  },
};


</script>
