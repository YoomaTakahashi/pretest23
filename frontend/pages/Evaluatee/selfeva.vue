<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form @submit.prevent="saveScore">
                    <h1 class="font-weight-bold">แบบประเมินตนเอง</h1>
                    <v-card :elevation="5" rounded class="pa-4 py-4"">
                        <p>ผู้ใช้งาน : {{ user.fname }} {{ user.lname }}</p>
                        <p>รอบการประเมินที่ : {{ user.round_sys }} {{ user.year_sys }}</p>
                    </v-card>
                    <v-row v-for="(topic,t) in topics" :key="topic.id_topic">
                        <v-col cols="12">
                            <h1 class="font-weight-bold">{{ t+1 }}.{{ topic.name_topic }}</h1>
                            <v-card :elevation="5" rounded class="pa-5 py-3">
                                <v-row v-for="(indicate,i) in topic.indicate" :key="indicate.id_indicate">
                                    <v-col cols="12">
                                        {{ t+1 }}.{{ i+1 }} {{ indicate.name_indicate }} รายละเอียดของตัวชี้วัด : {{ indicate.detail_indicate }} น้ำหนักคะแนน : {{ indicate.point_indicate }} คะแนนเต็ม : {{ indicate.point_indicate*4 }}
                                        <v-textarea label="คำอธิบายเพิ่มเติม(ถ้ามี)" v-model="indicate.detail_eva" rows="2" class="mt-2" ></v-textarea>
                                        <v-file-input label="*** รองรับเฉพาะนามสกุล .png .jpg .pdf *** " v-model="indicate.file_eva" @change="onFilechange($event,topic.id_topic,indicate.id_indicate)" accept=".png,.jpg,.pdf"></v-file-input>
                                        <v-select variant="solo-filled" label="ใส่คะแนน1-4" v-model="indicate.score"  :items="[1,2,3,4]" ></v-select>
                                        <v-text-feild variant="solo-filled" label="ใส่คะแนน1-4" v-model="indicate.score" @input="indicate.score > 4 ? indicate.score = 4 :null"></v-text-feild>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>