<template>

  <div class="card">
    <div class="d-flex align-items-center justify-content-between card-header pb-0">
      <h6>Danh sách sản phẩm</h6>
      <button class="btn btn-success d-lfex" @click="addButtonClicked()">Thêm sản phẩm</button>
    </div>
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-1">
          <label for="categorySelect">Tìm kiếm</label>
        </div>
        <div class="col-2">
          <input type="text" name="keyword" id="" v-model="keyword">
        </div>
        <div class="col-1">
          <label for="categorySelect">Danh mục</label>
        </div>
        <div class="col-2">
          <select id="categorySelect" class="form-control" v-model="category_id">
            <option value="" disabled hidden>Choose here</option>
            <option v-for="(cate, index) in categoryList" :key="index" :value="cate.id">
              {{ cate.categoryName }}
            </option>
          </select>
        </div>
        <div class="col-2"><button type="submit" value="Submit" class="btn btn-primary">Tìm kiếm</button></div>
      </div>
    </form>

    <div id="sub-content" class="product-add">
      <ProductAdd></ProductAdd>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary font-weight-bolder opacity-9">
                Tên sản phẩm
              </th>
              <th class="text-center text-uppercase text-uppercase text-secondary font-weight-bolder opacity-7">
                Giá
              </th>
              <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7 ps-2">
                Sale
              </th>
              <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7 ps-2">
                Đã bán
              </th>
              <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-7">
                Danh mục
              </th>

              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(p, index) in productList" :key="index">
              <div id="sub-content" :class="p.slug">
                <ProductEdit :product="p"></ProductEdit>
              </div>
              <td style="width: 25%;">
                <div class="d-flex px-2 py-1">
                  <div>
                    <img :src="image_url + p.image" class="avatar avatar-xl me-3" alt="user1" />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 ">{{ p.productName }}</h6>
                    <p class="text-xs text-secondary mb-0">
                      số lượng còn lại: {{ p.quantity }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="align-middle text-center">
                <p class=" font-weight-bold mb-0">Giá gốc:
                  <span>{{ p.price }}₫</span>
                </p>
                <p class="text-secondary mb-0">sale: <span>{{ p.priceSale }}₫</span></p>
              </td>
              <td v-if="p.sale == 0" class="align-middle text-center">
                <span class="badge badge-lg bg-gradient-success">Gôc</span>
              </td>
              <td v-else class="align-middle text-center">
                <span class="badge badge-lg bg-gradient-danger">{{ p.sale }}%</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary">{{ p.bought }}</span>
              </td>
              <td class="align-middle text-center">
                <h6 class="text-secondary">{{ p.category.categoryName }}</h6>
              </td>
              <td class="align-middle text-center">
                <button href="javascript:;" class="btn btn-xs btn-info mx-3"
                  @click="editButtonClicked(p.slug)">Sửa</button>
                <button href="javascript:;" class="btn btn-xs btn-danger"
                  @click="deleteButtonClicked(p.id)">Xóa</button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>
<script>
import ProductService from '../../service/ProductService'
import ProductEdit from '../Product/ProductEdit'
import ProductAdd from '../Product/ProductAdd'
import { API_PRODUCT_IMAGE } from "../../../config.js";
import router from '@/router';
import CategoryService from '../../service/CategoryService'
export default {
  components: {
    ProductEdit, ProductAdd
  },
  data() {
    return {
      productList: {},
      categoryList: [],
      category_id: 0,
      keyword: '',
      image_url: API_PRODUCT_IMAGE
    }
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const searchKey = this.$route.query.s;
        const searchCate = this.$route.query.c;

        if (searchKey !== undefined && searchKey !== '' || searchCate !== undefined && searchCate > 0) {
          console.log("Có giá trị 's' hoặc 'c'");
          this.productList = []
          this.productList = await ProductService.searchProduct(searchKey, searchCate);
        } else {
          console.log("Không có giá trị 's' hoặc 'c'");
          this.productList = []
          this.productList = await ProductService.getAllProduct();
        }

        this.categoryList = await CategoryService.getCategoriesStore();

        console.log(this.productList);
      } catch (error) {
        console.error("Error fetching blog list:", error);
      }
    },

    editButtonClicked(slug) {
      const dynamicClass = slug;
      const overlay = document.getElementById("overlay");
      const sub = document.querySelector(`#sub-content.${dynamicClass}`);
      overlay.classList.add("showOverlay");
      sub.classList.add("showOverlay");
      console.log(sub);
    },
    addButtonClicked() {
      const overlay = document.getElementById("overlay");
      const sub = document.querySelector(`#sub-content.product-add`);
      overlay.classList.add("showOverlay");
      sub.classList.add("showOverlay");
      console.log(sub);
    },
    async deleteButtonClicked(id) {
      await ProductService.deleteProductById(id);
      router.go()
    },
    async submitForm() {

      console.log(this.keyword);
      console.log(this.category_id);
      this.$router.push({ path: '/product/list', query: { s: this.keyword, c: this.category_id } })
    }

  },
  watch: {
    '$route.query.s': 'fetchData',
    '$route.query.c': 'fetchData'
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchData();
    next();
  }
}
</script>

<style>
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
