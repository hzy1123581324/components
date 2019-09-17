
//上传文件组件

Vue.component('fileUpload', {
  template: `
  <div class="relative txt_c fileUpload-main">
    <div class='fileUpload-box'><slot></slot></div>
    <input type="file" :name="keyname" @change="uploads">
  </div>`,
  props: {
    keyname: {
      type: String,
    },
    upload:{
      type:Function,
    }
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    uploads(event){
      const FormData = new FormData();
      FormData.append('file', event.target.files[0]); 
      // $.ajax({
			// 	url: "http://127.0.0.1:8081/uploadFile/addUploadFileUrl",
			// 	type: "POST",
			// 	data: formData,
			// 	/**
			// 	*必须false才会自动加上正确的Content-Type
			// 	*/
			// 	contentType: false,
			// 	/**
			// 	* 必须false才会避开jQuery对 formdata 的默认处理
			// 	* XMLHttpRequest会对 formdata 进行正确的处理
			// 	*/
			// 	processData: false,
			// 	success: function (data) {
			// 		alert("success");
	   
			// 	},
			// 	error: function () {
			// 		alert("上传失败！");
 
			// 	}
			// });

      this.upload(FormData);
    }
  },
  computed: {

  },
  watch: {
  }
})