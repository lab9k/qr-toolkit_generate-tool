<template>
  <v-container>
    <v-text-field
      v-model.number="amount"
      type="number"
      :rules="amountRules"
      label="Amount of codes"
    />
    <v-text-field
      v-model="suffix"
      label="Suffix"
      :rules="suffixRules"
    />
    <v-container fluid>
      <v-col>
        <v-row
          v-for="(_, index) in amountToDisplay"
          :key="index"
          justify="center"
        >
          <p>
            {{ urls[index].url }}
          </p>
        </v-row>
        <v-row
          v-if="amount > 3"
          justify="center"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-row>
        <v-row justify="center">
          <v-btn
            color="success"
            @click="verifyAndGenerate"
          >
            Verify & Generate
          </v-btn>
        </v-row>
      </v-col>
    </v-container>
  </v-container>
</template>
<script>
import { mutationTypes } from '@/store/mutations';

export default {
  name: 'SingleModeForm',
  data() {
    return {
      baseURL: process.env.VUE_APP_QR_KIT_BASE_URL,
      suffix: '',
      suffixRules: [
        (v) => !!v || 'This field is required',
        (v) => v.indexOf(' ') < 0 || 'You cannot use spaces in the suffix, please use "-" or "_"',
      ],
      amount: 1,
      amountRules: [
        (v) => !!v || 'This should not be empty',
        (v) => v >= 1 || 'This number should be positive, excluding zero.',
      ],
    };
  },
  computed: {
    amountToDisplay() {
      // ? Only display 3 items, even when generating more than that
      return this.amount > 3 ? 3 : this.amount;
    },
    urls() {
      const urls = [];

      for (let i = 0; i < this.amount; i += 1) {
        const base = this.baseURL.endsWith('/') ? this.baseURL : `${this.baseURL}/`;
        let url = base;
        let { suffix } = this;
        if (this.amount > 1 && i > 0) {
          suffix += i;
        }
        url += suffix;
        urls.push({ id: i, url, suffix });
      }

      return urls;
    },
  },
  methods: {
    async verifyAndGenerate() {
      await this.$store.commit(mutationTypes.UPDATE_URLS_TO_GENERATE, this.urls);
      this.$router.push({ name: 'Generate' });
    },
  },
};
</script>
