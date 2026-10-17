<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title>
                        <h1 class="text-center">สถานะประเมินของกรรมการประเมิน</h1>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field class="mt-3" v-model="search" prepend-inner-icon="mdi-magnify"></v-text-field>
                        <v-table>
                            <thead>
                                <tr>
                                    <th class="border text-center">ลำดับ</th>
                                    <th class="border text-center">ผู้รับการประเมินผล</th>
                                    <th class="border text-center">รอบการประเมิน</th>
                                    <th class="border text-center">วันที่ออกแบบประเมิน</th>
                                    <th class="border text-center">สถานะการประเมิน</th>
                                    <th class="border text-center">รายละเอียด</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(items,index) in result" :key="items.id_eva">
                                    <td class="border text-center">{{ index+1 }}</td>
                                    <td class="border text-center">{{ items.fname }} {{ items.lname }}</td>
                                    <td class="border text-center">รอบการประเมินที่:{{items.round_sys}} ปี:{{ items.year_sys }}</td>
                                    <td class="border text-center">{{ formatDate(items.day_eva) }}</td>
                                    <td class="border text-center"><v-btn class="text-center text-white" :color="bg(items.status_eva)" size="small">{{ items.status_eva === 1 'รอการประเมินตนเอง': items.status_eva === 2 ? 'รอกรรมการประเมิน':'ประเมินสำเร็จ' }}</v-btn></td>
                                    <td class="border text-center"><v-btn class="text-center" color="info" @click="go(items.id_eva)">รายละเอียด</v-btn></td>
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

const dataResult = ref([])
const eva = ref([])
const round = ref([])
const error = ref<Record<string,string>>({})
const search = ref('')
const form = ref({
    id_eva:null,
    id_member:'',
    id_sys:'',
    day_eva:''
})
const reset = ()=>{
    form.value = {
        id_eva:null,
        id_member:'',
        id_sys:'',
        day_eva:''
    }
}
const emailRegex = /^[^\s]+@[^\s]+\.[^\s]{2,}$/i
function validateForm(){
    const f = form.value
    error.value = {}

    if(!f.id_member)error.value.id_member = "กรุณาเลือกผู้รับการประเมินผล"
    if(!f.id_sys)error.value.id_sys = "กรุณาเลือกรอบการประเมินผล"
    if(!f.day_eva)error.value.day_eva = "กรุณาเลือกวันที่ออกแบบประเมิน"

    return Object.keys(error.value).length === 0
}
const token = import.meta.client ? localStorage.getItem('token'):null

const saveMember = async()=>{

    if(!validateForm())return
    const f = form.value
    try {
        
        f.id_eva
        ? await axios.put(`${staff}/eva/update/${f.id_eva}`,f,{headers:{Authorization:`Bearer ${token}`}})
        : await axios.post(`${staff}/eva/save`,f,{headers:{Authorization:`Bearer ${token}`}})
        alert('ทำรายการสำเร็จ')
        await fetch()
        await reset()
    } catch (error) {
        console.error("error save",error);
        
    }

}

const fetch = async()=>{
    try {
        
        const res = await axios.get(`${staff}/eva/show`,{headers:{Authorization:`Bearer ${token}`}})
        dataResult.value = res.data
    } catch (error) {
        console.error("Error get",error);
        
    }
}

const result = computed(()=>{
    if(!search.value)return dataResult.value
    const s = search.value.toLowerCase()
    return dataResult.value.filter((items:any)=>{
        return(
            items.fname.toLowerCase().includes(s) ||
            items.lname.toLowerCase().includes(s)
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

const bg = (status_eva)=>{
    if(status_eva === 1)return 'error'
    if(status_eva === 2)return 'warning'
    if(status_eva === 3)return 'success'
}
const go = (id_eva:number)=>{
    navigateTo({path:`/Staff/status2-${id_eva}`})
}

onMounted(fetch)

</script>

<style scoped>

</style>