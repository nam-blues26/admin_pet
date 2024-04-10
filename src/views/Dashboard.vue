<script setup>
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import BillService from '../service/BillService.js';

// Sử dụng ref để tạo biến trạng thái
import { ref, onMounted } from 'vue';

const billList = ref([]);
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
          <!-- Các mini-statistics-card -->
        </div>
        <div class="row">
          <div class="col mb-lg">
            <!-- Kiểm tra nếu dữ liệu đã được fetch trước khi render gradient-line-chart -->
            <div v-if="isDataLoaded">
              <div class="card z-index-2">
                <gradient-line-chart id="chart-line" title="Thống kê hóa đơn" :chart="{
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
        </div>
      </div>
    </div>
  </div>
</template>
