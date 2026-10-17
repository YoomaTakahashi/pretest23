<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title>
                        <h1 class="text-center">ยืนยันผลการประเมิน</h1>
                    </v-card-title>
                    <v-card-text>
                        <br>
                        <v-form v-if="!dataResult.signature" @submit.prevent="saveMember">
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-file-input label="เอกสาร" v-model="file" prepend-inner-icon="mdi-file" accept=".pdf" hint="รองรับเฉพาะไฟล์ PDF ขนาดไม่เกิน 10MB" persistent-hint></v-file-input>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <center>
                                        <v-btn class="text-center ma-2" color="primary" type="submit">บันทึก</v-btn>
                                        <v-btn class="text-center ma-2" color="error" @click="reset()">ยกเลิก</v-btn>
                                    </center>
                                </v-col>
                            </v-row>
                        </v-form>
                        <v-table v-else >
                            <thead>
                                <tr>
                                    <th class="border text-center">ลำดับ</th>
                                    <th class="border text-center">ชื่อเอกสาร</th>
                                    <th class="border text-center">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="border text-center">{{ 1 }}</td>
                                    <td class="border text-center">{{ dataResult.signature }}</td>
                                    <td class="border text-center">
                                        <center>
                                            <v-btn class="text-center" color="info" prepend-icon="mdi-eye" @click="view(dataResult.signature)">เปิดดู</v-btn>
                                            <v-btn class="text-center text-white ma-2" size="small" color="error" @click="del">ลบ</v-btn>
                                        </center>
                                    </td>
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
import { api, staff,commit } from '~/API/base'

const dataResult = ref<any>({})
const file = ref<File | null>(null)
const error = ref<Record<string,string>>({})
const search = ref('')
const name_doc = ref('')
const id_eva = useRoute().params.id_eva

const reset = ()=>{
    name_doc.value = ''
    file.value = null
}
const token = import.meta.client ? localStorage.getItem('token'):null

const saveMember = async()=>{

    if(!name_doc.value && !file.value)return alert('กรอกข้อมูลให้ครบถ้วน')
    const maxSize = 10*1024*1024
    if(file.value?.size > maxSize){
        alert("ไฟล์มีขนาดเกิน 10MB")
    }
    const formdata = new FormData
    formdata.append('name_doc',name_doc.value)
    formdata.append('file',file.value!)
    try {
        
        const res = await axios.post(`${commit}/signature/${id_eva}`,formdata,{headers:{Authorization:`Bearer ${token}`}})
        alert('ทำรายการสำเร็จ')
        await fetch()
        await reset()
        console.log(res)
    } catch (error) {
        console.error("error save",error);
        
    }

}

const fetch = async()=>{
    try {   
        const res = await axios.get(`${commit}/signature/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
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

const del = async()=>{
    if(!confirm('ต้องการลบข้อมูลชุดนี้ใช่หรือไม่'))return
    try {
        await axios.delete(`${commit}/signature/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        await fetch()
        await reset()
    } catch (error) {
        console.error("Error delete",error);
        
    }
}

const view = (file:string)=>{
    const url = new URL(`/uploads/signature/${file}`,api).href
    window.open(url,'_blank')
}

// const edit = (items:any)=>{

//     form.value = {...items}

// }



onMounted(fetch)

</script>

<style scoped>

</style>