<template>
    <form @submit.prevent="submitForm">

        <div class="card">
            <div class="card-header pb-0">
                <div class="d-flex align-items-center justify-content-between">
                    <h4 class="mb-0">Sửa bài viết</h4>
                    <a class="btn" @click="closeOverlay"><i class="ni ni-fat-remove"
                            style="font-size: 30px;"></i></a>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6"><label for="example-text-input" class="form-control-label">Tên bài viết</label>
                        <div class="form-group">
                            <div class=""><input type="text" class="form-control form-control-default invalid"
                                    isrequired="false" v-model="postObject.postTitle"></div>
                        </div>
                    </div>

                </div>
                <div class="form-group">
                    <label for="exampleInputFile">File input</label>
                    <div class="input-group">
                        <div class="custom-file">
                            <input type="file" @change="handleFileChange" class="custom-file-input"
                                id="exampleInputFile">
                        </div>
                    </div>
                    <div>
                        <img v-if="imageUrl" :src="imageUrl" alt="product image" class="selected-image">
                        <img v-else :src="image_url + postObject.image" alt="product image" class="selected-image">

                    </div>
                </div>
                <Editor api-key="0r58vwjfbkl9vvvllac20tkbtqdzdjr8k0206v18up1vnoe3" :init="{
        plugins: 'lists link image table code help wordcount'
    }" v-model="postObject.postDescription" />
                <div class="card-footer">
                    <button type="submit" value="Submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup>
import Editor from '@tinymce/tinymce-vue'
import PostService from '../../service/PostService'
import Swal from 'sweetalert2';
import router from '@/router';
import { API_PRODUCT_IMAGE } from "../../../config";
</script>

<script>
export default {
    props: ['post'],
    components: {
    },
    data() {
        return {
            imageUrl: null,
            postObject: this.post,
            categoryList: [],
            image_url: API_PRODUCT_IMAGE,
            file: null,
        };
    },
    methods: {
        closeOverlay() {
            const overlay = document.getElementById("overlay");
            const sub = document.querySelector(`#sub-content.${this.post.slug}`);
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
                // console.log(this.postObject.slug, this.postObject.productName, this.postObject.productDescription, this.postObject.price, this.postObject.quantity, this.postObject.sale, this.postObject.category.id, this.file);
                const response = await PostService.updatePost(this.postObject.slug, this.postObject.postTitle, this.postObject.postDescription, this.file);
                if (response.status == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sửa bài viết thành công!',
                    }).then(() => {
                        // Chuyển hướng đến trang /login sau khi nhấp vào nút "OK" trên thông báo
                        router.go()
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Sửa bài viết thất bại!',
                    })
                }
            }
            else {
                console.log("Not file");
                // console.log(this.postObject.slug, this.postObject.productName, this.postObject.productDescription, this.postObject.price, this.postObject.quantity, this.postObject.sale, this.postObject.category.id);
                const response = await PostService.updatePostNotFile(this.postObject.slug, this.postObject.postTitle, this.postObject.postDescription);
                if (response.status == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sửa bài viết thành công!',
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