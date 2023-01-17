<script setup lang="ts">
import { firestoreDb } from "@/config/fireabase.config";
import type { MesUserWorkTime } from "@/config/MesUser";
import router from "@/router";
import { useUserStore } from "@/stores/user";
import DatePicker from "@vuepic/vue-datepicker";
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  getDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { ref } from "vue";

const dtShangBan = ref(new Date());
const dtXiaBan = ref(new Date());
const userWrkTime = collection(firestoreDb, "user_work_time");

async function DoSendData(event: Event) {
  event.preventDefault();
  let start_time = Timestamp.fromDate(dtShangBan.value);
  let end_time = Timestamp.fromDate(dtXiaBan.value);
  let jiaban_time = Timestamp.fromDate(dtXiaBan.value);
  let userId = useUserStore().getUser()?.userId;
  try {
    useUserStore().ToggleBusy();
    await addDoc(userWrkTime, {
      emp_no: userId,
      start_time: Timestamp.fromDate(dtShangBan.value),
      end_time: Timestamp.fromDate(dtXiaBan.value),
      jiaban_time: Timestamp.fromDate(dtXiaBan.value),
      misc: "BETA",
    });
    useUserStore().ToggleBusy();
    alert("ADD [OK]");
    router.replace({name: 'home'})

  } catch (error) {
    alert(error);
  }
}

async function DoTestSetDoc(params: Event) {
  params.preventDefault();
  addDoc(userWrkTime, {
    emp_no: "V00001",
    start_time: Timestamp.fromDate(dtShangBan.value),
    end_time: Timestamp.fromDate(dtXiaBan.value),
    jiaban_time: Timestamp.fromDate(dtXiaBan.value),
    misc: "id_002",
  });
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
      <button type="submit" class="btn btn-primary" v-on:click="DoSendData">
        {{ useUserStore().m_isBusy ? "Waitting..." : "Send ==>" }}
      </button>
      <button type="submit" class="btn btn-success" v-on:click="DoTestSetDoc">
        DoTestSetDoc
      </button>
    </form>
  </div>
</template>
