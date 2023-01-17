<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import DatePicker from "@vuepic/vue-datepicker";
import {
  collection,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  Timestamp,
  where,
type DocumentData,
} from "firebase/firestore";
import { firestoreDb } from "@/config/fireabase.config";

const dtFrom = ref(new Date());
const dtTo = ref(new Date());
const userWrkTimes = ref<QueryDocumentSnapshot<DocumentData>[]>();
async function DoQuery(params: Event) {
  params.preventDefault();
  useUserStore().ToggleBusy();
  const userWrkTimeRef = collection(firestoreDb, "user_work_time");

  // query
  const q = query(
    userWrkTimeRef,
    where("start_time", ">=", Timestamp.fromDate(dtFrom.value)),
    where("start_time", "<=", Timestamp.fromDate(dtTo.value))
  );

  const querySnapshot = await getDocs(q);
  if(querySnapshot.docs.length==0){
    alert("NO RECORD");
    useUserStore().ToggleBusy();
    return;
  }
  userWrkTimes.value = querySnapshot.docs;
  useUserStore().ToggleBusy();
}
</script>

<template>
  <div class="container">
    <form>
      <div class="mb-3 mt-3">
        <label class="form-label" for="dtFrom">From:</label>
        <date-picker
          v-model="dtFrom"
          id="dtFrom"
          name="dtFrom"
          locale="zh-Hant"
        ></date-picker>
      </div>
      <div class="mb-3 mt-3">
        <label class="form-label" for="dtTo">To:</label>
        <date-picker
          v-model="dtTo"
          id="dtTo"
          name="dtTo"
          locale="zh-Hant"
        ></date-picker>
      </div>
      <button type="submit" class="btn btn-primary" :disabled="useUserStore().m_isBusy" v-on:click="DoQuery">
        {{ useUserStore().m_isBusy ? "Waitting..." : "Query ==>" }}
      </button>
      <table class="tblUserWrkTime mt-3">
        <tr>
          <th>EMP_NO</th>
          <th>START_TIME</th>
          <th>END_TIME</th>
          <th>OT_TIME</th>
        </tr>
        <tr v-for="userWrkTime in userWrkTimes">
          <td>{{userWrkTime.get("emp_no")}}</td>
          <td>{{userWrkTime.get("start_time").toDate().toLocaleString('en-GB')}}</td>
          <td>{{userWrkTime.get("end_time").toDate().toLocaleString('en-GB')}}</td>
          <td>{{userWrkTime.get("jiaban_time").toDate().toLocaleString('en-GB')}}</td>
        </tr>
      </table>
    </form>
  </div>
</template>

<style lang="css">
table.tblUserWrkTime {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  border: 2px solid black;
  width: 100%;
}

table.tblUserWrkTime > td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
table.tblUserWrkTime > tr > th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

table.tblUserWrkTime > tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
