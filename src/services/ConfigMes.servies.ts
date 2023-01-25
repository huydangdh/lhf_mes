import { firestoreDb } from "@/config/fireabase.config";
import { useUserStore } from "@/stores/user";
import {
  addDoc,
  collection,
  CollectionReference,
  Timestamp,
  type Firestore,
} from "firebase/firestore";

export interface CommonService {
  ServiceName: string;
  Execute(params: any): Promise<any>;
}

export class ConfigMes implements CommonService {
  ServiceName = "ConfigMes";

  private m_service: Firestore | undefined;
  private m_userWorkTimeCollection!: CollectionReference;
  /** */
  m_userStore: ReturnType<typeof useUserStore> | undefined;

  constructor(){
    this.Init();
  }

  private Init() {
    this.m_service = firestoreDb;
    this.m_userStore = useUserStore();
    this.m_userWorkTimeCollection = collection(firestoreDb, "user_work_time");
  }

  async Execute(params: any) {
    return await addDoc(this.m_userWorkTimeCollection, {
      emp_no: params.user_id,
      start_time: Timestamp.fromDate(params.start_time),
      end_time: Timestamp.fromDate(params.end_time),
      jiaban_time: params.jiaban_time,
      misc: "BETA",
    });
  }

  private VerInput(params: Object) {}
}
