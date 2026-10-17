<template>
    <v-container>
        <v-card :elevation="5" rounded>
            <v-sheet :elevation="5" rounded class="pa-4">
                <h1 class="font-weight-bold text-center" >DashBoard - Evaluatee</h1>
                <v-card-text>
                <v-row>
                    <v-col cols="12" md="4" v-for="b in box" :key="b">
                        <v-card class="pa-5 py-4" :elevation="5" rounded >
                            <div class="text-center pa-2 text-h5">{{ b.title }}</div>
                            <div class="text-center pa-2 text-h5">{{ b.value }}</div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
            </v-sheet>
        </v-card>



        <v-card class="mt-5" :elevation="5" rounded>
            <v-sheet :elevation="5" rounded class="pa-4">
                <h2 class="font-weight-bold text-center" >รอบการประเมินทั้งหมด</h2>
                <v-card-text>
                <v-row>
                    <v-col cols="12" >
                        <v-table class="table">
                            <tr>
                                <th class="border pa-1 bg-grey" style="width: 10%;" >ลำดับ</th>
                                <th class="border pa-1 bg-grey" style="width: 10%;" >ชื่อ - นามสกุล</th>
                                <th class="border pa-1 bg-grey" style="width: 10%;" >รอบการประเมิน</th>
                                <th class="border pa-1 bg-grey" style="width: 10%;" >ปีการประเมิน</th>
                            </tr>
                            <tr v-for="(r,index) in round" :key="r">
                                <td class="text-center pa-1 border" style="width: 10%;">{{ index+1 }}</td>
                                <td class="text-center pa-1 border" style="width: 10%;">{{ r.fname }}-{{ r.lname }}</td>
                                <td class="text-center pa-1 border" style="width: 10%;">{{ r.round_sys }}</td>
                                <td class="text-center pa-1 border" style="width: 10%;">{{ r.year_sys }}</td>
                            </tr>
                        </v-table>
                    </v-col>
                </v-row>
            </v-card-text>
            </v-sheet>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { eva,api } from '~/API/base';

const box = ref([])
const round = ref<any>({})

const fetch = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${api}/dash/eva`,{headers:{Authorization:`Bearer ${token}`}})
        box.value =res.data.box
    } catch (error) {
        console.error('error get ',error)
    }
}
const fetchR = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${eva}/table/`,{headers:{Authorization:`Bearer ${token}`}})
        round.value =res.data
    } catch (error) {
        console.error('error get ',error)
    }
}

onMounted(async()=>{
    await Promise.all([fetch(),fetchR()])
})
</script>

<style scoped>

</style>