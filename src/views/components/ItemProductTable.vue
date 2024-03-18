<template>

  <div class="card">
    <div class="d-flex align-items-center justify-content-between card-header pb-0">
      <h6>Danh sách sản phẩm</h6>
      <button class="btn btn-success d-lfex" @click="addButtonClicked()">Thêm sản phẩm</button>
    </div>
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

    <Editor api-key="0r58vwjfbkl9vvvllac20tkbtqdzdjr8k0206v18up1vnoe3" :init="{
              toolbar_mode: 'sliding',
              plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name'
            }" />
  </div>

</template>
<script>
import ProductService from '../../service/ProductService'
import ProductEdit from '../Product/ProductEdit'
import ProductAdd from '../Product/ProductAdd'
import { API_PRODUCT_IMAGE } from "../../../config.js";
import router from '@/router';
export default {
  components: {
    ProductEdit,ProductAdd
  },
  data() {
    return {
      productList: {},
      image_url: API_PRODUCT_IMAGE
    }
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.productList = await ProductService.getAllProduct();
        console.log(this.productList);
      } catch (error) {
        console.error("Error fetching blog list:", error);
      }
    },
    editButtonClicked(slug) {
      const dynamicClass =slug;
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
    }

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

<style>
#sub-content {
  display: none;
  position: absolute;
  width: 80%;
  top: -10%;
  left: 10%;
  background-color: rgb(253, 253, 253);
  padding: 0px 10px 20px 20px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(97, 97, 97, 0.2), 0 6px 20px 0 rgba(109, 109, 109, 0.19);
  z-index: 100;
}
</style>
