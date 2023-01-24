<script setup lang="ts">
import router from "@/router";
import { ConfigMes } from "@/services/ConfigMes.servies";
import { useUserStore } from "@/stores/user";
import DatePicker from "@vuepic/vue-datepicker";
import { Timestamp } from "firebase/firestore";
import { ref } from "vue";

const dtShangBan = ref(new Date());
const dtXiaBan = ref(new Date());

const m_ConfigMes = new ConfigMes();

async function DoSendData(event: Event) {
  event.preventDefault();
  let start_time = Timestamp.fromDate(dtShangBan.value);
  let end_time = Timestamp.fromDate(dtXiaBan.value);
  let jiaban_time = Timestamp.fromDate(dtXiaBan.value);
  let userId = useUserStore().getUser()?.userId;
  try {
    useUserStore().ToggleBusy();
    let _res = await m_ConfigMes.Execute({
      start_time: start_time,
      end_time: end_time,
      jiaban_time: jiaban_time,
      user_id: userId,
    });
    useUserStore().ToggleBusy();
    alert("[I] ADD OK!");
    router.replace({ name: "home" });
  } catch (error) {
    alert(error);
  }
}

async function DoTestSetDoc(params: Event) {
  params.preventDefault();
}
</script>
<template>
  <div class="container">
    <form>
      <div class="mb-3 mt-3">
        <label class="form-label" for="dtShangBan">ShangBan:</label>
        <DatePicker
          v-model="dtShangBan"
          id="dtShangBan"
          name="dtShangBan"
          inline
          auto-apply
          locale="zh-Hant"
        ></DatePicker>
      </div>
      <div class="mb-3">
        <label class="form-label" for="dtXiaBan">XiaBan:</label>
        <DatePicker
          v-model="dtXiaBan"
          id="dtXiaBan"
          name="dtXiaBan"
          locale="zh-Hans"
          inline
          auto-apply
        ></DatePicker>
      </div>
      <button type="submit" class="btn btn-primary" :disabled="useUserStore().IsBusy()" v-on:click="DoSendData">
        {{ useUserStore().IsBusy() ? "Waitting..." : "Send ==>" }}
      </button>
      <button type="submit" class="btn btn-success" v-on:click="DoTestSetDoc">
        DoTestSetDoc
      </button>
    </form>
  </div>
</template>
