import {
  createApp,
  ref,
  onMounted,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = createApp({
  setup() {
    const products = ref([]);
    const tempProduct = ref({});
    const url = "https://vue3-course-api.hexschool.io/v2";
    const path = "rubby-api";

    // 1.確認是否登入
    const checkLogin = () => {
      axios
        .post(`${url}/api/user/check`)
        .then(() => {
          getData();
        })
        .catch((err) => {
          console.dir(err);
          window.location = "login.html";
        });
    };

    // 2.取得產品資料
    const getData = () => {
      axios
        .get(`${url}/api/${path}/admin/products`)
        .then((res) => {
          products.value = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }

    // 3.查看產品細節
    const openModal = (product) => {
        console.log(1);
        tempProduct.value = product
    }

  onMounted(() => {
      // Retrieve Token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)rubbyToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common["Authorization"] = token;
 
      checkLogin();
    });

    return {
      products,
      tempProduct,
      openModal
    };
  },
});

app.mount("#app");
