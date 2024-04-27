<template>
    <div>
        <div class="d-flex align-items-center justify-content-between">
            <h4 class="mb-0">Chi tiết hóa đơn</h4>
            <a class="btn" @click="closeOverlay"><i class="ni ni-fat-remove" style="font-size: 30px;"></i></a>
        </div>
        <h6>Tên khách hàng: {{ bill.customerName }}</h6>
        <p>SĐT: {{ bill.phoneNumber }}</p>
        <p>Địa chỉ: {{ bill.address }}</p>
        <table class="table align-items-center mb-0">
            <thead>
                <tr>
                    <th class="align-middle text-center">ID</th>
                    <th class="align-middle text-center">Tên sản phẩm</th>
                    <th class="align-middle text-center">Mẫu</th>
                    <th class="align-middle text-center">Số lượng</th>
                    <th class="align-middle text-center">Giá</th>
                    <th class="align-middle text-center">Tổng cộng</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in billObject.billDetails" :key="index">
                    <td class="align-middle text-center"> {{ item.product.id }}</td>
                    <td class="align-middle text-center">{{ item.product.productName }}</td>
                    <td v-if="item.attributeName" class="align-middle text-center">{{ item.attributeName }}</td>
                    <td v-else class="align-middle text-center"></td>
                    <td class="align-middle text-center">{{ item.quantity }}</td>
                    <td class="align-middle text-center">{{ numberWithCommas(item.product.priceSale) }} ₫ </td>
                    <td class="align-middle text-center">{{ numberWithCommas(item.quantity * item.product.priceSale) }} ₫ </td>
                </tr>
            </tbody>
        </table>
        <div>
            <strong>Ghi chú:</strong> {{ billObject.note }}
        </div>
        <hr>
        <div>
            <strong>Tổng số tiền:</strong> {{ numberWithCommas(billObject.totalPrice) }} ₫
        </div>
    </div>
</template>

<script>
export default {
    props: ['bill'],
    data() {
        return {
            billObject: this.bill,
        };
    },
    methods: {
        closeOverlay() {
            console.log(this.bill.note);
            const overlay = document.getElementById("overlay");
            const sub = document.querySelector(`#sub-content.id${this.bill.id}`);
            overlay.classList.remove("showOverlay")
            sub.classList.remove("showOverlay")
        },
        numberWithCommas(x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }
    }
};
</script>
<style></style>