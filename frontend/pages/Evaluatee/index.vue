<template>
    <v-container>
        <v-card elevation="5" rounded >
            <v-sheet elevation="5" rounded class="pa-5 py-4">
                <h1 class="font-weight-bold text-center">DashBoard - Evaluatee</h1>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="4" v-for="b in box" :key="b">
                            <v-card elevation="5" rounded="5"  class="pa-1 round">
                                <div class="text-h5 text-center pa-4"><h2 >{{ b.title }}</h2></div>
                                <div class="text-h5 text-center pa-4"><h3 >{{ b.value }}</h3></div>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-sheet>
        </v-card>


        <v-card class="mt-5" elevation="5" rounded >
            <v-sheet elevation="5" rounded class="pa-5 py-4">
                <h1 class="font-weight-bold text-center">รอบการประเมินทั้งหมด</h1>
                <v-table class="table">
                    <tr>
                        <th class="bg-grey p-2 border" style="width: 10%;">ลำดับ</th>
                        <th class="bg-grey p-2 border" style="width: 10%;">ชื่อ - นามสกุล</th>
                        <th class="bg-grey p-2 border" style="width: 10%;">รอบการประเมินที่</th>
                        <th class="bg-grey p-2 border" style="width: 10%;">ปีการประเมิน</th>
                    </tr>
                    <tr v-for="r in round" :key="r">
                        <td class="text-center border pa-2" style="width: 10%;">{{ 1 }}</td>
                        <td class="text-center border pa-2" style="width: 10%;">{{ r.fname }}-{{ r.lname }}</td>
                        <td class="text-center border pa-2" style="width: 10%;">{{ r.round_sys }}</td>
                        <td class="text-center border pa-2" style="width: 10%;">{{ r.year_sys }}</td>
                    </tr>
                </v-table>
            </v-sheet>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { api,eva } from '~/API/base';

const box = ref<any>([])
const round = ref<any>([])

const fecth = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${api}/dash/eva`,{headers:{Authorization:`Bearer ${token}`}})
        box.value = res.data.box
    } catch (error) {
        console.error('ERROR GET BOX',error)
    }
}
const fecthround = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${eva}/table/user`,{headers:{Authorization:`Bearer ${token}`}})
        round.value = res.data
    } catch (error) {
        console.error('ERROR GET BOX',error)
    }
}

onMounted(async()=>{
    await Promise.all([fecth(),fecthround()])
})
</script>

<style scoped>
.round{
    border-radius: 32px !important;
}
</style>