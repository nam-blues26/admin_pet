<template>
    <form @submit.prevent="submitForm">

        <div class="card">
            <div class="card-header pb-0">
                <div class="d-flex align-items-center justify-content-between">
                    <h4 class="mb-0">Sửa sản phẩm</h4>
                    <a class="btn" @click="closeOverlay"><i class="ni ni-fat-remove"
                            style="font-size: 30px;"></i></a>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6"><label for="example-text-input" class="form-control-label">Tên sản
                            phẩm</label>
                        <div class="form-group">
                            <div class=""><input type="text" class="form-control form-control-default invalid"
                                    isrequired="false" v-model="productObject.productName"></div>
                        </div>
                    </div>

                </div>
                <div class="row">
                    <div class="col-md-3"><label for="example-text-input" class="form-control-label">Giá</label>
                        <div class="input-group">
                            <input type="number" id="input" class="form-control" v-model="productObject.price">
                            <span class="input-group-text">₫
                            </span>
                        </div>
                    </div>
                    <div class="col-md-3"><label for="example-text-input" class="form-control-label">Số lượng trong
                            kho</label>
                        <div class="input-group">
                            <input type="number" id="input" class="form-control" v-model="productObject.quantity">
                            <span class="input-group-text"><i class="ni ni-check-bold"></i></span>
                        </div>
                    </div>
                    <div class="col-md-3"><label for="example-text-input" class="form-control-label">Phần trăm giảm
                            giá</label>
                        <div class="input-group">
                            <input type="number" id="input" class="form-control" v-model="productObject.sale">
                            <span class="input-group-text">%
                            </span>
                        </div>
                    </div>
                    <div class="col-md-3"><label for="example-text-input" class="form-control-label">Danh mục <i
                                class="bi bi-arrow-down"></i></label>
                        <select class="form-control" required v-model="productObject.category.id">
                            <option value="" selected disabled hidden>Choose here</option>
                            <option v-for="(cate, index) in categoryList" :key="index" :value="cate.id">{{
        cate.categoryName }}</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputFile">File input</label>
                    <div class="input-group">
                        <div class="custom-file">
                            <input type="file" @change="handleFileChange" class="custom-file-input"
                                id="exampleInputFile">
                            <label class="custom-file-label" for="exampleInputFile">Choose
                                file</label>
                        </div>
                        <div class="input-group-append">
                            <span class="input-group-text">Upload</span>
                        </div>
                    </div>
                    <div>
                        <img v-if="imageUrl" :src="imageUrl" alt="product image" class="selected-image">
                        <img v-else :src="image_url + productObject.image" alt="product image" class="selected-image">

                    </div>
                </div>
                <Editor api-key="0r58vwjfbkl9vvvllac20tkbtqdzdjr8k0206v18up1vnoe3" :init="{
        plugins: 'lists link image table code help wordcount'
    }" v-model="productObject.productDescription" />
                <div class="card-footer">
                    <button type="submit" value="Submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup>
import Editor from '@tinymce/tinymce-vue'
import CategoryService from '../../service/CategoryService'
import ProductService from '../../service/ProductService'
import Swal from 'sweetalert2';
import router from '@/router';
import { API_PRODUCT_IMAGE } from "../../../config";
</script>

<script>
export default {
    props: ['product'],
    components: {
    },
    data() {
        return {
            imageUrl: null,
            productObject: this.product,
            categoryList: [],
            image_url: API_PRODUCT_IMAGE,
            file: null,
        };
    },
    async created() {
        // Gọi API để lấy danh sách cate
        try {
            this.categoryList = await CategoryService.getCategoriesStore();
            console.log(this.categoryList);
        } catch (error) {
            console.error("Error fetching blog list:", error);
        }
    },
    methods: {
        closeOverlay() {
            const overlay = document.getElementById("overlay");
            const sub = document.querySelector(`#sub-content.${this.product.slug}`);
            overlay.classList.remove("showOverlay")
            sub.classList.remove("showOverlay")
        },
        displayImage(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.imageUrl = e.target.result;
            };

            reader.readAsDataURL(file);
        },
        handleFileChange(event) {
            this.file = event.target.files[0];
            console.log(this.file);
            if (this.file) {
                this.displayImage(this.file);
            }
        },
        async submitForm() {

            if (this.file !== null) {
                console.log("Have file");
                console.log(this.productObject.slug, this.productObject.productName, this.productObject.productDescription, this.productObject.price, this.productObject.quantity, this.productObject.sale, this.productObject.category.id, this.file);
                const response = await ProductService.updateProduct(this.productObject.slug, this.productObject.productName, this.productObject.productDescription, this.productObject.price, this.productObject.quantity, this.productObject.sale, this.productObject.category.id, this.file);
                if (response.status == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sửa thông tin sản phẩm thành công!',
                    }).then(() => {
                        // Chuyển hướng đến trang /login sau khi nhấp vào nút "OK" trên thông báo
                        router.go()
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Sửa sản phẩm thất bại!',
                    })
                }
            }
            else {
                console.log("Not file");
                console.log(this.productObject.slug, this.productObject.productName, this.productObject.productDescription, this.productObject.price, this.productObject.quantity, this.productObject.sale, this.productObject.category.id);
                const response = await ProductService.updateProductNotFile(this.productObject.slug, this.productObject.productName, this.productObject.productDescription, this.productObject.price, this.productObject.quantity, this.productObject.sale, this.productObject.category.id);
                if (response.status == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sửa sản phẩm thành công!',
                    }).then(() => {
                        // Chuyển hướng đến trang /login sau khi nhấp vào nút "OK" trên thông báo
                        router.go()
                        this.closeOverlay()
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Sửa bài viết thất bại!',
                        
                    }).then(() => {
                        // Chuyển hướng đến trang /login sau khi nhấp vào nút "OK" trên thông báo
                        router.go()
                        this.closeOverlay()
                    });
                }
            }
        }
    },
}

</script>

<style>
.card-img-top {
    margin: 0 auto;
    width: 150px;
    height: 100px;
    object-fit: cover;
}

.selected-image {
    width: 200px;
    object-fit: contain;
}
</style>