<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title>
                        <h1 class="text-center">ยืนยันการประเมิน</h1>
                    </v-card-title>
                    <v-card-text>
                        <br>
                        <v-form v-if="!result.signature" @submit.prevent="saveMember">
                            <v-row>

                                <!-- <v-col cols="12" md="6">
                                    <v-text-field label="ชื่อเอกสาร" v-model="name_doc" :error-messages="error.name_doc" prepend-inner-icon="mdi-file-edit"></v-text-field>
                                </v-col> -->
                                <v-col cols="12" md="12">
                                    <v-file-input label="เอกสาร" v-model="file" :error-messages="error.file" prepend-inner-icon="mdi-file" accept=".pdf" hint="รองรับเฉพาะไฟล์ PDF ขนาด 10MB" persistent-hint></v-file-input>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <center>
                                        <v-btn class="ma-2 text-center" color="primary" type="submit">บันทึก</v-btn>
                                        <v-btn class="ma-2 text-center" color="error" @click="reset()">ยกเลิก</v-btn>
                                    </center>
                                </v-col>
                            </v-row>
                        </v-form>
                        <v-table v-else-if="result.signature" class="mt-3">
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
                                    <td class="border text-center">{{ result.signature }}</td>
                                    <td class="border text-center">
                                        <center>
                                            <v-btn class="text-center ma-2 text-white" color="info" prepend-icon="mdi-eye" @click="view(result.signature)">เปิดดู</v-btn>
                                            <v-btn class="text-center text-white ma-2" size="small" color="error" @click="del(result.id_eva)">ลบ</v-btn>
                                        </center>
                                    </td>
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
import { api, staff,commit } from '~/API/base'

const error = ref<Record<string,string>>({})
const result = ref([])
const name_doc = ref('')
const file = ref<File | null>(null)
const reset = ()=>{
    name_doc.value = ''
    file.value = null
}
const id_eva = useRoute().params.id_eva

const token = import.meta.client ? localStorage.getItem('token'):null

const saveMember = async()=>{

    if(!name_doc.value && !file.value)return alert('กรุณากรอกข้อมูลให้ครบถ้วน')
    const maxSize = 10*1024*1024
    if(file.value?.size > maxSize){

        alert('ไฟล์ขนาดเกิน 10MB')

    }
    const formdata = new FormData
    formdata.append('file',file.value!)
    formdata.append('name_doc',name_doc.value)
    try {

        await axios.post(`${commit}/signature/save/${id_eva}`,formdata,{headers:{Authorization:`Bearer ${token}`}})
        await reset()
        await fetch()
        alert('ทำรายการสำเร็จ')

    } catch (error) {
        console.error("Error Save",error);   
    }
}

const fetch = async()=>{
    try {
        const res = await axios.get(`${commit}/signature/show/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data
    } catch (error) {
        console.error("Error get",error)
    }
}


const del = async(id_doc:number)=>{
    if(!confirm('ต้องการลบข้อมูลชุดนี้ใช่หรือไม่'))return
    try {
        await axios.delete(`${commit}/signature/delete/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        await reset()
        await fetch()
    } catch (error) {
        console.error("Error delete",error);
        
    }
}




const view = (file:string)=>{
    const url = new URL(`/uploads/signature/${file}`,api).href
    window.open(url,'_blank')
}

onMounted(fetch)

</script>

<style scoped>

</style>