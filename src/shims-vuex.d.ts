import { Store } from '@/store';
import State from "@/store/state";
// path to store file

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
