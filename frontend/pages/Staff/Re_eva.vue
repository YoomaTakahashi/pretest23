<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title>
                        <h1 class="text-center">รายงาน</h1>
                    </v-card-title>
                    <v-card-text>

                        <v-table>
                            <thead>
                                <tr>
                                    <th class="border text-center">ลำดับ</th>
                                    <th class="border text-center">ชื่อ-นามสกุล</th>
                                    <th class="border text-center">อีเมล</th>
                                    <th class="border text-center">ชื่อผู้ใช้งาน</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(items,index) in result" :key="items.id_member">
                                    <td class="border text-center">{{ index+1 }}</td>
                                    <td class="border text-center">{{ items.fname }} {{ items.lname }}</td>
                                    <td class="border text-center">{{ items.email }}</td>
                                    <td class="border text-center">{{ items.username }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                        <center><v-btn class="mt-3 text-center text-white no-p" color="warning" @click="print()" prepend-icon="mdi-printer">พิมพ์</v-btn></center>
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
const error = ref<Record<string,string>>({})

const token = import.meta.client ? localStorage.getItem('token'):null

const fetch = async()=>{
    try {
        
        const res = await axios.get(`${staff}/member/showE`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data

    } catch (error) {
        console.error("Error get",error);
        
    }
}

const print = ()=>{
    window.print()
}


onMounted(fetch)

</script>

<style scoped>
@media print {
    .v-app-bar,.v-btn.no-p{
        display: none !important;
        margin: 0 !important;
        margin-top: 0 !important;
        padding: 0 !important;
        width: 100% !important;
    }
    td,th{
        border: 1px solid black !important;
        color: black !important;
    }
    h1,h2,h3{
        color: black !important;
    }
}
</style>