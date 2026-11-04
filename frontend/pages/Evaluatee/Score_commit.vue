<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_eva === 2|| user.status_eva ===3">
                    <h1 class="font-weight-bold">ผลการประเมินผลของกรรมการประเมิน</h1>
                    <v-card :elevation="5" rounded class="pa-4 py-4">
                        <p>ผู้ใช่งาน : {{ user.fname }} {{ user.lname }}</p>
                        <p>รอบการประเมินที่ : {{ user.round_sys }} ปี {{ user.year_sys }}</p>
                    </v-card>
                    <v-row v-for="(topic,t) in topics" :key="topic.id_topic">
                        <v-col cols="12">
                            <h1 class="font-weight-bold">{{ t+1 }}.{{ topic.name_topic }}</h1>
                            <v-table class="table">
                                <tr>
                                    <th class="bg-grey p-2 border" style="width: 10%;">ตัวชี้วัด</th>
                                    <th class="bg-grey p-2 border" style="width: 10%;">รายละเอียดตัวชี้วัด</th>
                                    <th class="bg-grey p-2 border" style="width: 10%;">น้ำหนักคะแนน</th>
                                    <th class="bg-grey p-2 border" style="width: 10%;">คะแนนเต็ม</th>
                                    <th class="bg-grey p-2 border" style="width: 10%;">ประธาน</th>
                                    <th class="bg-grey p-2 border" style="width: 10%;">กรรมการ</th>
                                    <th class="bg-grey p-2 border" style="width: 10%;">เลขา</th>
                                    <th class="bg-grey p-2 border" style="width: 10%;">คะแนนที่ได้</th>
                                </tr>
                                <tr v-for="(indicate,i) in topic.indicates" :key="indicate.id_indicate">
                                    <td class="text-center border pa-2" style="width: 10%;">{{ indicate.name_indicate }}</td>
                                    <td class="text-center border pa-2" style="width: 10%;">{{ indicate.detail_indicate }}</td>
                                    <td class="text-center border pa-2" style="width: 10%;">{{ indicate.point_indicate }}</td>
                                    <td class="text-center border pa-2" style="width: 10%;">{{ indicate.point_indicate*4 }}</td>
                                    <td class="text-center border pa-2" style="width: 10%;">{{ scores[indicate.id_indicate]?. a ?? 'รอประธานประเมิน' }}</td>
                                    <td class="text-center border pa-2" style="width: 10%;">{{ scores[indicate.id_indicate]?. b ?? 'รอกรรมการประเมิน' }}</td>
                                    <td class="text-center border pa-2" style="width: 10%;">{{ scores[indicate.id_indicate]?. c ?? 'รอเลขาประเมิน' }}</td>
                                    <td class="text-center border pa-2" style="width: 10%;">{{ (((scores[indicate.id_indicate]?. a ?? 0)+(scores[indicate.id_indicate]?. b ?? 0)+(scores[indicate.id_indicate]?. c ?? 0))/3).toFixed(2) }}</td>
                                </tr>
                            </v-table>
                        </v-col>
                    </v-row>
                    <div class="mt-3 text-end">
                        <v-card color="green " type="submit">คะแนนรวมสุทธิ : {{ ((user.total_commit)/3).toFixed(2) }} คะแนน</v-card>
                    </div>
                    <div class="mt-3">
                        <v-card>
                            <v-row>
                                <label for="">ข้อเสนอแนะของกรรมการ</label>
                                <v-row>
                                    <v-col cols="12" v-for="(commit,c) in commits" :key="commit.id_commit">
                                     {{ c+1 }}.{{ commit.level_commit }} : {{ commit.detail_commit || 'รอการประเมิน' }}
                                    </v-col>
                                </v-row>
                            </v-row>
                        </v-card>
                    </div>
                </v-form>
                <v-alert type="warning" variant="tonal" color="warning  " v-else-if="user.status_eva === 1">ยังไม่ได้ประเมินตนเอง</v-alert>
                <v-alert type="error" variant="tonal" color="error" v-else>ไม่มีแบบประเมิน</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { api, eva } from '~/API/base';

const user = ref<any>({})
const topics = ref<any>([])
const scores = ref<any>([])
const commits = ref<any>([])


const viwe =(file:string)=>{
    const url = new URL(`/uploads/file_eva/${file}`,api).href
    window.open(url,'_blank')
}

const fetch = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${eva}/selfeva/user`,{headers:{Authorization:`Bearer ${token}`}})
        user.value =res.data
    } catch (error) {
        console.error('Error get user ',error)
    }
}
const fetchTopic = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${eva}/selfeva/topic`,{headers:{Authorization:`Bearer ${token}`}})
        topics.value =res.data
    } catch (error) {
        console.error('Error get user ',error)
    }
}
const fetchCommit = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${eva}/score_commit/commit`,{headers:{Authorization:`Bearer ${token}`}})
        commits.value =res.data
    } catch (error) {
        console.error('Error get user ',error)
    }
}
const fetchScore = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${eva}/score_commit/scores`,{headers:{Authorization:`Bearer ${token}`}})
        scores.value =res.data
    } catch (error) {
        console.error('Error get user ',error)
    }
}

onMounted(async()=>{
    await Promise.all([fetch(),fetchTopic(),fetchCommit(),fetchScore()])
})







</script>

<style scoped>

</style>