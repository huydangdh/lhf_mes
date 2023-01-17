export interface QueryService {
  ProviderName: string;
}


export class FirestoreService implements QueryService {
    ProviderName = "Firestore"; 

    
}