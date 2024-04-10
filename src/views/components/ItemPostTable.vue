<template>

  <div class="card">
    <div class="d-flex align-items-center justify-content-between card-header pb-0">
      <h6>Danh sách bài viết</h6>
      <button class="btn btn-success d-lfex" @click="addButtonClicked()">Thêm bài viết</button>
    </div>
    <div id="sub-content" class="post-add">
      <PostAdd></PostAdd>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary font-weight-bolder opacity-9">
                Tên bài viết
              </th>
              <th class="text-center text-uppercase text-uppercase text-secondary font-weight-bolder opacity-7">
                Ngày cập nhật
              </th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(p, index) in postList" :key="index">
              <div id="sub-content" :class="p.slug">
                  <PostEdit :post="p"></PostEdit>
                </div>
              <td style="width: 25%;">
                <div class="d-flex px-2 py-1">
                  <div>
                    <img :src="image_url + p.image" class="avatar avatar-xl me-3" alt="user1" />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0" style="font-size: 14px;">{{ p.postTitle }}</h6>
                    <p class="text-xs text-secondary mb-0">
                      <!-- số lượng còn lại: {{ p.quantity }} -->
                    </p>
                  </div>
                </div>
              </td>
              <td class="align-middle text-center">
                <p class=" font-weight-bold mb-0">
                  <span>{{ p.updatedAt }}</span>
                </p>
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
import PostService from '../../service/PostService'
import PostEdit from '../Post/PostEdit'
import PostAdd from '../Post/PostAdd'
import { API_PRODUCT_IMAGE } from "../../../config.js";
import router from '@/router';
export default {
  components: {
    PostAdd,PostEdit
  },
  data() {
    return {
      postList: [],
      image_url: API_PRODUCT_IMAGE
    }
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.postList = await PostService.getAll();
        this.postList.forEach(post => {
          const [year, month, day] = post.updatedAt;

                    // Định dạng ngày, tháng, năm theo định dạng dd-mm-yyyy
                    const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;

                    // Gán lại giá trị cập nhật đã được định dạng
                    post.updatedAt = `${formattedDate}`;
        });
        console.log(this.postList); // In ra danh sách bài viết đã được cập nhật
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
      const sub = document.querySelector(`#sub-content.post-add`);
      overlay.classList.add("showOverlay");
      sub.classList.add("showOverlay");
      console.log(sub);
    },
    async deleteButtonClicked(id) {
      await PostService.deletePostById(id);
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