<template>
    <v-container fluid class="py-10">
                <v-card>
                    <v-sheet class="pa-4" color="">
                        <h1 class="text-h5 font-weight-bold">ตรวจสอบผลและยืนยันผล</h1>
                    </v-sheet>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th class="text-center border">ลำดับ</th>
                                    <th class="text-center border">ชื่อ</th>
                                    <th class="text-center border">นามสกุล</th>
                                    <th class="text-center border">วันที่ออกแบบประเมิน</th>
                                    <th class="text-center border">รอบการประเมิน</th>
                                    <th class="text-center border">ผลการประเมิน</th>
                                    <th class="text-center border">ยืนยันผลประเมิน</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(items,index) in result" :key="items.id_eva">
                                    <td class="text-center border">{{ index+1 }}</td>
                                    <td class="text-center border">{{ items.fname }}</td>
                                    <td class="text-center border">{{ items.lname }}</td>
                                    <td class="text-center border">{{ formatDate(items.day_eva) }}</td>
                                    <td class="text-center border">รอบการประเมินที่ {{ items.round_sys }} ปี {{ items.year_sys }}</td>
                                    <td class="text-center border"><v-btn color="blue" class="text-white" size="small" @click="check(items.id_eva)">ตรวจสอบ</v-btn></td>
                                    <td class="text-center border">
                                        <v-btn v-if="items.signature" color="success" class="text-white" size="small" @click="go(items.id_eva)">ยืนยันผล</v-btn>
                                        <v-btn v-else color="blue" class="text-white" size="small" @click="go(items.id_eva)">ยืนยันผลแล้ว</v-btn>
                                    </td>
                                </tr>
                                <tr v-if="result.length === 0">
                                    <td class="text-center border" colspan="10">ไม่พบข้อมูล</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
   </v-container>
</template>

<script setup lang="ts">
import axios from 'axios'
import {api,commit} from '../../API/base'

const token = import.meta.client ? localStorage.getItem('token') : null

const result = ref ([])

const fetch = async () => {
    try{
        const res = await axios.get(`${commit}/check`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data
    }catch(err){
        console.error("Error Fetching",err)
    }
}

const formatDate = (dateStr:string)=>{

    if(!dateStr)return '-'
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2,'0')
    const month = String(date.getMonth()+1).padStart(2,'0')
    const year = String(date.getFullYear())

    return `${day}/${month}/${year}`

}

const check = (id_eva:number) => {
    navigateTo({path:`/Committee/Score_commit${id_eva}`})
}
const go = (id_eva:number) => {
    navigateTo({path:`/Committee/Signature${id_eva}`})
}

onMounted(fetch)
</script>

<style scoped>

</style>