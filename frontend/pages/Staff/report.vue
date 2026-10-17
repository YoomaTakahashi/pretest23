<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title><h1 class="text-center">รายงาน</h1></v-card-title>
                    <v-card-text>
                        <v-table class="mt-3">
                            <thead>
                                <tr>
                                    <th class="border text-center">ลำดับ</th>
                                    <th class="border text-center">รายงาน</th>
                                    <th class="border text-center">รายละเอียด</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="border text-center">1</td>
                                    <td class="border text-center">รายงาน</td>
                                    <td class="border text-center"><v-btn class="text-center" color="primary" to="/Staff/Re_eva">รายละเอียด</v-btn></td>
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

</script>

<style scoped>

</style>