<template>
    <v-container>
        <v-card :elevation="5" rounded>
            <v-sheet :elevation="5" rounded class="pa-4">
                <h1 class="font-weight-bold text-center" >DashBoard - Staff</h1>
                <v-card-text>
                <v-row>
                    <v-col cols="12" md="4" v-for="b in box" :key="b">
                        <v-card class="pa-5 py-4" :elevation="5" rounded >
                            <div class="text-center pa-2 text-h5">{{ b.title }}</div>
                            <div class="text-center pa-2 text-h5">{{ b.value }}</div>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="4" v-for="b in box2" :key="b">
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
                <h2 class="font-weight-bold text-center" >รายชื่อผู้รับการประเมินผล</h2>
                <v-card-text>
                <v-row>
                    <v-col cols="12" >
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
                    </v-col>
                </v-row>
            </v-card-text>
            </v-sheet>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { eva,api, staff } from '~/API/base';

const box = ref([])
const box2 = ref([])
const result = ref<any>({})

const fetch = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${staff}/member/showE`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data
        const res2 = await axios.get(`${api}/dash/staff`,{headers:{Authorization:`Bearer ${token}`}})
        box.value = res2.data.box
        box2.value = res2.data.box2
    } catch (error) {
        console.error('error get ',error)
    }
}

onMounted(fetch)
</script>

<style scoped>

</style>