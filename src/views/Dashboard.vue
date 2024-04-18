<script setup>
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import BillService from '../service/BillService.js';
import ProductService from '../service/ProductService.js';

// Sử dụng ref để tạo biến trạng thái
import { ref, onMounted } from 'vue';

const billList = ref([]);
const productList = ref([]);
const dates = ref([]);
const count_bought = ref([]);
const count_cancel = ref([]);
// const data_chart = ref([50, 40, 200, 320, 400]);

// Tạo một biến để kiểm soát việc render
const isDataLoaded = ref(false);

// Phương thức fetch dữ liệu
const fetchData = async () => {
  try {
    billList.value = await BillService.getStatistic();
    productList.value = await ProductService.getBestSeller();
    dates.value = billList.value.map(item => item.date);
    count_bought.value = billList.value.map(item => item.count_bought);
    count_cancel.value = billList.value.map(item => item.count_cancel);
    // Gán biến kiểm soát render thành true khi dữ liệu đã được fetch
    isDataLoaded.value = true;
  } catch (error) {
    console.error("Error fetching blog list:", error);
  }
}

// Sử dụng hook onMounted để fetch dữ liệu khi component được mounted
onMounted(() => {
  fetchData();
});

</script>

<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-8 mb-lg">
            <!-- Kiểm tra nếu dữ liệu đã được fetch trước khi render gradient-line-chart -->
            <div v-if="isDataLoaded">
              <div class="card z-index-2">
                <div class="p-3 pb-0 card-header">
                  <div class="d-flex justify-content-between">
                    <h3 class="mb-2 ">Thống kê hóa đơn</h3>
                  </div>
                </div>
                <gradient-line-chart id="chart-line" title="" :chart="{
                  labels: dates,
                  datasets: [
                    {
                      label: 'Bán',
                      data: count_bought,
                    },
                    {
                      label: 'Hủy',
                      data: count_cancel,
                    },
                  ],
                }" />
              </div>
            </div>
            <!-- Hiển thị một thông báo hoặc spinner trong khi đang fetch dữ liệu -->
            <div v-else>
              Loading...
            </div>
          </div>
          <div class="col-8 mb-lg mt-6">
            <!-- Kiểm tra nếu dữ liệu đã được fetch trước khi render gradient-line-chart -->
            <div class="card z-index-2">
              <div class="p-3 pb-0 card-header">
                <div class="d-flex justify-content-between">
                  <h3 class="mb-2">Top 5 sản phẩm bán chạy</h3>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table align-items-center">
                  <thead>
                    <th class="text-center">Mã sản phẩm:</th>
                    <th class="text-center">Tên sản phẩm:</th>
                    <th class="text-center">Lượt bán:</th>
                    <th class="text-center">Giá:</th>
                  </thead>
                  <tbody>
                    <tr v-for="(p, index) in productList" :key="index">
                      <td>
                        <div class="text-center">
                          <h6 class="mb-0 text-sm">{{ p.id }}</h6>
                        </div>
                      </td>
                      <td class="w-20">
                        <div class="px-2 py-1 d-flex align-items-center">
                          <!-- <div>
                            <img :src="sale.flag" alt="Country flag" />
                          </div> -->
                          <div class="ms-4">
                            <h6 class="mb-0 text-sm">{{ p.productName }}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <h6 class="mb-0 text-sm">{{ p.bought }}</h6>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <h6 class="mb-0 text-sm">{{ p.price }} ₫</h6>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>