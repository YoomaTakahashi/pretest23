<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1 class="font-weight-bold">ตรวจสอบผลการประเมิน</h1>
            </v-col>
            <v-col cols="12">
                <v-sheet elevation="5" rounded class="pa-5 py-5">
                    <center>
                        <nuxt-link to="/Evaluatee/Score_member" ><v-btn color="green">ผลการประเมินผลของผู้รับการประเมินผล</v-btn></nuxt-link>&nbsp;&nbsp;
                        <nuxt-link to="/Evaluatee/Score_commit" ><v-btn color="blue">ผลการประเมินผลของกรรมการประเมิน</v-btn></nuxt-link>
                    </center>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>