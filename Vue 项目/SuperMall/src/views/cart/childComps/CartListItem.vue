<template>
  <div id="shop-item">
    <van-checkbox
      v-model="itemInfo.checked"
      checked-color="#ff8198"
      icon-size="24px"
    >
      ></van-checkbox
    >
    <van-swipe-cell>
      <van-card
        :num="itemInfo.count"
        :price="itemInfo.newPrice"
        :desc="itemInfo.desc"
        :title="itemInfo.title"
        class="goods-card"
        :thumb="itemInfo.imgURL"
      />
      <van-button
        slot="right"
        square
        text="删除"
        type="danger"
        class="delete-button"
        @click="shanchu(itemInfo.iid)"
      />
    </van-swipe-cell>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";

export default {
  name: "ShopCartItem",
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    CheckButton
  },
  data() {
    return {
      newitemInfo: []
    };
  },
  methods: {
    checkedChange: function() {
      this.itemInfo.checked = !this.itemInfo.checked;
    },
    shanchu(id) {
      this.$store.commit("deletei", id);
    }
  },
  computed: {
    strike() {
      for (let k of itemInfo.keys(this.itemInfo)) {
        Vue.delete(this.itemInfo, k);
      }
    }
  }
};
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.van-checkbox {
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
.van-card__title {
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 8px;
}
.van-card__price,
.van-card__num {
  color: #000;
}
.van-card__thumb {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.van-image__error,
.van-image__img,
.van-image__loading {
  object-fit: inherit !important;
}
.van-swipe-cell {
  width: 45rem;
}
.van-card {
  padding: 8px 0px;
}
</style>
