<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title>
                        <h1 class="text-center">เอกสารหรือคู่มือการประเมิน</h1>
                    </v-card-title>
                    <v-card-text>
                        <v-table class="mt-3">
                            <thead>
                                <tr>
                                    <th class="border text-center">ลำดับ</th>
                                    <th class="border text-center">ชื่อเอกสาร</th>
                                    <th class="border text-center">เอกสาร</th>
                                    <th class="border text-center">วันที่ออกเอกสาร</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(items,index) in result" :key="items.id_doc">
                                    <td class="border text-center">{{ index+1 }}</td>
                                    <td class="border text-center">{{ formatDate(items.day_doc) }}</td>
                                    <td class="border text-center">{{ items.name_doc }}</td>
                                    <td class="border text-center"><v-btn class="text-center ma-2 text-white" color="info" prepend-icon="mdi-eye" @click="view(items.file)">เปิดดู</v-btn></td>
                                </tr>
                                <tr>
                                    <td colspan="12" class="text-center text-red" v-if="result.length === 0">ไม่พบข้อมูล</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios'
import { api, staff } from '~/API/base'

const error = ref<Record<string,string>>({})
const search = ref('')
const dataResult = ref([])
const name_doc = ref('')
const file = ref<File | null>(null)
const reset = ()=>{
    name_doc.value = ''
    file.value = null
}

const token = import.meta.client ? localStorage.getItem('token'):null



const fetch = async()=>{
    try {
        const res = await axios.get(`${api}/docnoe/show`,{headers:{Authorization:`Bearer ${token}`}})
        dataResult.value = res.data
    } catch (error) {
        console.error("Error get",error)
    }
}




const result = computed(()=>{

    if(!search.value)return dataResult.value
    const s = search.value.toLowerCase()

    return dataResult.value.filter((items:any)=>{
        return(
            items.name_doc.toLowerCase().includes(s)
        )
    })

})

const formatDate = (dateStr:string)=>{
    if(!dateStr)return '-'
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2,'0')
    const month = String(date.getMonth()+1).padStart(2,'0')
    const year = String(date.getFullYear())
    return `${day}/${month}/${year}`
}

const view = (file:string)=>{
    const url = new URL(`/uploads/document/${file}`,api).href
    window.open(url,'_blank')
}

onMounted(fetch)

</script>

<style scoped>

</style>