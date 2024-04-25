<template>

    <div class="card">
        <div class="d-flex align-items-center justify-content-between card-header pb-0">
            <h3>Danh sách hóa đơn đã hủy</h3>
            <div class="bnt-bill">
                <router-link :to="{ name: 'BillListUnCheck' }" class="btn btn-secondary d-lfex mx-4">Hóa đơn chưa
                    duyệt</router-link>
                <router-link :to="{ name: 'BillListCheck' }" class="btn btn-success d-lfex mx-4">Hóa đơn đã
                    duyệt</router-link>

            </div>
        </div>
        <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                    <thead>
                        <tr>
                            <th class="text-uppercase text-secondary font-weight-bolder opacity-9">
                                Tên khách hàng
                            </th>
                            <th
                                class="text-center text-uppercase text-uppercase text-secondary font-weight-bolder opacity-7">
                                Địa chỉ
                            </th>
                            <th
                                class="text-center text-uppercase text-uppercase text-secondary font-weight-bolder opacity-7">
                                Ngày đặt
                            </th>
                            <th
                                class="text-center text-uppercase text-uppercase text-secondary font-weight-bolder opacity-7">
                                Phương thức thanh toán
                            </th>
                            <th
                                class="text-center text-uppercase text-uppercase text-secondary font-weight-bolder opacity-7">
                                Trạng thái
                            </th>
                            <th class="text-secondary opacity-7">
                                Hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(p, index) in billList" :key="index">
                            <div id="sub-content" :class="'id' + p.id">
                                <BillDetail :bill="p"></BillDetail>
                            </div>
                            <td style="width: 25%;">
                                <div class="d-flex px-2 py-1">
                                    <div class="d-flex flex-column justify-content-center">
                                        <h6 class="mb-0" style="font-size: 14px;">{{ p.customerName }}
                                            <button href="javascript:;" class="btn btn-xs btn-success"
                                                @click="checkDetail(p.id)"><img
                                                    src="../../assets/img/icons/flags/file.png" alt=""></button>
                                        </h6>
                                        <p class="text-xs text-secondary mb-0">
                                            Số điện thoại: {{ p.phoneNumber }}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="align-middle text-center">
                                <p class="text-xs mb-0">
                                    <span>{{ p.address }}</span>
                                </p>
                            </td>
                            <td class="align-middle text-center">
                                <p class=" font-weight-bold mb-0">
                                    <span>{{ p.updatedAt }}</span>
                                </p>
                            </td>
                            <td class="align-middle text-center">
                                <div v-if="p.typePayment == 'COD'" class="status-text">
                                    <img src="../../assets/img/icons/flags/cash-on-delivery.png" alt="">
                                </div>
                                <div v-if="p.typePayment == 'BANK'" class="status-text">
                                    <img src="../../assets/img/icons/flags/mobile-banking.png" alt="">
                                </div>
                            </td>
                            <td class="align-middle text-center">
                                <div class="status-text">
                                    Đã hủy
                                    <img src="../../assets/img/icons/flags/prohibition.png" alt="">
                                </div>
                            </td>

                            <td class="align-middle text-center">
                                <button href="javascript:;" class="btn btn-xs btn-info mx-3"
                                    @click="activeButtonClicked(p.id)">Duyệt</button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>

</template>
<script>
import BillService from '../../service/BillService'
import { API_PRODUCT_IMAGE } from "../../../config.js";
import router from '@/router';
import BillDetail from '../components/BillDetail'
export default {
    components: {
        BillDetail
    },
    data() {
        return {
            billList: [],
            image_url: API_PRODUCT_IMAGE
        }
    },
    async created() {
        await this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                this.billList = await BillService.getCancel();
                this.billList.forEach(post => {
                    const [year, month, day, hours, minutes] = post.updatedAt;

                    // Định dạng ngày, tháng, năm theo định dạng dd-mm-yyyy
                    const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;

                    // Định dạng thời gian cập nhật theo định dạng 16h:33p
                    const formattedTime = `${hours}:${minutes}`;

                    // Gán lại giá trị cập nhật đã được định dạng
                    post.updatedAt = `${formattedTime} ${formattedDate}`;
                });
                console.log(this.postList); // In ra danh sách bài viết đã được cập nhật
            } catch (error) {
                console.error("Error fetching blog list:", error);
            }
        },
        async activeButtonClicked(id) {
            console.log(id);
            await BillService.activeBill(id);
            router.go()
        },
        checkDetail(id) {
            const dynamicClass = id;
            const overlay = document.getElementById("overlay");
            const sub = document.querySelector(`#sub-content.id${dynamicClass}`);
            overlay.classList.add("showOverlay");
            sub.classList.add("showOverlay");
        },

    },
    watch: {
        '$route.params.category': 'fetchData'
    },
    beforeRouteUpdate(to, from, next) {
        this.fetchData();
        next();
    }
}
</script>

<style scoped>
#sub-content {
    display: none;
    position: absolute;
    width: 80%;
    top: 0%;
    left: 10%;
    background-color: rgb(253, 253, 253);
    padding: 0px 10px 20px 20px;
    border: 1px solid #eaeaea;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(97, 97, 97, 0.2), 0 6px 20px 0 rgba(109, 109, 109, 0.19);
    z-index: 100;
}
</style>