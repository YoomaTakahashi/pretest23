<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card class="mb-3">
                    <v-card-title><h1 class="text-center">ผู้รับการประเมินผล</h1></v-card-title>
                    <v-card-text>
                        <p>ชื่อ-นามสกุล: {{ header.fname }} {{ header.lname }}</p>
                        <p>รอบการประเมิน: {{ header.round_sys }} ปี:{{ header.year_sys }}</p>
                    </v-card-text>
                </v-card>
                <v-card>
                    <v-card-title>
                        <h1 class="text-center">สถานะประเมินของกรรมการประเมิน</h1>
                    </v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th class="border text-center">ลำดับ</th>
                                    <th class="border text-center">กรรมการประเมิน</th>
                                    <th class="border text-center">ตำแหน่ง</th>
                                    <th class="border text-center">สถานะการประเมิน</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(items,index) in result" :key="items.id_commit">
                                    <td class="border text-center">{{ index+1 }}</td>
                                    <td class="border text-center">{{ items.fname }} {{ items.lname }}</td>
                                    <td class="border text-center">{{ items.level_commit }}</td>
                                    <td class="border text-center"><v-btn class="text-center text-white" :color="bg(items.status_commit)" size="small">{{ items.status_commit === 'y' ? 'ประเมินสำเร็จ':'รอการประเมิน' }}</v-btn></td>
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
import { staff } from '~/API/base'

const result = ref([])
const header = ref([])
const error = ref<Record<string,string>>({})
const search = ref('')

const token = import.meta.client ? localStorage.getItem('token'):null
const id_eva = useRoute().params.id_eva
const fetch = async()=>{
    try {
        
        const res = await axios.get(`${staff}/commit/header/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        header.value = res.data
        const res2 = await axios.get(`${staff}/status/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res2.data
    } catch (error) {
        console.error("Error get",error);
        
    }
}

// const result = computed(()=>{
//     if(!search.value)return dataResult.value
//     const s = search.value.toLowerCase()
//     return dataResult.value.filter((items:any)=>{
//         return(
//             items.fname.toLowerCase().includes(s) ||
//             items.lname.toLowerCase().includes(s)
//         )
//     })
// })

const formatDate = (dateStr:string)=>{
    if(!dateStr)return '-'
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2,'0')
    const month = String(date.getMonth()+1).padStart(2,'0')
    const year = String(date.getFullYear())

    return `${day}/${month}/${year}`
}

const bg = (status_commit)=>{
    if(status_commit === 'n')return 'error'
    if(status_commit === 'y')return 'success'
}
const go = (id_eva:number)=>{
    navigateTo({path:`/Staff/status2-${id_eva}`})
}

onMounted(fetch)

</script>

<style scoped>

</style>